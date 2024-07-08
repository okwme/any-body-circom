import { hslToRgb, rgbaOpacity, THEME } from './colors.js'
import { fonts, drawKernedText } from './fonts.js'
import { themes } from './colors.js'

const BODY_SCALE = 4 // match to calculations.js !!
const WITHERING_STEPS = 3000
const GAME_LENGTH_BY_LEVEL_INDEX = [10, 20, 30, 40, 50]
const LEVELS = GAME_LENGTH_BY_LEVEL_INDEX.length

const rot = {
  fg: {
    direction: 1,
    speed: 25
  },
  bg: {
    direction: -1,
    speed: 35
  },
  core: {
    direction: 1,
    speed: 100
  }
}

const rotOverride = {
  fg: {
    1: {
      speed: 0
    },
    8: {
      speed: 0
    },
    9: {
      direction: -1
    }
  }
}

const BG_SVGS = [
  new URL('/public/bodies/bgs/bg1.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg2.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg3.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg4.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg5.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg6.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg7.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg8.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg9.svg', import.meta.url).href,
  new URL('/public/bodies/bgs/bg10.svg', import.meta.url).href
]

const FG_SVGS = [
  new URL('/public/bodies/fgs/fg1.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg2.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg3.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg4.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg5.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg6.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg7.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg8.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg9.svg', import.meta.url).href,
  new URL('/public/bodies/fgs/fg10.svg', import.meta.url).href
]

const FACE_SVGS = [
  new URL('/public/bodies/faces/face1.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face2.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face3.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face4.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face5.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face6.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face7.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face8.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face9.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face10.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face11.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face12.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face13.svg', import.meta.url).href,
  new URL('/public/bodies/faces/face14.svg', import.meta.url).href
]

const FACE_BLINK_SVGS = [
  new URL('/public/bodies/faces_blink/1.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/2.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/3.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/4.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/5.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/6.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/7.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/8.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/9.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/10.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/11.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/12.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/13.svg', import.meta.url).href,
  new URL('/public/bodies/faces_blink/14.svg', import.meta.url).href
]
const FACE_SHOT_SVGS = [
  new URL('/public/bodies/faces_shot/1.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/2.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/3.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/4.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/5.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/6.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/7.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/8.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/9.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/10.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/11.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/12.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/13.svg', import.meta.url).href,
  new URL('/public/bodies/faces_shot/14.svg', import.meta.url).href
]

const CORE_SVGS = [
  new URL('/public/bodies/cores/core-zigzag-lg.svg', import.meta.url).href
]

const BADDIE_SVG = {
  bg: new URL('/public/baddies/baddie-bg.svg', import.meta.url).href,
  core: new URL('/public/baddies/baddie-core.svg', import.meta.url).href,
  face: new URL('/public/baddies/baddie-face.svg', import.meta.url).href
}

const replaceAttribute = (string, key, color) =>
  string.replaceAll(
    new RegExp(`${key}="(?!none)([^"]+)"`, 'g'),
    `${key}="${color}"`
  )

