class ProgressBarPage {
    async open() {
        await browser.url('https://demoqa.com')
        await browser.maximizeWindow()
    }

    async goToWidgets() {
        await browser.execute(() => window.scrollTo(0, 600))

        const widgetsCard = await $('(//h5[text()="Widgets"]/ancestor::div[contains(@class, "card")])[2]')
        await widgetsCard.waitForDisplayed()
        await widgetsCard.click()
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/widgets'),
            { timeout: 5000 }
        )
    }

    async goToProgressBar() {
        const progressBarMenu = await $('//span[text()="Progress Bar"]')
        await progressBarMenu.waitForClickable({ timeout: 5000 })
        await progressBarMenu.click()
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/progress-bar'),
            { timeout: 5000 }
        )
    }

    async startProgressBar() {
        const startBtn = await $('#startStopButton')
        await startBtn.waitForDisplayed({ timeout: 5000 })
        await startBtn.click()
    }

    async waitForResetButton() {
        const resetBtn = await $('#resetButton')
        await resetBtn.waitForDisplayed({ timeout: 12000 })
        return resetBtn
    }

    async isResetVisibleAfterRefresh() {
        await browser.refresh()
        await browser.pause(1000)
        try {
            const resetBtn = await $('#resetButton')
            return await resetBtn.isDisplayed()
        } catch {
            return false
        }
    }
}

describe('Task 2 - Progress Bar behavior with Reset button using JS Executor and Waits', () => {
    const progressBarPage = new ProgressBarPage()

    it('should verify Reset button appears and disappears correctly', async () => {
        await progressBarPage.open()
        await progressBarPage.goToWidgets()
        await progressBarPage.goToProgressBar()
        await progressBarPage.startProgressBar()

        const reset = await progressBarPage.waitForResetButton()
        await expect(reset).toBeDisplayed()

        const visibleAfterRefresh = await progressBarPage.isResetVisibleAfterRefresh()
        await expect(visibleAfterRefresh).toBe(false)
    })
})
