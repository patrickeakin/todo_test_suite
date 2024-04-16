export class Footer {
    constructor(page) {
        this.page = page

        this.counter = page.getByTestId('todo-count')
        this.clearCompletedBtn = page.getByRole('button', { name: 'Clear completed' })
        this.allFilter = page.getByRole('link', { name: 'All' })
        this.activeFilter = page.getByRole('link', { name: 'Active' })
        this.completedFilter = page.getByRole('link', { name: 'Completed' })
    }
}