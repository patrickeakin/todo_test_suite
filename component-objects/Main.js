export class Main {
    constructor(page) {
        this.page = page

        this.markAllCompleteToggle = page.getByText('Mark all as complete')
    }

}