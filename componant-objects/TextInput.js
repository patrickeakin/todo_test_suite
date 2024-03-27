export class TextInput {
    constructor(page) {
        this.page = page

        this.input = page.locator('[data-testid="text-input"]')
    }

    createToDoItem = async (toDoTitle) => {
        await this.input.fill(toDoTitle)
        await this.input.press('Enter')
    }
}