import Prando from 'prando'

import EventEmitter from 'events'
import Sound from './sound.js'
import { Visuals, FPS } from './visuals.js'
import { _validateSeed, Calculations } from './calculations.js'
// import wc from './witness_calculator.js'

const GAME_LENGTH = 60 // seconds

function intersectsButton(button, x, y) {
  return (
    x > button.x &&
    x < button.x + button.width &&
    y > button.y &&
    y < button.y + button.height
  )
}

export class Anybody extends EventEmitter {
  constructor(p, options = {}) {
    super()

    Object.assign(this, Visuals)
    Object.assign(this, Calculations)

    this.setOptions(options)

    // Add other constructor logic here
    this.p = p
    // this.p.blendMode(this.p.DIFFERENCE)

    !this.util && this.prepareP5()
    this.clearValues()
    this.sound = new Sound(this)
    this.init()
    !this.util && this.start()
  }

  setOptions(options = {}) {
    const defaultOptions = {
      inputData: null,
      bodyData: null,
      starData: null,
      // Add default properties and their initial values here
      startingBodies: 1,
      seed: null,
      windowWidth: 1000,
      windowHeight: 1000,
      vectorLimit: 10,
      scalingFactor: 10n ** 3n,
      minDistanceSquared: 200 * 200,
      G: 100, // Gravitational constant
      mode: 'nft', // game or nft
      admin: false,
      solved: false,
      clearBG: true,
      colorStyle: '!squiggle', // squiggle or !squiggle
      preRun: 0,
      alreadyRun: 0,
      paintSteps: 0,
      chunk: 1,
      mute: true,
      freeze: false,
      stopEvery: 0,
      util: false,
      paused: true,
      globalStyle: 'default', // 'default', 'psycho'
      timer: GAME_LENGTH * FPS,
      aimHelper: false,
      target: 'inside', // 'outside' or 'inside'
      showLevels: false, // true or false
      faceRotation: 'mania', // 'time' or 'hitcycle' or 'mania'
      sfx: 'bubble', // 'space' or 'bubble'
      ownerPresent: false
    }
    // Merge the default options with the provided options
    const mergedOptions = { ...defaultOptions, ...options }
    // Assign the merged options to the instance properties
    Object.assign(this, mergedOptions)
  }

  // run whenever the class should be reset
  clearValues() {
    this.deadOpacity = '0.1'
    this.initialScoreSize = 60
    this.scoreSize = this.initialScoreSize
    this.opac = this.globalStyle == 'psycho' ? 1 : 0.1
    this.tailLength = 10
    this.tailMod = this.globalStyle == 'psycho' ? 2 : 1
    this.explosions = []
    this.missiles = []
    this.missileInits = []
    this.bodies = []
    this.witheringBodies = []
    this.bodyInits = []
    this.bodyFinal = []
    this.allCopiesOfBodies = []
    this.missileCount = 0
    this.frames = 0
    this.showIt = true
    this.justStopped = false
    this.gameOver = false
    this.firstFrame = true
    this.loaded = false
    this.showPlayAgain = false
    this.handledGameOver = false
    this.statsText = ''
    this.hasStarted = false
    this.buttons = {}
    this.won = false
    this.finalBatchSent = false
    this.solved = false
  }

  // run once at initilization
  init() {
    if (this.seed == undefined) {
      this.seed = BigInt(Math.floor(Math.random() * 10000))
    }
    _validateSeed(this.seed)
    this.rng = new Prando(this.seed.toString(16))
    this.generateBodies()
    this.frames = this.alreadyRun
    this.startingFrame = this.alreadyRun
    // const vectorLimitScaled = this.convertFloatToScaledBigInt(this.vectorLimit)
    this.loadImages()
    this.setPause(this.paused, true)
    this.storeInits()
    // this.prepareWitness()
  }

