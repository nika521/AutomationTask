class FramesPage {
    get framesLink() {
        return $('=Frames')
    }

    get nestedFramesLink() {
        return $('=Nested Frames')
    }

    async open() {
        await browser.url('https://the-internet.herokuapp.com')
    }

    async goToNestedFrames() {
        await this.framesLink.waitForDisplayed()
        await this.framesLink.click()
        await this.nestedFramesLink.waitForDisplayed()
        await this.nestedFramesLink.click()
    }

    async getMiddleText() {
        const frameTop = await $('frame[name="frame-top"]')
        await browser.switchFrame(frameTop)

        const frameMiddle = await $('frame[name="frame-middle"]')
        await browser.switchFrame(frameMiddle)

        const middleText = await $('#content').getText()

        await browser.switchFrame(null)
        return middleText
    }

    async getLeftText() {
        const frameTop = await $('frame[name="frame-top"]')
        await browser.switchFrame(frameTop)

        const frameLeft = await $('frame[name="frame-left"]')
        await browser.switchFrame(frameLeft)

        const leftText = await $('body').getText()

        await browser.switchFrame(null)
        return leftText
    }

    async isNestedFramesLinkVisible() {
        const link = await $('=Nested Frames')
        return link.isDisplayed()
    }
}

module.exports = new FramesPage()
