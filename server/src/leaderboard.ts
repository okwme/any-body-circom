import { Chain } from '../shovel-config'
import db from './db'

type LeaderboardLine = {
  player: string
}

type SpeedScore = LeaderboardLine & { player: string; time: number }

type SolvedScore = LeaderboardLine & { solved: number }

type StreakScore = LeaderboardLine & { player: string; streak: number }

type DaysPlayedScore = LeaderboardLine & { daysPlayed: number }

type LevelLeaderboard = {
  level: number
  events: SpeedScore[]
}

type DailyLeaderboard = {
  levels: LevelLeaderboard[]
  cumulative: SpeedScore[]
}

type Leaderboard = {
  daily: Record<number, DailyLeaderboard>
  allTime: {
    mostSolved: SolvedScore[]
    currentStreak: StreakScore[]
    fastest: SpeedScore[]
    daysPlayed: DaysPlayedScore[]
  }
}

// TODO: pull this from the contract
const MAX_BODY_COUNT = 6
const DAILY_CATEGORY_LIMIT = 3

export const leaderboards: Record<Chain, Leaderboard> | {} = {}

function currentDayInUnixTime() {
  const date = new Date()
  date.setUTCHours(0, 0, 0, 0)
  return date.getTime() / 1000
}

async function calculateDailyLeaderboard(day: number, chain: Chain) {
  const q = `
  WITH fastest_times AS (
      SELECT 
          run_id,
          level,
          MIN(time) AS fastest_time
      FROM 
          anybody_problem_level_solved
      WHERE 
          day = ${day}
          AND src_name = $1
      GROUP BY 
          run_id, level
  ),
  cumulative_times AS (
      SELECT 
          run_id,
          SUM(time) AS total_time
      FROM 
          anybody_problem_level_solved
      WHERE 
          day = ${day}
          AND src_name = $1
      GROUP BY 
          run_id
      HAVING 
          COUNT(level) = ${MAX_BODY_COUNT - 1}
  ),
  ranked_fastest_times AS (
      SELECT 
          run_id,
          level,
          fastest_time,
          ROW_NUMBER() OVER (PARTITION BY level ORDER BY fastest_time) AS rank
      FROM 
          fastest_times
  ),
  ranked_cumulative_times AS (
      SELECT 
          run_id,
          total_time,
          ROW_NUMBER() OVER (ORDER BY total_time) AS rank
      FROM 
          cumulative_times
  ),
  leaderboard AS (
      SELECT
          level,
          run_id,
          fastest_time AS time
      FROM
          ranked_fastest_times
      WHERE
          rank <= ${DAILY_CATEGORY_LIMIT}
      UNION ALL
      SELECT 
          NULL AS level,
          run_id,
          total_time AS time
      FROM 
          ranked_cumulative_times
      WHERE 
          rank <= ${DAILY_CATEGORY_LIMIT}
  ),
  latest_transactions AS (
      SELECT
          token_id,
          "to",
          ROW_NUMBER() OVER (PARTITION BY token_id ORDER BY block_num DESC, tx_idx DESC, log_idx DESC) AS rn
      FROM
          speedruns_transfer
      WHERE
          token_id IN (SELECT run_id FROM leaderboard)
          AND src_name = $1
  ),
  current_players AS (
      SELECT
          token_id,
          concat('0x', encode("to", 'hex')) as player
      FROM
          latest_transactions
      WHERE
          rn = 1
  )
  SELECT 
      leaderboard.level,
      leaderboard.run_id,
      leaderboard.time,
      current_players.player
  FROM
      leaderboard
  LEFT JOIN current_players ON leaderboard.run_id = current_players.token_id
  ORDER BY
      COALESCE(leaderboard.level, 0), leaderboard.time;
  `

  const result = await db.query(q, [chain])

  function scores(rows: any[]): SpeedScore[] {
    return rows.map((r: any) => ({
      problemId: r.problem_id,
      time: parseInt(r.time),
      player: r.player
    }))
  }

  const levels: LevelLeaderboard[] = []
  for (let i = 1; i <= MAX_BODY_COUNT; i++) {
    const events = scores(result.rows.filter((r: any) => r.level === `${i}`))
    if (!events.length) continue
    levels.push({
      level: i,
      events
    })
  }
  const cumulativeEvents = scores(result.rows.filter((r: any) => !r.level))

  return { levels, cumulative: cumulativeEvents }
}