  // async prepareWitness() {
  //   // const wasmFile = `/public/game_10_1.wasm`
  //   const wasmFile = new URL('./game_10_1.wasm', import.meta.url).href
  //   console.log({ wasmFile })
  //   const response = await fetch(wasmFile)
  //   console.log({ response })
  //   const buffer = await response.arrayBuffer()
  //   console.log({ buffer })
  //   // let wasm = await fetch(new URL('./game_10_1.wasm', import.meta.url).href)
  //   // console.log({ wasm })
  //   this.witnessCalculator = await wc(buffer)
  //   console.log({ witnessCalculator: this.witnessCalculator })
  //   // const w = await witnessCalculator.calculateWitness(input, 0);
  //   // for (let i = 0; i < w.length; i++) {
  //   //   console.log(w[i]);
  //   // }
  //   // const buff = await witnessCalculator.calculateWTNSBin(input, 0)
  //   // writeFile(process.argv[4], buff, function (err) {
  //   //   if (err) throw err
  //   // })
  // }

  async start() {
    this.addListeners()
    this.runSteps(this.preRun)
    // this.paintAtOnce(this.paintSteps)
    if (this.freeze) {
      this.setPause(true, true)
    }
  }

  destroy() {
    this.setPause(true)
    this.p.noLoop()
    this.removeListener()
    this.sound.stop()
    this.sound = null
    this.p.remove()
  }

  storeInits() {
    // console.dir(
    //   {
    //     frames: this.frames,
    //     bodies: this.bodies.map((b) => (b.position.x, b.position.y))
    //   },
    //   { depth: null }
    // )
    this.bodyCopies = JSON.parse(JSON.stringify(this.bodies))
    this.bodyInits = this.processInits(this.bodies)
    // console.dir({ bodyInits: this.bodyInits }, { depth: null })
  }

  processInits(bodies) {
    return this.convertBodiesToBigInts(bodies).map((b) => {
      b = this.convertScaledBigIntBodyToArray(b)
      b[2] = BigInt(b[2]).toString()
      b[3] = BigInt(b[3]).toString()
      return b
    })
  }

  runSteps(n = this.preRun) {
    let runIndex = 0
    let keepSimulating = true
    this.showIt = false
    while (keepSimulating) {
      runIndex++
      if (runIndex > n) {
        keepSimulating = false
        this.showIt = true
        // n > 0 && console.log(`${n.toLocaleString()} runs`)
      } else {
        const results = this.step(this.bodies, this.missiles)
        this.frames++
        this.bodies = results.bodies
        this.missiles = results.missiles || []
      }
    }
  }

  addListeners() {
    const { canvas } = this.p

    // binding dummy handlers is necessary for p5 to listen to touchmove
    // and track mouseX and mouseY
    this.p.touchStarted = () => {}
    this.p.mouseMoved = this.handleMouseMove
    this.p.touchMoved = this.handleMouseMove
    this.p.mousePressed = this.handleMousePressed
    this.p.mouseReleased = this.handleMouseReleased
    this.p.touchEnded = () => {}

    if (typeof window !== 'undefined' && this.mode == 'game') {
      canvas.removeEventListener('click', this.handleNFTClick)
      canvas.addEventListener('click', this.handleGameClick)
      canvas.addEventListener('touchend', this.handleGameClick)
      window.addEventListener('keydown', this.handleGameKeyDown)
    } else {
      canvas.removeEventListener('click', this.handleGameClick)
      window?.removeEventListener('keydown', this.handleGameKeyDown)
      canvas.addEventListener('click', this.handleGameClick)
    }
  }

  removeListener() {
    const { canvas } = this.p
    canvas?.removeEventListener('click', this.handleNFTClick)
    canvas?.removeEventListener('click', this.handleGameClick)
    canvas?.removeEventListener('touchend', this.handleGameClick)
    window?.removeEventListener('keydown', this.handleGameKeyDown)
    window?.removeEventListener('keydown', this.sound.handleKeyDown)
  }

  getXY(e) {
    // e may be a touch event or a click event
    let x = e.offsetX || e.pageX
    let y = e.offsetY || e.pageY
    const rect = e.target.getBoundingClientRect()
    const actualWidth = rect.width
    x = (x * this.windowWidth) / actualWidth
    y = (y * this.windowWidth) / actualWidth

    return { x, y }
  }

