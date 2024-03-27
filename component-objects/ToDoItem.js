export class ToDoItem {
    constructor(page) {
        this.page = page

        this.itemLabel = page.getByTestId('todo-title')
    }
}