async function calculateAllTimeLeaderboard(
  today: number,
  chain: Chain
): Promise<Leaderboard['allTime']> {
  const n = 10
  const result = await db.query(
    `
WITH current_streaks AS (
    SELECT
        player,
        MAX(streak_length) AS current_streak
    FROM (
        SELECT
            player,
            COUNT(*) AS streak_length
        FROM (
            SELECT
                day,
                player,
                ROW_NUMBER() OVER (PARTITION BY run_id ORDER BY day) -
                ROW_NUMBER() OVER (PARTITION BY run_id, day ORDER BY day) AS streak
            FROM
                anybody_problem_run_solved
            WHERE
                src_name = $1
        ) AS subquery
        GROUP BY
            player, streak
    ) AS streaks
    GROUP BY 
        player
    ORDER BY 
        current_streak DESC
    LIMIT ${n}
),
fastest_completed AS (
    SELECT 
        run_id,
        player,
        accumulative_time as time
    FROM 
        anybody_problem_run_solved
    WHERE
        src_name = $1
    ORDER BY 
        time ASC
    LIMIT ${n}
),
leaderboard AS (
  SELECT 
      'Current Streak' AS category,
      player,
      current_streak AS metric
  FROM 
      current_streaks
  UNION ALL
  SELECT 
      'Fastest Completed Problem' AS category,
      player,
      time AS metric
  FROM 
      fastest_completed
),
players_with_most_days_played AS (
  SELECT
      player,
      COUNT(DISTINCT day) AS days_played
  FROM
      anybody_problem_level_solved
  WHERE
      src_name = $1
  GROUP BY
      player
  ORDER BY
      days_played DESC
  LIMIT ${n}
),
players_with_most_levels_solved AS (
  SELECT
      player,
      COUNT(DISTINCT (run_id, level)) AS solve_count
  FROM
      anybody_problem_level_solved
  WHERE
      src_name = $1
  GROUP BY
      player
  ORDER BY
      solve_count DESC
  LIMIT ${n}
)
SELECT 
  category,
  player,
  metric
FROM
  leaderboard
UNION ALL
SELECT 
    'Most Days Played' AS category,
    player,
    days_played AS metric
FROM
    players_with_most_days_played
UNION ALL
SELECT 
    'Most Solved' AS category,
    player,
    solve_count AS metric
FROM
    players_with_most_levels_solved;

`,
    [chain]
  )
  return {
    mostSolved: result.rows
      .filter((r: any) => r.category === 'Most Solved')
      .map((r: any) => ({
        solved: parseInt(r.metric),
        player: r.player
      })),
    currentStreak: result.rows
      .filter((r: any) => r.category === 'Current Streak')
      .map((r: any) => ({
        problemId: r.problem_id,
        streak: parseInt(r.metric),
        player: r.player
      })),
    fastest: result.rows
      .filter((r: any) => r.category === 'Fastest Completed Problem')
      .map((r: any) => ({
        time: parseInt(r.metric),
        player: r.player
      })),
    daysPlayed: result.rows
      .filter((r: any) => r.category === 'Most Days Played')
      .map((r: any) => ({
        player: r.player,
        daysPlayed: parseInt(r.metric)
      }))
  }
}

export async function updateLeaderboard(chain: Chain) {
  const start = Date.now()

  const seasonStart = 1717632000

  // calculate daily leaderboards
  const today = currentDayInUnixTime()
  const daysSoFar: number[] = []
  const ONE_DAY_SECONDS = 86400
  for (let i = seasonStart; i <= today; i += ONE_DAY_SECONDS) {
    daysSoFar.push(i)
  }

  const dailies = await Promise.all(
    daysSoFar.map(async (day) => {
      return calculateDailyLeaderboard(day, chain)
    })
  )

  const doneWithDaily = Date.now()

  const daily = daysSoFar.reduce(
    (acc, day, idx) => {
      acc[day] = dailies[idx]
      return acc
    },
    {} as Record<number, DailyLeaderboard>
  )

  const allTime = await calculateAllTimeLeaderboard(today, chain)

  leaderboards[chain] = {
    daily,
    allTime
  }

  console.log(
    `[${today}]:`,
    chain,
    'leaderboard updated in',
    Date.now() - start,
    'ms with',
    `(${doneWithDaily - start}ms for daily)`
  )
}
