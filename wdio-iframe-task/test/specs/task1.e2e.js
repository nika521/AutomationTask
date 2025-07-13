const { expect } = require('chai')
const FramesPage = require('../../pages/FramesPage')

describe('Task 1 - Iframes and Navigation', () => {
    it('should verify middle and left frame texts and back navigation', async () => {
        await FramesPage.open()
        await FramesPage.goToNestedFrames()

        await browser.pause(1000)

        const middleText = await FramesPage.getMiddleText()
        expect(middleText).to.equal('MIDDLE')


        const leftText = await FramesPage.getLeftText()
        expect(leftText).to.equal('LEFT')


        await browser.back()

        const isVisible = await FramesPage.isNestedFramesLinkVisible()
        expect(isVisible).to.be.true

        await browser.pause(3000)
    })
})
