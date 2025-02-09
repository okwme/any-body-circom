import TournamentABI from './contractData/ABI-8453-Tournament.json'
import TournamentBaseSepolia from './contractData/84532-Tournament.json'
import TournamentBase from './contractData/8453-Tournament.json'
import TournamentLocal from './contractData/12345-Tournament.json'

export const Tournament = {
  abi: TournamentABI,
  networks: {
    84532: TournamentBaseSepolia,
    12345: TournamentLocal,
    8453: TournamentBase
  }
}

import AnybodyProblemV4ABI from './contractData/ABI-8453-AnybodyProblemV4.json'
import AnybodyProblemV4BaseSepolia from './contractData/84532-AnybodyProblemV4.json'
import AnybodyProblemV4Base from './contractData/8453-AnybodyProblemV4.json'
// import AnybodyProblemV4Local from './contractData/12345-AnybodyProblemV4.json'

export const AnybodyProblemV4 = {
  abi: AnybodyProblemV4ABI,
  networks: {
    84532: AnybodyProblemV4BaseSepolia,
    // 12345: AnybodyProblemV4Local,
    8453: AnybodyProblemV4Base
  }
}

import AnybodyProblemV3ABI from './contractData/ABI-8453-AnybodyProblemV3.json'
import AnybodyProblemV3BaseSepolia from './contractData/84532-AnybodyProblemV3.json'
import AnybodyProblemV3Base from './contractData/8453-AnybodyProblemV3.json'
// import AnybodyProblemV3Local from './contractData/12345-AnybodyProblemV3.json'

export const AnybodyProblemV3 = {
  abi: AnybodyProblemV3ABI,
  networks: {
    84532: AnybodyProblemV3BaseSepolia,
    // 12345: AnybodyProblemV3Local,
    8453: AnybodyProblemV3Base
  }
}

import AnybodyProblemV2ABI from './contractData/ABI-8453-AnybodyProblemV2.json'
import AnybodyProblemV2BaseSepolia from './contractData/84532-AnybodyProblemV2.json'
import AnybodyProblemV2Base from './contractData/8453-AnybodyProblemV2.json'
import AnybodyProblemV2Local from './contractData/12345-AnybodyProblemV2.json'

export const AnybodyProblemV2 = {
  abi: AnybodyProblemV2ABI,
  networks: {
    84532: AnybodyProblemV2BaseSepolia,
    12345: AnybodyProblemV2Local,
    8453: AnybodyProblemV2Base
  }
}

import AnybodyProblemV1ABI from './contractData/ABI-84532-AnybodyProblemV1.json'
import AnybodyProblemV1BaseSepolia from './contractData/84532-AnybodyProblemV1.json'
import AnybodyProblemV1Base from './contractData/8453-AnybodyProblemV1.json'
import AnybodyProblemV1Local from './contractData/12345-AnybodyProblemV1.json'

export const AnybodyProblemV1 = {
  abi: AnybodyProblemV1ABI,
  networks: {
    84532: AnybodyProblemV1BaseSepolia,
    12345: AnybodyProblemV1Local,
    8453: AnybodyProblemV1Base
  }
}

import AnybodyProblemV0Base from './contractData/8453-AnybodyProblemV0.json'
import AnybodyProblemV0BaseSepolia from './contractData/84532-AnybodyProblemV0.json'
import AnybodyProblemV0Local from './contractData/12345-AnybodyProblemV0.json'
import AnybodyProblemV0ABI from './contractData/ABI-12345-AnybodyProblemV0.json'

export const AnybodyProblemV0 = {
  abi: AnybodyProblemV0ABI,
  networks: {
    8453: AnybodyProblemV0Base,
    84532: AnybodyProblemV0BaseSepolia,
    12345: AnybodyProblemV0Local
  }
}

import SpeedrunsABI from './contractData/ABI-84532-Speedruns.json'
import SpeedrunsBaseSepolia from './contractData/84532-Speedruns.json'
import SpeedrunsBase from './contractData/8453-Speedruns.json'
import SpeedrunsLocal from './contractData/12345-Speedruns.json'

export const Speedruns = {
  abi: SpeedrunsABI,
  networks: {
    84532: SpeedrunsBaseSepolia,
    12345: SpeedrunsLocal,
    8453: SpeedrunsBase
  }
}

export const AnybodyProblem = AnybodyProblemV4
