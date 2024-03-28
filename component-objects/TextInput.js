export class TextInput {
    constructor(page) {
        this.page = page

        this.input = page.getByPlaceholder('What needs to be done?')
    }

    createToDoItem = async (toDoTitle) => {
        await this.input.fill(toDoTitle)
        await this.input.press('Enter')
    }
}