  handleMouseMove = (e) => {
    const { x, y } = this.getXY(e)
    // check if mouse is inside any of the buttons
    for (const key in this.buttons) {
      const button = this.buttons[key]
      button.hover = intersectsButton(button, x, y)
    }
  }

  handleMousePressed = (e) => {
    const { x, y } = this.getXY(e)
    for (const key in this.buttons) {
      const button = this.buttons[key]
      button.active = intersectsButton(button, x, y)
    }
  }

  handleMouseReleased = () => {
    for (const key in this.buttons) {
      const button = this.buttons[key]
      if (button.active) button.active = false
    }
  }

  handleGameClick = (e) => {
    const { x, y } = this.getXY(e)
    // if mouse is inside of a button, call the button's handler
    for (const key in this.buttons) {
      const button = this.buttons[key]
      if (intersectsButton(button, x, y)) {
        button.onClick()
        return
      }
    }

    this.missileClick(x, y)
  }

  handleNFTClick = () => {
    this.setPause()
  }

  handleGameKeyDown = (e) => {
    if (e.code == 'Space') {
      e.preventDefault()
      this.setPause()
    }
    if (
      e.code === 'KeyR' &&
      !e.shiftKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      // confirm('Are you sure you want to restart?') && this.restart()
      this.restart()
    }
  }

  handleGameOver = ({ won }) => {
    if (this.handledGameOver) return
    this.handledGameOver = true

    this.witherAllBodies()
    this.sound?.playGameOver({ won })
    this.gameOver = true
    this.won = won
    var dust = 0
    var timeTook = 0
    var framesTook = 0
    if (this.won) {
      const stats = this.calculateStats()
      dust = stats.dust
      timeTook = stats.timeTook
      framesTook = stats.framesTook
      void this.setStatsText(stats)
    } else {
      void this.setShowPlayAgain()
    }
    this.emit('gameOver', {
      won,
      ticks: this.frames - this.startingFrame,
      dust,
      timeTook,
      framesTook
    })
  }

  restart = (options, beginPaused = true) => {
    if (options) {
      this.setOptions(options)
    }
    this.clearValues()
    this.sound?.stop()
    this.sound?.playStart()
    this.init()
    this.draw()
    if (!beginPaused) {
      this.setPause(false)
    }
  }

  doubleTextInverted(text) {
    return text.slice(0, -1) + text.split('').reverse().join('')
  }

  setStatsText = async (stats) => {
    const statLines = [
      // `total bodies: ${stats.bodiesIncluded}`,
      this.doubleTextInverted(`¸♩·¯·♬¸¸♬·¯·♩¸¸♪¯`),
      `${stats.bodiesIncluded} bodies cleared`,
      `in ${stats.timeTook} sec 🐎`,
      `👈👈 Save Your Game👈👈`
    ]
    const toShow = statLines.join('\n')

    for (let i = 0; i < toShow.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      this.statsText = toShow.slice(0, i + 1)
      this.sound?.playStat()
      // play a sound on new line
      if (toShow[i] == '\n') {
        await new Promise((resolve) => setTimeout(resolve, 800))
        this.sound?.playStat()
      }
    }

    await this.setShowPlayAgain(1000)
    this.sound?.playSuccess()
  }

  setShowPlayAgain = async (timeout = 2000) => {
    if (this.ownerPresent) return // retry button in vue frontend
    await new Promise((resolve) => setTimeout(resolve, timeout))
    this.showPlayAgain = true
  }

  setPause(newPauseState = !this.paused, mute = false) {
    if (typeof newPauseState !== 'boolean') {
      newPauseState = !this.paused
    }
    this.paused = newPauseState
    this.justPaused = true
    this.emit('paused', this.paused)
    if (newPauseState) {
      this.p?.noLoop()
      if (!mute) this.sound?.pause()
    } else {
      this.p?.loop()
      if (!mute) this.sound?.resume()
    }
  }