export const Visuals = {
  async draw() {
    for (const key in this.buttons) {
      const button = this.buttons[key]
      button.visible = false
    }
    if (!this.showIt) return
    if (this.bodies.length < 1) {
      this.p.textSize(40)
      this.p.text('Use the panel to the right to add Bodies -> -> ->', 100, 400)
      this.p.text('(You need minimum 1 Bodies in your Problem)', 100, 500)
      this.setPause(true)
      return
    }
    if (!this.firstFrame && !this.hasStarted) {
      this.hasStarted = true
      this.started()
    }

    if (!this.paused && this.p5Frames % this.P5_FPS_MULTIPLIER == 0) {
      this.firstFrame = false
      this.frames++
      const results = this.step(this.bodies, this.missiles)
      this.bodies = results.bodies || []
      this.missiles = results.missiles || []
    }

    this.p.noFill()
    this.drawBg()
    if (this.globalStyle == 'psycho') {
      this.p.blendMode(this.p.DIFFERENCE)
    }

    if (this.globalStyle == 'psycho') {
      this.p.blendMode(this.p.BLEND)
    }

    this.p5Frames++
    // if (
    //   this.mode == 'game' &&
    //   this.target == 'inside' &&
    //   !this.firstFrame &&
    //   this.globalStyle !== 'psycho'
    // ) {
    //   for (let i = 0; i < this.bodies.length; i++) {
    //     const body = this.bodies[i]
    //     this.drawCenter(body)
    //   }
    // }

    if (!this.paused) {
      this.drawBodies()
    }

    if (
      this.mode == 'game' &&
      this.target == 'outside' &&
      !this.firstFrame &&
      this.globalStyle !== 'psycho'
    ) {
      for (let i = 0; i < this.bodies.length; i++) {
        const body = this.bodies[i]
        this.drawCenter(body)
      }
    }
    this.drawWitheringBodies()

    if (this.frames % 10 == 0) {
      this.sound?.render(this)
    }

    this.drawPause()
    this.drawScore()

    if (
      this.mode == 'game' &&
      this.frames - this.startingFrame + this.FPS < this.timer &&
      this.bodies.reduce((a, c) => a + c.radius, 0) != 0
    ) {
      this.drawGun()
      this.drawMissiles()
    }
    this.drawExplosions()

    const notPaused = !this.paused
    const framesIsAtStopEveryInterval =
      (this.frames - this.startingFrame) % this.stopEvery == 0 &&
      this.p5Frames % this.P5_FPS_MULTIPLIER == 0
    const didNotJustPause = !this.justPaused

    const ranOutOfTime =
      this.frames - this.startingFrame + this.FPS >= this.timer
    const hitHeroBody = this.bodies[0].radius == 0

    if ((ranOutOfTime || hitHeroBody) && !this.handledGameOver) {
      this.handleGameOver({ won: false, ranOutOfTime, hitHeroBody })
    }
    if (
      !this.won &&
      this.mode == 'game' &&
      this.bodies.slice(1).reduce((a, c) => a + c.radius, 0) == 0 &&
      !this.handledGameOver
    ) {
      this.handleGameOver({ won: true })
    }

    if (
      !this.firstFrame &&
      notPaused &&
      framesIsAtStopEveryInterval &&
      didNotJustPause &&
      !ranOutOfTime &&
      !this.handledGameOver
    ) {
      this.finish()
    } else {
      this.justPaused = false
    }
  },
  drawPause() {
    if (!fonts.dot || !this.paused) return

    this.pauseGraphic ||= this.p.createGraphics(
      this.windowWidth,
      this.windowHeight
    )
    this.pauseGraphic.pixelDensity(this.pixelDensity)
    this.pauseGraphic.clear()

    const p = this.pauseGraphic

    const unpauseDuration = 2
    const unpauseFrames = unpauseDuration * this.P5_FPS
    if (this.willUnpause && !this.beganUnpauseAt) {
      this.willUnpause = true
      this.beganUnpauseAt = this.p5Frames
    }

    // pause and return when unpause finished
    if (this.beganUnpauseAt + unpauseFrames < this.p5Frames) {
      this.paused = false
      this.willUnpause = false
      return
    } else if (this.willUnpause) {
      // fade text out
      const fadeOutFrames = (unpauseFrames / 4) * 3
      const fadeOutStart = this.beganUnpauseAt
      const fadeOutProgress = this.p5Frames - fadeOutStart
      const fadeOut = this.p.map(fadeOutProgress, 0, fadeOutFrames, 1, 0)
      p.fill(rgbaOpacity(THEME.pink, fadeOut))
    } else {
      p.fill(THEME.pink)
    }

    this.drawPauseBodies()

    // draw logo
    p.textFont(fonts.dot)
    p.textSize(200)
    p.textAlign(p.LEFT, p.TOP)
    p.noStroke()
    const titleY = this.windowHeight / 2 - 270
    drawKernedText(p, 'Anybody', 46, titleY, 0.8)
    drawKernedText(p, 'Problem', 46, titleY + 240, 2)

    if (!this.willUnpause) {
      this.drawFatButton({
        text: 'PLAY',
        onClick: () => this.setPause(false),
        fg: THEME.fuschia,
        bg: THEME.pink,
        bottom: 120,
        p
      })

      // date
      p.textFont(fonts.body)
      p.textSize(24)
      const dateWidth = p.textWidth(this.date)
      const dateBgWidth = dateWidth + 48
      const dateBgHeight = 32
      const dateBottomY = this.windowHeight - 58
      p.fill(THEME.textBg)
      p.rect(
        this.windowWidth / 2 - dateBgWidth / 2,
        dateBottomY - dateBgHeight / 2,
        dateBgWidth,
        dateBgHeight,
        20
      )
      p.textAlign(p.CENTER, p.CENTER)
      p.fill(THEME.textFg)
      p.text(this.date, this.windowWidth / 2, dateBottomY)
    }

    this.p.image(this.pauseGraphic, 0, 0)
  },
  drawBodyOutlines() {
    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i]
      const radius = body.radius * 4

      this.p.stroke(this.getGrey())
      this.p.stroke('black')
      this.p.strokeWeight(1)
      this.p.color('rgba(0,0,0,0)')
      this.p.ellipse(body.position.x, body.position.y, radius, radius)
    }
  },

  drawBg() {
    if (this.lastMissileCantBeUndone) {
      this.p.background('rgb(150,150,150)')
      this.p.textSize(100)
      this.p.textAlign(this.p.CENTER, this.p.CENTER)
      this.p.text('YOUR GUN\nIS BROKEN!', this.windowWidth / 2, 100)
    } else {
      this.p.background(THEME.bg)
    }

    if (!this.starBG) {
      this.starBG = this.p.createGraphics(this.windowWidth, this.windowHeight)
      this.starBG.pixelDensity(this.pixelDensity)

      for (let i = 0; i < 200; i++) {
        // this.starBG.stroke('black')
        this.starBG.noStroke()
        // this.starBG.fill('rgba(255,255,255,0.6)')
        // this.starBG.fill('black')
        this.starBG.fill(THEME.fg)
        this.starBG.textSize(15)
        const strings = [',', '.', '*']
        this.starBG.text(
          strings[Math.floor(Math.random() * strings.length)],
          Math.floor(Math.random() * this.windowWidth),
          Math.floor(Math.random() * this.windowHeight)
        )
      }
      //   const totalLines = 6
      //   for (let i = 0; i < totalLines; i++) {
      //     if (i % 5 == 5) {
      //       this.starBG.strokeWeight(1)
      //       // this.starBG.stroke(`hsl(${i * (360 / totalLines)}, 100%, 50%)`)
      //     } else {
      //       this.starBG.strokeWeight(1)
      //       // this.starBG.stroke('rgba(0,0,0,0.1)')
      //     }
      //     this.starBG.line(i * (this.windowWidth / totalLines), 0, i * (this.windowWidth / totalLines), this.windowHeight)
      //     this.starBG.line(0, i * (this.windowHeight / totalLines), this.windowWidth, i * (this.windowHeight / totalLines))
      //   }
      // }
    }
    const basicX = 0
    // Math.floor((this.frames / FPS) * (this.frames / FPS)) % this.windowWidth
    const basicY = 0
    // Math.floor((this.frames / FPS) * (this.frames / FPS)) % this.windowHeight

    // const basicX = this.accumX % this.windowWidth
    // const basicY = this.accumY % this.windowHeight

    // const Xleft = basicX - this.windowWidth
    // const Xright = basicX + this.windowWidth

    // const Ytop = basicY - this.windowHeight
    // const Ybottom = basicY + this.windowHeight

    // this.confirmedStarPositions ||= []
    // for (let i = 0; i < this.starPositions?.length; i++) {
    //   if (i < this.confirmedStarPositions.length) continue
    //   const starBody = this.starPositions[i]
    //   const radius = starBody.radius * 4
    //   if (Xleft < 10) {
    //     this.drawBodiesLooped(starBody, radius, this.drawStarOnBG)
    //     if (this.loaded) {
    //       this.confirmedStarPositions.push(this.starPositions[i])
    //     }
    //   } else {
    //     this.drawBodiesLooped(starBody, radius, this.drawStarOnTopOfBG)
    //   }
    // }

    this.p.image(
      this.starBG,
      basicX,
      basicY,
      this.windowWidth,
      this.windowHeight
    )
    // this.p.image(
    //   this.starBG,
    //   Xleft,
    //   basicY,
    //   this.windowWidth,
    //   this.windowHeight
    // )
    // this.p.image(
    //   this.starBG,
    //   Xright,
    //   basicY,
    //   this.windowWidth,
    //   this.windowHeight
    // )
    // this.p.image(this.starBG, basicX, Ytop, this.windowWidth, this.windowHeight)
    // this.p.image(
    //   this.starBG,
    //   basicX,
    //   Ybottom,
    //   this.windowWidth,
    //   this.windowHeight
    // )
    // this.p.image(this.starBG, Xleft, Ytop, this.windowWidth, this.windowHeight)
    // this.p.image(this.starBG, Xright, Ytop, this.windowWidth, this.windowHeight)
    // this.p.image(
    //   this.starBG,
    //   Xleft,
    //   Ybottom,
    //   this.windowWidth,
    //   this.windowHeight
    // )
    // this.p.image(
    //   this.starBG,
    //   Xright,
    //   Ybottom,
    //   this.windowWidth,
    //   this.windowHeight
    // )

    // // Grid lines, uncomment for visual debugging and alignment
    // const boxCount = 6
    // // this.p.stroke('black')
    // this.p.stroke('white')
    // for (let i = 1; i < boxCount; i++) {
    //   if (i % 5 == 5) {
    //     this.p.strokeWeight(1)
    //     // this.starBG.stroke(`hsl(${i * (360 / totalLines)}, 100%, 50%)`)
    //   } else {
    //     this.p.strokeWeight(1)
    //   }
    //   this.p.line(
    //     i * (this.windowWidth / boxCount),
    //     0,
    //     i * (this.windowWidth / boxCount),
    //     this.windowHeight
    //   )
    //   this.p.line(
    //     0,
    //     i * (this.windowHeight / boxCount),
    //     this.windowWidth,
    //     i * (this.windowHeight / boxCount)
    //   )
    // }
  },

  getColorDir(chunk) {
    return Math.floor(this.frames / (255 * chunk)) % 2 == 0
  },

  getGrey() {
    if (this.getColorDir(this.chunk)) {
      return 255 - (Math.floor(this.frames / this.chunk) % 255)
    } else {
      return Math.floor(this.frames / this.chunk) % 255
    }
  },

  drawScore() {
    const { p } = this
    p.push()
    p.fill('white')
    p.noStroke()
    p.textAlign(p.LEFT, p.TOP)

    const runningFrames = this.frames - this.startingFrame
    const seconds = (this.framesTook || runningFrames) / this.FPS
    const secondsLeft =
      (this.level > 5 ? 60 : GAME_LENGTH_BY_LEVEL_INDEX[this.level - 1]) -
      seconds
    if (this.gameOver) {
      this.scoreSize = this.initialScoreSize
      p.pop()
      this.won ? this.drawWinScreen() : this.drawLoseScreen()
      if (!this.celebrating) return
    }

    // flash the score red and white
    if (this.won) {
      const flash = Math.floor(this.frames / 10) % 2 == 0
      p.fill(flash ? THEME.red : 'white')
    }

    p.textFont(fonts.body)
    p.textSize(this.scoreSize)
    if (runningFrames > 2) {
      p.text(secondsLeft.toFixed(2), 20, 10)
    }

    p.pop()
  },

  drawWinScreen() {
    const justEntered = this.winScreenLastVisibleFrame !== this.p5Frames - 1
    if (justEntered) {
      this.winScreenVisibleForFrames = 0
    }
    this.winScreenVisibleForFrames++
    this.winScreenLastVisibleFrame = this.p5Frames

    const celebrationTime = 3 // seconds
    this.celebrating =
      this.winScreenVisibleForFrames / this.P5_FPS < celebrationTime

    if (this.celebrating && !this.skipAhead) {
      this.drawGameOverTicker({
        text: '                 YAYYYYYYYYYYY',
        bottom: true,
        fg: THEME.iris_30
      })
    } else {
      this.drawStatsScreen()
    }
  },

  drawStatsScreen() {
    const { p } = this

    const justEntered = this.statsScreenLastVisibleFrame !== this.p5Frames - 1
    if (justEntered) {
      this.statsScreenVisibleForFrames = 0
      this.P5_FPS = this.FPS * this.P5_FPS_MULTIPLIER
      this.p.frameRate(this.P5_FPS)
    }
    this.statsScreenVisibleForFrames++
    this.statsScreenLastVisibleFrame = this.p5Frames

    const entranceTime = 0.4 // seconds

    const scale = Math.min(
      1,
      this.statsScreenVisibleForFrames / (entranceTime * this.P5_FPS)
    )

    p.push()
    p.noStroke()
    p.fill('white')

    // logo at top
    if (!fonts.dot) return
    p.textFont(fonts.dot)
    p.fill(THEME.pink)
    p.textSize(60)
    p.textAlign(p.LEFT, p.TOP)
    const logoY = p.map(scale, 0, 1, -100, 22)
    drawKernedText(p, 'Anybody', 334, logoY, 0.8)
    drawKernedText(p, 'Problem', 640, logoY, 2)

    // bordered boxes
    p.fill('black')
    p.stroke(THEME.border)
    p.strokeWeight(1)
    const gutter = 24
    const middleBoxY = 320
    p.rect(gutter, 104, this.windowWidth - gutter * 2, 144, 24)

    if (this.showShare) {
      p.rect(gutter, 320, this.windowWidth - gutter * 2, 524, 24)
    } else {
      p.rect(gutter, 320, this.windowWidth - gutter * 2, 444, 24)
      p.rect(gutter, 796, this.windowWidth - gutter * 2, 64, 24)
    }

    // upper box text
    p.textSize(32)
    p.noStroke()
    if (!fonts.body) return
    p.textFont(fonts.body)
    p.fill(THEME.iris_60)

    // upper box text - labels
    p.text('problem', 330, 132)
    p.text('solver', 330, 192)

    // upper box text - values
    p.textSize(54)
    p.fill(THEME.iris_30)
    const date = new Date(this.date)
    const options = { month: 'short', day: '2-digit', year: 'numeric' }
    const formattedDate = date
      .toLocaleDateString('en-US', options)
      .toUpperCase()
      .replace(', ', '-')
      .replace(' ', '-')
    p.text(formattedDate, 454, 114)
    p.text(this.owner, 454, 174)
    // end upper box text

    // middle box text
    p.textSize(48)
    p.fill(THEME.iris_60)
    p.textAlign(p.RIGHT, p.TOP)
    const col1X = 580
    const col2X = 770
    const col3X = 960

    // middle box text - labels
    p.text('time', col1X, 264)
    p.text('best', col2X, 264)
    p.text('+/-', col3X, 264)

    // middle box text - values
    const levelTimes = this.levelSpeeds
      .map((result) => result?.framesTook / this.FPS)
      .filter((l) => l !== undefined)

    const bestTimes =
      this.bestTimes ?? Array.from({ length: 5 }, (_, i) => levelTimes[i] || 0)
    const plusMinus = bestTimes
      .map((best, i) => {
        if (i >= levelTimes.length) return ''
        const time = levelTimes[i]
        const diff = time - best
        const sign = diff > 0 ? '+' : ''
        return sign + diff.toFixed(2)
      })
      .filter(Boolean)
    const problemComplete = levelTimes.length >= LEVELS
    const rowHeight = 72

    // middle box text - highlight current row
    p.fill('rgba(146, 118, 255, 0.2)')
    p.rect(
      gutter,
      middleBoxY + (levelTimes.length - 1) * rowHeight,
      this.windowWidth - gutter * 2,
      rowHeight
    )

    // middle box text - value text
    p.push()
    p.textAlign(p.RIGHT, p.CENTER)
    p.textSize(44)
    // const middleBoxPadding = 12
    // p.translate(0, middleBoxPadding)
    for (let i = 0; i < LEVELS; i++) {
      const time = i < levelTimes.length ? levelTimes[i].toFixed(2) : '-'
      const light = i % 2 == 0
      p.fill(light ? THEME.iris_30 : THEME.iris_60)
      p.text(
        time,
        col1X,
        middleBoxY + rowHeight * i + rowHeight / 2,
        150,
        rowHeight
      )
    }
    for (let i = 0; i < LEVELS; i++) {
      const best = i < bestTimes.length ? bestTimes[i] : '-'
      const light = i % 2 == 1 && i < levelTimes.length
      p.fill(light ? THEME.iris_30 : THEME.iris_60)
      p.text(
        best.toFixed(2),
        col2X,
        middleBoxY + rowHeight * i + rowHeight / 2,
        150,
        rowHeight
      )
    }
    for (let i = 0; i < LEVELS; i++) {
      const diff = plusMinus[i] || '-'
      if (i === levelTimes.length - 1) {
        p.fill(/^-/.test(diff) ? THEME.lime : THEME.flame_50)
      } else {
        p.fill(/^-/.test(diff) ? THEME.green_75 : THEME.flame_75)
      }
      p.text(
        diff,
        col3X,
        middleBoxY + rowHeight * i + rowHeight / 2,
        150,
        rowHeight
      )
    }
    p.textSize(64)

    // middle box text - sum line
    const bestTime = bestTimes.reduce((a, b) => a + b, 0)
    const levelTimeSum = levelTimes.reduce((a, b) => a + b, 0)
    const sumLine = [
      levelTimeSum.toFixed(2),
      bestTime.toFixed(2),
      (levelTimeSum - bestTime).toFixed(2)
    ]
    const sumLineY = middleBoxY + rowHeight * bestTimes.length + rowHeight / 2
    const sumLineHeight = 80
    p.textAlign(p.LEFT, p.CENTER)
    p.fill(THEME.iris_30)
    p.text(problemComplete ? 'solved in' : 'current time', 44, sumLineY)
    p.textAlign(p.RIGHT, p.CENTER)
    for (const [i, col] of [col1X, col2X, col3X].entries()) {
      if (i == 0) p.fill('white')
      else if (i == 1) p.fill(THEME.iris_60)
      else p.fill(/^-/.test(sumLine[i]) ? THEME.lime : THEME.flame_75)
      p.text(sumLine[i], col, sumLineY, 150, sumLineHeight)
    }

    p.pop()
    // end middle box text

    // draw hero this.bodies[0]
    const body = this.getDisplayHero()
    const radius = this.getBodyRadius(body.radius)
    const xWobble = p.sin(p.frameCount / this.P5_FPS) * (5 + body.bodyIndex)
    const yWobble =
      p.cos(p.frameCount / this.P5_FPS + body.bodyIndex * 3) *
      (6 + body.bodyIndex)

    body.position = {
      x: p.map(scale, 0, 1, -140, 170) + xWobble,
      y: 180 + yWobble
    }
    this.bodiesGraphic ||= this.p.createGraphics(
      this.windowWidth,
      this.windowHeight
    )
    this.drawBodiesLooped(body, radius, this.drawBody)

    // begin middle box baddie body pyramid
    this.winScreenBadies ||= this.getDisplayBaddies()
    const baddies = this.winScreenBadies
    for (let i = 0; i < baddies.length; i++) {
      const row = baddies[i]
      for (let j = 0; j < row.length; j++) {
        const body = row[j]
        body.position = this.createVector(
          64 + j * 72,
          middleBoxY + i * rowHeight + rowHeight / 2
        )
        body.velocity = this.createVector(0, 1)
        body.radius = 6.5
        this.drawBodiesLooped(body, 3, this.drawBody)
      }
    }

    p.image(this.bodiesGraphic, 0, 0)
    this.bodiesGraphic.clear()

    // overlay transparent black box to dim past last levelTimes
    p.fill('rgba(0,0,0,0.6)')
    p.rect(
      gutter,
      middleBoxY + rowHeight * levelTimes.length,
      this.windowWidth - gutter * 2,
      rowHeight * (LEVELS - levelTimes.length)
    )

    // bottom box ticker text
    this.winTickerGraphic ||= this.p.createGraphics(
      this.windowWidth,
      this.windowHeight
    )
    p.textAlign(p.LEFT, p.TOP)
    p.textSize(32)
    p.fill(THEME.iris_30)
    p.text(
      this.level == 5
        ? 'CONGRATS!!! SAVE YOUR GAME TO SOLVE THE PROBLEM!!!!'
        : 'NICE JOB!!!!    Keep going!!!   Solve this problem and climb the leaderboard.',
      44,
      811
    )
    if (this.level < 5) {
      // bottom buttons
      const buttonCount = this.showShare ? 4 : 3
      this.drawBottomButton({
        text: 'RETRY',
        onClick: () => {
          this.restart(null, false)
        },
        ...themes.buttons.teal,
        columns: buttonCount,
        column: 0
      })
      this.drawBottomButton({
        text: 'RESTART',
        onClick: () => {
          this.level = 1
          this.restart(null, false)
        },
        ...themes.buttons.flame,
        columns: buttonCount,
        column: 1
      })
      if (this.showShare) {
        this.drawBottomButton({
          text: 'SHARE',
          onClick: () => this.restart(null, false),
          ...themes.buttons.pink,
          columns: buttonCount,
          column: 2
        })
      }
      this.drawBottomButton({
        text: 'NEXT',
        onClick: () => {
          this.level++
          this.restart(null, false)
        },
        ...themes.buttons.green,
        columns: buttonCount,
        column: buttonCount - 1
      })
    } else {
      this.drawBottomButton({
        text: this.readyToSave ? 'SAVE' : 'ALMOST READY TO SAVE...',
        onClick: () => {
          this.emit('save')
        },
        ...themes.buttons.green,
        columns: 1,
        column: 0
      })
    }
    p.pop()
  },

  getDisplayHero() {
    const body = this.bodies[0]
    const bodyCopy = JSON.parse(
      JSON.stringify(
        body,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    )
    bodyCopy.position = this.p.createVector(body.position.x, body.position.y)
    bodyCopy.velocity = this.p.createVector(body.velocity.x, body.velocity.y)
    bodyCopy.radius = 30
    return bodyCopy
  },

  getDisplayBaddies() {
    const baddies = []
    const body = this.bodies[this.bodies.length - 1]
    if (!body) return []
    const str = JSON.stringify(body)
    for (let i = 0; i < LEVELS; i++) {
      baddies.push([])
      for (let j = 0; j < i + 1; j++) {
        const bodyCopy = JSON.parse(str)
        bodyCopy.position = this.p.createVector(
          body.position.x,
          body.position.y
        )
        bodyCopy.velocity = this.p.createVector(
          body.velocity.x,
          body.velocity.y
        )
        baddies[i].push(body)
      }
    }
    return baddies
  },

  drawGameOverTicker({ text, bottom = false, fg }) {
    const doubleText = `${text} ${text} `

    const { p } = this

    p.fill(fg)
    p.textSize(200)
    p.textAlign(p.LEFT, p.TOP)
    p.textFont(fonts.dot)
    const tickerSpeed = -200 / this.P5_FPS
    const textWidth = p.textWidth(doubleText)
    if (
      !this.gameoverTickerX ||
      this.gameoverTickerX + tickerSpeed < -textWidth / 2
    ) {
      this.gameoverTickerX = 0
    }
    this.gameoverTickerX += tickerSpeed
    p.text(
      doubleText,
      this.gameoverTickerX,
      bottom ? this.windowHeight - 80 - 120 : 80
    )
  },

  drawLoseScreen() {
    const { p } = this
    p.push()
    p.noStroke()
    p.fill(this.randomColor(100))

    this.drawGameOverTicker({ text: 'GAME OVER', fg: THEME.red })

    if (this.showPlayAgain) {
      this.drawFatButton({
        text: 'RETRY',
        onClick: () => this.restart(null, false),
        fg: THEME.red,
        bg: THEME.maroon
      })
    }

    p.pop()
  },

  scaleX(val) {
    const { canvas } = this.p
    return (val / canvas.offsetWidth) * this.windowWidth
  },

  scaleY(val) {
    const { canvas } = this.p
    return (val / canvas.offsetHeight) * this.windowHeight
  },

  drawGun() {
    this.p.stroke('rgba(200,200,200,1)')
    this.p.strokeCap(this.p.SQUARE)

    if (this.p.mouseX <= 0 && this.p.mouseY <= 0) return

    // Bottom left corner coordinates
    let startX = 0
    let startY = this.windowHeight
    this.p.strokeWeight(2)

    const crossHairSize = 25

    // Calculate direction from bottom left to mouse
    let dirX = this.scaleX(this.p.mouseX) - startX
    let dirY = this.scaleY(this.p.mouseY) - startY
    this.p.line(
      this.scaleX(this.p.mouseX) - crossHairSize,
      this.scaleX(this.p.mouseY),
      this.scaleX(this.p.mouseX) + crossHairSize,
      this.scaleX(this.p.mouseY)
    )
    this.p.line(
      this.scaleX(this.p.mouseX),
      this.scaleX(this.p.mouseY) - crossHairSize,
      this.scaleX(this.p.mouseX),
      this.scaleX(this.p.mouseY) + crossHairSize
    )

    if (this.paused || this.gameOver) return

    // Draw the line
    const drawingContext = this.p.canvas.getContext('2d')
    const chunk = this.windowWidth / 100
    drawingContext.setLineDash([chunk])
    if (this.aimHelper) {
      drawingContext.lineDashOffset = -(this.frames * 10)
    }

    this.p.line(startX, startY, startX + dirX, startY + dirY)
    drawingContext.setLineDash([])
    drawingContext.lineDashOffset = 0
    this.p.strokeWeight(0)
  },

  drawExplosions() {
    const { p, explosions } = this

    for (let i = 0; i < explosions.length; i++) {
      const _explosion = explosions[i]
      const bomb = _explosion[0]
      p.fill('rgba(255,255,255,0.5)')
      p.stroke('white')
      p.strokeWeight(2)
      p.ellipse(bomb.x, bomb.y, bomb.i * 2, bomb.i * 2)
      p.ellipse(bomb.x, bomb.y, bomb.i * 1.8, bomb.i * 1.8)
      p.ellipse(bomb.x, bomb.y, bomb.i * 1.6, bomb.i * 1.6)
      p.ellipse(bomb.x, bomb.y, bomb.i * 1.4, bomb.i * 1.4)
      p.ellipse(bomb.x, bomb.y, bomb.i * 1.6, bomb.i * 1.6)
      p.fill('rgba(255,255,255,0.9)')
      p.ellipse(bomb.x, bomb.y, bomb.i * 1.4, bomb.i * 1.4)
      _explosion.shift()
      if (_explosion.length == 0) {
        explosions.splice(i, 1)
      }
    }
  },

  drawMissiles() {
    this.p.noStroke()
    this.p.strokeWeight(0)

    const missileReverbLevels = 10
    const green = '2,247,123'
    // const yellow = '255,255,0'
    const color = green
    const c =
      Math.floor(this.frames / missileReverbLevels) % 2 == 0
        ? `rgb(${color})`
        : 'white'

    for (let i = 0; i < this.missiles.length; i++) {
      const body = this.missiles[i]
      this.p.noStroke()
      this.p.fill(c)
      this.p.ellipse(body.position.x, body.position.y, body.radius, body.radius)

      this.p.noFill()
      this.p.strokeWeight(10)
      for (let i = 0; i < missileReverbLevels; i++) {
        const c =
          Math.floor((this.frames - i) / missileReverbLevels) % 2 == 0
            ? `rgba(${color},${(missileReverbLevels - i) / missileReverbLevels})`
            : `rgba(255,255,255,${(missileReverbLevels - i) / missileReverbLevels})`
        this.p.stroke(c)
        const reverb = body.radius * (i + 1)
        this.p.ellipse(body.position.x, body.position.y, reverb, reverb)
      }
    }
  },

  isMissileClose(body) {
    const minDistance = 300
    let closeEnough = false
    for (let i = 0; i < this.missiles.length; i++) {
      const missile = this.missiles[i]
      const distance = this.p.dist(
        body.position.x,
        body.position.y,
        missile.position.x,
        missile.position.y
      )
      if (distance < minDistance) {
        closeEnough = true
        break
      }
    }
    return closeEnough
  },

  drawImageAsset(assetUrl, width, fill, myP = this.bodiesGraphic) {
    this.imgAssets ||= {}
    // TODO: remove width from ID when colors aren't temp-random
    const id = assetUrl + width + fill
    const loaded = this.imgAssets[id]

    if (!loaded) {
      this.imgAssets[id] = 'loading'
      fetch(assetUrl)
        .then((resp) => resp.text())
        .then((svg) => {
          svg = fill ? replaceAttribute(svg, 'fill', fill) : svg
          svg = replaceAttribute(svg, 'stroke-width', '2')
          svg = 'data:image/svg+xml,' + encodeURIComponent(svg)

          this.p.loadImage(svg, (img) => {
            const width = img.width
            const height = img.height

            const foo = this.p.createGraphics(width, height)
            foo.pixelDensity(this.pixelDensity)

            foo.image(img, 0, 0, width, height)

            this.imgAssets[id] = foo
          })
        })
        .catch((e) => {
          console.error(e)
          this.imgAssets[id] = undefined
        })
    }

    if (loaded && loaded !== 'loading') {
      myP.image(loaded, -width / 2, -width / 2, width, width)
    }
  },
  closeTo(body) {
    let isClose = false
    const minDistance = body.radius * 2
    for (let i = 1; i < this.bodies.length; i++) {
      const other = this.bodies[i]
      if (other.radius == 0) continue
      const specificDistance = minDistance + other.radius * 4
      const distance = this.p.dist(
        body.position.x,
        body.position.y,
        other.position.x,
        other.position.y
      )
      if (distance <= specificDistance) {
        isClose = true
        break
      }
    }
    return isClose
  },

  drawFaceSvg(body, width) {
    const maxIndex = Math.min(FACE_BLINK_SVGS.length, FACE_SVGS.length)
    this.fIndex ||= this.random(0, maxIndex - 1)
    const fIndex = (this.fIndex + body.bodyIndex) % maxIndex
    const graphic = body.graphic || this.bodiesGraphic

    const baddiesNear = this.closeTo(body)
    if (baddiesNear && !this.paused) {
      this.drawImageAsset(FACE_SHOT_SVGS[this.fIndex], width, null, graphic)
      return
    }

    const x = 5 // every 5 seconds it blinks
    const m = this.P5_FPS // for 25 frames (1 second)
    // uncomment the following line to rotate face
    // this.bodiesGraphic.push()
    // this.bodiesGraphic.rotate(body.velocity.heading() + this.p.PI / 2)
    if (
      Math.floor(this.p5Frames / x) % m == 0 ||
      Math.floor(this.p5Frames / x) % m == 2
    ) {
      this.drawImageAsset(FACE_BLINK_SVGS[fIndex], width, null, graphic)
    } else {
      this.drawImageAsset(FACE_SVGS[fIndex], width, null, graphic)
    }
    // this.bodiesGraphic.pop()
  },

  drawStarForegroundSvg(width, body) {
    const fill = body.c.fg
    const graphic = body.graphic || this.bodiesGraphic
    graphic.push()
    this.fgIndex ||= Math.floor(Math.random() * FG_SVGS.length)
    const fgIndex = (this.bgIndex + body.bodyIndex) % FG_SVGS.length
    const r = {
      ...rot.fg,
      ...(rotOverride?.fg?.[fgIndex] ?? {})
    }
    const rotateBy = r.speed == 0 ? 0 : (this.frames / r.speed) % 360
    graphic.rotate(r.direction * rotateBy)
    this.drawImageAsset(FG_SVGS[fgIndex], width, fill, graphic)
    graphic.pop()
  },

  drawCoreSvg(width, body) {
    const fill = body.c.core
    const graphic = body.graphic || this.bodiesGraphic
    graphic.push()
    const r = {
      ...rot.core,
      ...(rotOverride?.core?.[0] ?? {})
    }
    const rotateBy = r.speed == 0 ? 0 : (this.frames / r.speed) % 360
    graphic.rotate(r.direction * rotateBy)
    this.drawImageAsset(CORE_SVGS[0], width, fill, graphic)
    graphic.pop()
  },

  drawStarBackgroundSvg(width, body) {
    const fill = body.c.bg
    const graphic = body.graphic || this.bodiesGraphic
    graphic.push()
    this.bgIndex ||= Math.floor(Math.random() * BG_SVGS.length)
    const bgIndex = (this.bgIndex + body.bodyIndex) % BG_SVGS.length
    const r = {
      ...rot.bg,
      ...(rotOverride?.bg?.[bgIndex] ?? {})
    }
    const rotateBy = r.speed == 0 ? 0 : (this.frames / r.speed) % 360
    graphic.rotate(r.direction * rotateBy)
    this.drawImageAsset(BG_SVGS[bgIndex], width, fill, graphic)
    graphic.pop()
  },

  moveAndRotate_PopAfter(graphic, x, y /*v*/) {
    graphic.push()
    graphic.translate(x, y)

    // rotate body in vector direction
    // const angle = v.heading() + this.p.PI / 2
    // graphic.rotate(angle)

    // if (v.x > 0) {
    //   graphic.scale(-1, 1)
    // }
    // if (v.y > 0) {
    //   graphic.scale(1, -1)
    // }
  },

  drawBody(x, y, v, radius, body) {
    const graphic = body.graphic || this.bodiesGraphic
    this.moveAndRotate_PopAfter(graphic, x, y, v)

    // y-offset of face relative to center
    // const offset = this.getOffset(radius)

    if (body.bodyIndex === 0 || body.hero) {
      // draw hero
      const size = Math.floor(body.radius * BODY_SCALE * 2.66)

      this.drawStarBackgroundSvg(size, body)
      if (!body.backgroundOnly) {
        this.drawCoreSvg(body.radius * BODY_SCALE, body)
      }
      this.drawStarForegroundSvg(size, body)
      if (!body.backgroundOnly) {
        this.drawFaceSvg(body, size)
      }
    } else {
      this.drawBaddie(body)
    }

    graphic.pop()
  },

  getBodyRadius(actualRadius) {
    return actualRadius * 4
  },

  drawBodiesLooped(body, radius, drawFunction) {
    body.backgroundOnly = false
    drawFunction = drawFunction.bind(this)
    drawFunction(body.position.x, body.position.y, body.velocity, radius, body)

    if (this.paused) return
    let loopedX = false,
      loopedY = false,
      loopX = body.position.x,
      loopY = body.position.y
    const loopGap = radius * 1.5
    body.backgroundOnly = true
    // crosses right, draw on left
    if (body.position.x > this.windowWidth - loopGap) {
      loopedX = true
      loopX = body.position.x - this.windowWidth
      drawFunction(loopX, body.position.y, body.velocity, radius, body)
      // crosses left, draw on right
    } else if (body.position.x < loopGap) {
      loopedX = true
      loopX = body.position.x + this.windowWidth
      drawFunction(loopX, body.position.y, body.velocity, radius, body)
    }

    // crosses bottom, draw on top
    if (body.position.y > this.windowHeight - loopGap) {
      loopedY = true
      loopY = body.position.y - this.windowHeight
      drawFunction(body.position.x, loopY, body.velocity, radius, body)
      // crosses top, draw on bottom
    } else if (body.position.y < loopGap) {
      loopedY = true
      loopY = body.position.y + this.windowHeight
      drawFunction(body.position.x, loopY, body.velocity, radius, body)
    }

    // crosses corner, draw opposite corner
    if (loopedX && loopedY) {
      drawFunction(loopX, loopY, body.velocity, radius, body)
    }
  },

  // TODO: add this back as part of a end game animation
  drawWitheringBodies() {
    if (this.gameOver) {
      return
    }
    const { p } = this

    this.bodiesGraphic ||= p.createGraphics(this.windowWidth, this.windowHeight)

    this.bodiesGraphic.drawingContext.msImageSmoothingEnabled = false
    this.bodiesGraphic.drawingContext.mozImageSmoothingEnabled = false
    this.bodiesGraphic.drawingContext.webkitImageSmoothingEnabled = false
    this.bodiesGraphic.drawingContext.imageSmoothingEnabled = false
    // this.bodiesGraphic.pixelDensity(0.2)

    this.bodiesGraphic.drawingContext.msImageSmoothingEnabled = false
    this.bodiesGraphic.drawingContext.mozImageSmoothingEnabled = false
    this.bodiesGraphic.drawingContext.webkitImageSmoothingEnabled = false
    this.bodiesGraphic.drawingContext.imageSmoothingEnabled = false
    this.bodiesGraphic.noStroke()
    for (const body of this.witheringBodies) {
      p.push()
      p.translate(body.position.x, body.position.y)
      body.witherSteps ||= 0
      body.witherSteps++
      if (body.witherSteps > WITHERING_STEPS) {
        this.witheringBodies = this.witheringBodies.filter((b) => b !== body)
        p.pop()
        continue
      }

      // the body should shrink to nothing over WITHERING_STEPS
      const radius = p.map(
        WITHERING_STEPS - body.witherSteps,
        0,
        WITHERING_STEPS,
        1,
        30 // start radius
      )

      // the ghost body pulses a little bit, isn't totally round
      body.zoff ||= 0
      p.stroke(255)
      p.noFill()
      p.fill(255, 255, 255, 230)
      p.beginShape()
      for (let a = 0; a < p.TWO_PI; a += 0.02) {
        let xoff = p.map(p.cos(a), -1, 1, 0, 2)
        let yoff = p.map(p.sin(a), -1, 1, 0, 2)
        const r = p.map(
          p.noise(xoff, yoff, body.zoff),
          0,
          1,
          radius - 10,
          radius
        )
        let x = r * p.cos(a)
        let y = r * p.sin(a)
        p.vertex(x, y)
      }
      p.endShape(p.CLOSE)
      body.zoff += 0.01

      p.pop()
    }
  },

  async drawBodies(attachToCanvas = true) {
    if (this.won && !this.celebrating) return
    this.bodiesGraphic ||= this.p.createGraphics(
      this.windowWidth,
      this.windowHeight
    )
    this.bodiesGraphic.noStroke()

    const bodyCopies = []
    for (let i = 0; i < this.bodies.length; i++) {
      // const body = this.bodies.sort((a, b) => b.radius - a.radius)[i]
      const body = this.bodies[i]
      // after final proof is sent, don't draw upgradable bodies
      if (body.radius == 0) continue
      const bodyRadius = this.bodyCopies.filter(
        (b) => b.bodyIndex == body.bodyIndex
      )[0]?.radius
      const radius = this.getBodyRadius(bodyRadius)
      this.drawBodiesLooped(body, radius, this.drawBody)

      const bodyCopy = JSON.parse(
        JSON.stringify(
          body,
          (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        )
      )
      bodyCopy.position = this.p.createVector(body.position.x, body.position.y)
      bodyCopy.velocity = this.p.createVector(body.velocity.x, body.velocity.y)
      bodyCopies.push(bodyCopy)
    }
    this.frames % this.tailMod == 0 && this.allCopiesOfBodies.push(bodyCopies)
    if (this.allCopiesOfBodies.length > this.tailLength) {
      this.allCopiesOfBodies.shift()
    }
    if (attachToCanvas) {
      this.p.image(this.bodiesGraphic, 0, 0)
    }
    this.bodiesGraphic.clear()
  },

  drawPauseBodies() {
    this.pauseGraphic.noStroke()

    for (const [i, body] of this.pauseBodies.entries()) {
      this.pauseGraphic.push()
      body.position.x
      // after final proof is sent, don't draw upgradable bodies
      if (body.radius == 0) continue
      const bodyRadius = this.bodyCopies.filter(
        (b) => b.bodyIndex == body.bodyIndex
      )[0]?.radius

      // TODO: often there is no bodyRadius because bodyIndex doesn't match
      // what is going on there?
      // if (!bodyRadius) {
      //   throw new Error('no body matches')
      // }

      const radius = this.getBodyRadius(bodyRadius)

      // calculate x and y wobble factors based on this.p5Frames to make the pause bodies look like they're bobbing around
      const xWobble =
        this.p.sin(this.p.frameCount / this.P5_FPS) * (10 + body.bodyIndex)
      const yWobble =
        this.p.cos(this.p.frameCount / this.P5_FPS + body.bodyIndex * 3) *
        (16 + body.bodyIndex)

      // if not paused, bodies should flee to the nearest side of the screen
      const fleeDuration = 1.5 // seconds
      const xFlee =
        this.willUnpause && this.beganUnpauseAt
          ? this.p.map(
              this.p5Frames - this.beganUnpauseAt,
              0,
              this.P5_FPS * fleeDuration,
              0,
              body.position.x > this.windowWidth / 2
                ? this.windowWidth + 300
                : -300
            )
          : 0
      const yFlee =
        this.willUnpause && this.beganUnpauseAt
          ? this.p.map(
              this.p5Frames - this.beganUnpauseAt,
              0,
              this.P5_FPS * fleeDuration,
              0,
              body.position.y > this.windowHeight / 2
                ? this.windowHeight + 300
                : -300
            )
          : 0

      const bodyCopy = JSON.parse(
        JSON.stringify(
          body,
          (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        )
      )
      bodyCopy.position = this.p.createVector(
        body.position.x + xWobble + xFlee,
        body.position.y + yWobble + yFlee
      )
      bodyCopy.velocity = this.p.createVector(body.velocity.x, body.velocity.y)
      bodyCopy.graphic = this.pauseGraphic
      bodyCopy.hero = i < 3
      this.drawBodiesLooped(bodyCopy, radius, this.drawBody)
      this.pauseGraphic.pop()
    }
  },

  replaceOpacity(c, opacity) {
    const isHSLA = c.includes('hsla')
    const prefix = isHSLA ? 'hsla' : 'rgba'
    let cc = c
      .split(',')
      .map((c) => parseFloat(c.replace(')', '').replace(prefix + '(', '')))
    if (cc.length !== 4) {
      throw new Error('Color must have alpha value format, instead it has ' + c)
    }
    cc[3] = opacity
    if (isHSLA) {
      cc[1] = cc[1] + '%'
      cc[2] = cc[2] + '%'
    }
    return `${prefix}(${cc.join(',')})`
  },

  brighten(c, amount = 20) {
    let cc = c
      .split(',')
      .map((c) => parseFloat(c.replace(')', '').replace('hsla(', '')))
    cc[2] = cc[2] + amount
    cc[1] = cc[1] + '%'
    cc[2] = cc[2] + '%'
    return `hsla(${cc.join(',')})`
  },

  drawBaddie(body) {
    const graphic = body.graphic || this.bodiesGraphic
    const colorHSL = body.c
    const coreWidth = body.radius * BODY_SCALE
    let bgColor = hslToRgb(colorHSL, 0.5)
    const coreColor = hslToRgb(colorHSL)
    graphic.push()
    const rotate = (this.frames / 30) % 360
    graphic.rotate(rotate)
    this.drawImageAsset(
      BADDIE_SVG.bg,
      Math.floor(coreWidth * (310 / 111.2)),
      bgColor,
      graphic
    )
    graphic.push()
    graphic.rotate(-rotate + body.velocity.heading() + this.p.PI / 2)
    this.drawImageAsset(BADDIE_SVG.core, coreWidth, coreColor, graphic)
    if (!body.backgroundOnly) {
      this.drawImageAsset(BADDIE_SVG.face, coreWidth, undefined, graphic)

      // pupils always looking at missile, if no missile, look at mouse
      const target =
        this.missiles.length > 0
          ? this.missiles[0].position
          : { x: this.scaleX(this.p.mouseX), y: this.scaleY(this.p.mouseY) }

      const bx = body.position.x
      const by = body.position.y

      const leftEye = [-body.radius * 0.6, -body.radius * 0.15]
      const rightEye = [body.radius * 0.6, -body.radius * 0.15]

      graphic.fill('white')
      graphic.circle(leftEye[0], leftEye[1], body.radius)
      graphic.circle(rightEye[0], rightEye[1], body.radius)

      const angle =
        Math.atan2(target.y - by, target.x - bx) -
        body.velocity.heading() -
        this.p.PI / 2

      const distance = body.radius * 0.3
      const leftX = distance * Math.cos(angle)
      const leftY = distance * Math.sin(angle)

      graphic.fill('black')
      graphic.circle(leftX + leftEye[0], leftY + leftEye[1], body.radius * 0.4)
      graphic.circle(
        leftX + rightEye[0],
        leftY + rightEye[1],
        body.radius * 0.4
      )

      const heroBody = this.bodies[0]
      const minDistance = heroBody.radius * 2 + body.radius * 4
      const currentDistance = graphic.dist(
        heroBody.position.x,
        heroBody.position.y,
        body.position.x,
        body.position.y
      )
      const closeToBody = currentDistance <= minDistance

      if (closeToBody) {
        graphic.fill(coreColor)
        graphic.triangle(
          0,
          -body.radius * 0.2,
          leftEye[0] * 2,
          -body.radius * 0.8,
          rightEye[0] * 2,
          -body.radius * 0.8
        )
      }
    }

    graphic.pop()
    graphic.pop()
  },

  drawCenter(b, p = this.bodiesGraphic, x = 0, y = 0) {
    let closeEnough = false //this.isMissileClose(b)
    // this.p.blendMode(this.p.DIFFERENCE)
    p.noStroke()
    x = x == undefined ? b.position.x : x
    y = y == undefined ? b.position.y : y
    const r = b.radius * BODY_SCALE // b.radius * 4
    if (r == 0) return
    // let c = this.brighten(b.c).replace(this.opac, 1)
    let darker = this.brighten(b.c, -30).replace(this.opac, 1)

    p.fill(darker)
    p.ellipse(x, y, r)
    if (closeEnough) {
      // draw teeth
      const teeth = 10
      const toothSize = r / 4.5
      // if (closeEnough) {
      p.fill(darker)
      p.ellipse(x, y, r)
      for (let i = 0; i < teeth; i++) {
        if (i == Math.floor(teeth / 4)) continue
        if (i == Math.ceil(teeth / 4)) continue

        if (i == Math.floor((3 * teeth) / 4)) continue
        if (i == Math.ceil((3 * teeth) / 4)) continue
        p.fill('white')
        // draw each tooth
        const angle = (i * this.p.TWO_PI) / teeth
        // add some rotation depending on vector of body
        const rotatedAngle = angle + b.velocity.heading()
        const x1 = x + (r / 2.3) * this.p.cos(rotatedAngle)
        const y1 = y + (r / 2.3) * this.p.sin(rotatedAngle)
        p.ellipse(x1, y1, toothSize)
      }

      p.stroke(darker)
      p.strokeWeight(r / 12)
      p.noFill()
      p.ellipse(x, y, r)
    } else {
      /** DRAW TARGET */
      // const width = r / 2
      // const rotatedAngle = b.velocity.heading()
      // p.push()
      // p.translate(x, y)
      // p.rotate(rotatedAngle + p.PI / 2)
      // const teeth = 6
      // for (let i = 0; i < teeth; i++) {
      //   p.fill('white')
      //   const xx = 0 - width / (teeth / 2) + ((i % (teeth / 2)) * width) / 2
      //   const yy =
      //     -width / (teeth / 2) - ((i < teeth / 2 ? -1 : 1) * width) / 5
      //   p.ellipse(xx - width / teeth / 2, yy + width / 4, width / (teeth / 3))
      // }
      // p.fill(darker)
      // p.rect(0 - width / 1.5, 0 - width / 1.5, width * 1.5, width / 3)
      // p.rect(0 - width / 1.5, 0 + width / 4, width * 1.5, width / 3)
      // p.strokeWeight(15)
      // p.noFill()
      // p.stroke(darker)
      // p.ellipse(0, 0, r - 7)
      // p.pop()
      p.strokeWeight(0)
      const count = 3
      for (let i = 0; i < count; i++) {
        if (i % 2 == 1) {
          p.fill('white')
        } else {
          p.fill(darker)
        }
        p.ellipse(x, y, r - (i * r) / count)
      }
    }
    // p.blendMode(p.BLEND)
  },

  colorArrayToTxt(cc) {
    // let cc = baseColor.map(c => c + start + (chunk * i))
    cc.push(this.opac)
    cc = `hsla(${cc.join(',')})`
    return cc
  },

  createVector(x, y) {
    if (this.p) {
      return this.p.createVector(x, y)
    } else {
      return { x, y }
    }
  },

  frameRate() {
    this.lastFrameRateCheckAt ||= { frames: this.frames, time: Date.now() }
    this.lastFrameRate ||= 0

    if (this.frames - this.lastFrameRateCheckAt.frames > 30) {
      const diff = Date.now() - this.lastFrameRateCheckAt.time
      this.lastFrameRate =
        ((this.frames - this.lastFrameRateCheckAt.frames) / diff) * 1000
      this.lastFrameRateCheckAt = { frames: this.frames, time: Date.now() }
    }

    return this.lastFrameRate
  }
}
