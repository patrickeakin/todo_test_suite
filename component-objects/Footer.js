export class Footer {
    constructor(page) {
        this.page = page

        this.counter = page.getByTestId('todo-count')
    }
}