  step() {
    // const { bodies, missiles } = await this.circomStep(
    //   this.bodies,
    //   this.missiles
    // )
    // this.bodies = bodies
    // this.missiles = missiles || []
    this.bodies = this.forceAccumulator(this.bodies)
    var results = this.detectCollision(this.bodies, this.missiles)
    this.bodies = results.bodies
    this.missiles = results.missiles || []

    if (this.missiles.length > 0 && this.missiles[0].radius == 0) {
      this.missiles.splice(0, 1)
    }
    return { bodies: this.bodies, missiles: this.missiles }
  }

  started() {
    this.emit('started', {
      bodyInits: JSON.parse(JSON.stringify(this.bodyInits))
    })
  }

  processMissileInits(missiles) {
    const radius = 10
    return missiles.map((b) => {
      const maxVectorScaled = this.convertFloatToScaledBigInt(this.vectorLimit)
      return {
        step: b.step,
        x: this.convertFloatToScaledBigInt(b.position.x).toString(),
        y: this.convertFloatToScaledBigInt(b.position.y).toString(),
        vx: (
          this.convertFloatToScaledBigInt(b.velocity.x) + maxVectorScaled
        ).toString(),
        vy: (
          this.convertFloatToScaledBigInt(b.velocity.y) + maxVectorScaled
        ).toString(),
        radius: radius.toString()
      }
    })
  }

  finish() {
    if (this.finalBatchSent) return
    let results = {}
    // this.finished = true
    // this.setPause(true)
    this.calculateBodyFinal()
    const missileInits = []
    if (this.mode == 'game') {
      let missileIndex = 0
      for (let i = this.alreadyRun; i < this.alreadyRun + this.stopEvery; i++) {
        if (this.missileInits[missileIndex]?.step == i) {
          const missile = this.missileInits[missileIndex]
          missileInits.push([
            missile.x,
            missile.y,
            missile.vx,
            missile.vy,
            missile.radius
          ])
          missileIndex++
        } else {
          missileInits.push([0, 0, 0, 0, 0])
        }
      }
      missileInits.push([0, 0, 0, 0, 0])
    }
    results = {
      missiles: JSON.parse(JSON.stringify(missileInits)),
      bodyInits: JSON.parse(JSON.stringify(this.bodyInits)),
      bodyFinal: JSON.parse(JSON.stringify(this.bodyFinal))
    }
    this.emit('finished', results)
    this.bodyInits = JSON.parse(JSON.stringify(this.bodyFinal))
    this.alreadyRun = this.frames
    this.missileInits = this.processMissileInits(this.missiles).map((m) => {
      m.step = this.frames
      return m
    })
    this.bodyFinal = []
    // this.setPause(false)
    if (
      this.mode == 'game' &&
      this.bodies.reduce((a, c) => a + c.radius, 0) == 0
    ) {
      this.finalBatchSent = true
      this.storeStarPositions()
    }
    return results
  }

