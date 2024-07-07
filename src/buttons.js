import { fonts } from './fonts.js'

export const Buttons = {
  drawButton({
    text,
    x,
    y,
    textSize = 48,
    height,
    width,
    onClick,
    fg = 'black',
    bg = 'white',
    fgHover = 'rgba(160, 67, 232, 0.3)'
  }) {
    const { p } = this

    // register the button if it's not registered
    const key = `${text}-${x}-${y}-${height}-${width}`
    let button = this.buttons[key]
    if (!button) {
      this.buttons[key] = { x, y, height, width, onClick: onClick.bind(this) }
      button = this.buttons[key]
    }
    button.visible = true
    const justEntered = button.lastVisibleFrame !== this.p5Frames - 1
    if (justEntered) {
      button.visibleForFrames = 0
    }
    button.visibleForFrames++
    button.lastVisibleFrame = this.p5Frames

    const entranceTime = 0.4 // seconds

    // animate in button when it is visible
    const scale = Math.min(
      1,
      button.visibleForFrames / (entranceTime * this.P5_FPS)
    )
    const scaledWidth = width * scale
    const scaledHeight = height * scale

    p.push()
    p.noStroke()
    p.textSize(textSize * scale)
    p.strokeWeight(button.active ? 1 : 4)
    p.fill(bg)

    p.rect(
      x + width / 2 - scaledWidth / 2,
      y + height / 2 - scaledHeight / 2,
      scaledWidth,
      scaledHeight,
      height / 2
    )
    if (button.hover) {
      p.fill(fgHover)
      p.rect(x, y, width, height, height / 2)
    }

    if (scale >= 0.3 && fonts.dot) {
      p.textFont(fonts.dot)
      p.fill(fg)
      p.textAlign(p.CENTER, p.CENTER)
      p.text(
        text,
        // tweak to center, somethign about the font
        x + width / 2 + textSize * 0.13,
        y + height / 2 + textSize * 0.05
      )
    }
    p.pop()
  },

  // single button with a fat appearance (retry, start)
  drawFatButton(buttonOptions) {
    const { bottom } = buttonOptions
    const bottomPadding = bottom || 80
    this.drawButton({
      height: 96,
      textSize: 48,
      width: 275,
      y: this.windowHeight - 96 - bottomPadding,
      x: this.windowWidth / 2 - 275 / 2,
      ...buttonOptions
    })
  },

  // buttons that are drawn at the bottom of the screen (win screen)
  drawBottomButton(buttonOptions) {
    const { columns, column } = buttonOptions
    const gutter = 24
    const interButtonGutter = 6
    const frameWidth = this.windowWidth - 2 * gutter
    const width = (frameWidth - (columns - 1) * interButtonGutter) / columns
    this.drawButton({
      height: 84,
      textSize: 44,
      width,
      y: this.windowHeight - gutter - 84,
      x: gutter + column * (width + interButtonGutter),
      ...buttonOptions
    })
  }
}
