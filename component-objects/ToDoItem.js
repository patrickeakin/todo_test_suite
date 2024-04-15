export class ToDoItem {
    constructor(page) {
        this.page = page

        this.item = page.getByTestId('todo-item')
        this.itemLabel = page.getByTestId('todo-title')
        this.completeToggle = page.getByLabel('Toggle Todo')
    }
}
