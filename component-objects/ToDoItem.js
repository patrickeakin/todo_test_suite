export class ToDoItem {
    constructor(page) {
        this.page = page

        this.itemLabel = page.locator('[data-testid="todo-item-label"]')
    }
}