  storeStarPositions() {
    this.starPositions ||= []
    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i]
      if (body.starLvl == body.maxStarLvl) {
        this.starPositions.push(
          JSON.parse(
            JSON.stringify(
              body,
              (key, value) =>
                typeof value === 'bigint' ? value.toString() : value // return everything else unchanged
            )
          )
        )
      }
    }
  }

  generateBodies() {
    if (this.inputData) {
      // console.dir({ inputData: this.inputData }, { depth: null })
      const step1 = this.inputData.map(
        this.convertScaledStringArrayToBody.bind(this)
      )
      // console.dir({ step1 }, { depth: null })
      this.bodies = this.convertBigIntsToBodies(step1)
      // console.dir({ bodies: this.bodies })
      this.radiusMultiplyer = this.random(10, 200)
      for (let i = 0; i < this.startingBodies; i++) {
        this.bodies[i].c =
          `hsla(${this.random(0, 360)}, 100%, 100%, ${this.opac})`
        // this.bodies[i].c = this.colorArrayToTxt(this.randomColor(200, 250)
        this.bodies[i].bodyIndex = i
      }
      return
    }
    if (this.starData) {
      this.starPositions = this.starData.map(this.bodyDataToBodies.bind(this))
    }
    if (this.bodyData) {
      this.radiusMultiplyer = 100 //this.random(10, 200)
      this.bodies = this.bodyData.map(this.bodyDataToBodies.bind(this))
      this.startingBodies = this.bodies.length
      return
    }
    const ss = []
    const cs = []
    const bodies = []

    this.radiusMultiplyer = 100 //this.random(10, 50)

    const startingRadius = 2 //this.random(20, 40)

    // const baseColor = this.randomColor(0, 200)

    // const range = 100
    // const midRange = range / 2
    // const start = 0 - midRange
    // const totalChunks = this.startingBodies
    // const chunk = range / totalChunks

    for (let i = 0; i < this.startingBodies; i++) {
      // cs.push(`hsla(${this.random(0, 360)}, 100%, 50%, ${this.opac})`)

      cs.push(this.colorArrayToTxt(this.randomColor()))
    }

    for (let i = 0; i < this.startingBodies; i++) {
      let s = this.randomPosition()
      ss.push(s)
    }
    if (this.startingBodies.length > 10) {
      throw new Error('too many bodies')
    }
    let maxSize = this.startingBodies < 10 ? 10 : this.startingBodies
    for (let i = 0; i < maxSize; i++) {
      if (i >= this.startingBodies) break

      // const j = i
      // const j = this.random(0, 2)
      const j = Math.floor(this.random(1, 3))
      const radius = j * 5 + startingRadius
      const maxStarLvl = this.random(3, 10, new Prando())
      const starLvl = this.random(0, maxStarLvl - 1, new Prando())

      const vectorMax =
        (i == 0 ? this.vectorLimit / 3 : this.vectorLimit) *
        Number(this.scalingFactor)
      const vx = this.random(-vectorMax, vectorMax) / Number(this.scalingFactor)
      const vy = this.random(-vectorMax, vectorMax) / Number(this.scalingFactor)
      const body = {
        bodyIndex: i,
        position: this.createVector(ss[i][0], ss[i][1]),
        velocity: this.createVector(vx, vy),
        radius,
        starLvl,
        maxStarLvl,
        c: cs[i]
      }
      bodies.push(body)
    }

    this.bodies = bodies
    // .sort((a, b) => b.radius - a.radius)
  }

  getFaceIdx(seed) {
    const face = this.random(0, 1000, new Prando(seed))
    const faceDistribution = [200, 400, 600, 700, 800, 850, 900, 950, 980, 1000]
    let faceIndex = 0
    for (let i = 0; i < faceDistribution.length; i++) {
      if (face < faceDistribution[i]) {
        faceIndex = i
        break
      }
    }
    return faceIndex
  }

  bodyDataToBodies(b) {
    const bodyId = b.bodyId.toNumber()
    const bodyIndex = b.bodyIndex.toNumber()
    const px = b.px.toNumber() / parseInt(this.scalingFactor)
    const py = b.py.toNumber() / parseInt(this.scalingFactor)
    const vx =
      (b.vx.toNumber() - this.vectorLimit * parseInt(this.scalingFactor)) /
      parseInt(this.scalingFactor)
    const vy =
      (b.vy.toNumber() - this.vectorLimit * parseInt(this.scalingFactor)) /
      parseInt(this.scalingFactor)
    const radius = b.radius.toNumber() / parseInt(this.scalingFactor)
    const faceIndex = this.getFaceIdx(b.seed)
    return {
      seed: b.seed,
      faceIndex,
      bodyId: bodyId,
      bodyIndex: bodyIndex,
      position: this.createVector(px, py),
      velocity: this.createVector(vx, vy),
      radius: radius,
      starLvl: b.starLvl?.toNumber(),
      maxStarLvl: b.maxStarLvl?.toNumber(),
      mintedBodyIndex: b.mintedBodyIndex.toNumber(),
      c: this.getBodyColor(b.seed)
    }
  }

  getBodyColor(seed, replaceOpacity = false) {
    if (typeof seed !== 'string') {
      seed = seed.toString(16)
    }
    const blocker = 0xffff
    const color = (BigInt(seed) & BigInt(blocker)) % 360n
    const saturation = ((BigInt(seed) >> 16n) & BigInt(blocker)) % 100n
    const lightness = (((BigInt(seed) >> 32n) & BigInt(blocker)) % 40n) + 40n
    const result = `hsla(${color.toString()}, ${saturation.toString()}%, ${lightness.toString()}%,${replaceOpacity ? '1' : this.opac})`
    return result
  }

  random(min, max, rng = this.rng) {
    return rng.nextInt(min, max)
    // return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }

  randomColor(min = 0, max = 359, rng = this.rng) {
    const color = []

    // let c = Math.floor(this.random(min, max, rng))
    let c = this.random(min, max, rng)
    color.push(c) // Hue
    color.push(this.random(0, 100, rng) + '%') // Saturation
    color.push(this.random(40, 80, rng) + '%') // Lightness
    return color
  }
  randomPosition() {
    const radiusDist = this.random(
      _smolr(this.windowWidth, this.windowHeight) * 0.37,
      _smolr(this.windowWidth, this.windowHeight) * 0.47
    )
    const randomDir = this.random(0, 360)
    const x = radiusDist * Math.cos(randomDir) + this.windowWidth / 2
    const y = radiusDist * Math.sin(randomDir) + this.windowWidth / 2
    return [x, y]
  }

  prepareP5() {
    this.p.frameRate(FPS)
    this.p.createCanvas(this.windowWidth, this.windowWidth)
    this.p.background('white')
  }

  missileClick(x, y) {
    if (this.paused) {
      this.setPause(false)
      return
    }
    if (
      this.bodies.reduce((a, c) => a + c.radius, 0) == 0 ||
      this.frames - this.startingFrame >= this.timer
    ) {
      return
    }
    if (this.missiles.length > 0 && !this.admin) {
      // this is a hack to prevent multiple missiles from being fired
      this.missiles = []
      // remove latest missile from missileInits
      this.missileInits.pop()
    }

    this.missileCount++
    const radius = 10

    const b = {
      step: this.frames,
      position: this.p.createVector(0, this.windowWidth),
      velocity: this.p.createVector(x, y - this.windowWidth),
      radius
    }
    b.velocity.limit(10)
    this.missiles.push(b)
    this.sound?.playMissile()
    this.missileInits.push(...this.processMissileInits([b]))
  }

  witherAllBodies() {
    for (const body of this.bodies) {
      if (body.starLvl !== body.maxStarLvl) continue
      // find the index in witheringBodies
      const index = this.witheringBodies.findIndex(
        (b) => b.bodyIndex == body.bodyIndex
      )
      // if it's there, update the position
      if (index >= 0) {
        this.witheringBodies[index].position = body.position
      } else {
        // if not, add it
        this.witheringBodies.push({ ...body })
      }
    }
  }

  calculateStats = () => {
    // n.b. this needs to match the contract in check_boost.cjs
    const BODY_BOOST = [
      0, // 0th body, just for easier indexing
      0, // 1st body
      0, // 2nd body
      1, // 3rd body
      2, // 4th body
      4, // 5th body
      8, // 6th body
      16, // 7th body
      32, // 8th body
      64, //9th body
      128 // 10th body
    ]

    const SPEED_BOOST = [
      1, // <10s left
      2, // <20s left
      3, // <30s left
      4, // <40s left
      5, // <50s left
      6 // < 60s left
    ]

    const bodiesIncluded = this.bodies.length
    const bodiesBoost = BODY_BOOST[bodiesIncluded]
    const { startingFrame, timer, frames } = this
    const secondsLeft = (startingFrame + timer - frames) / FPS
    const framesTook = frames - startingFrame
    const timeTook = framesTook / FPS
    const speedBoostIndex = Math.floor(secondsLeft / 10)
    const speedBoost = SPEED_BOOST[speedBoostIndex]
    let dust = /*bodiesIncluded **/ bodiesBoost * speedBoost

    return {
      bodiesIncluded,
      bodiesBoost,
      speedBoost,
      dust,
      timeTook,
      framesTook
    }
  }
}

if (typeof window !== 'undefined') {
  window.Anybody = Anybody
}

function _smolr(a, b) {
  return a < b ? a : b
}
