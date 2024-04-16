export class ToDoItem {
    constructor(page) {
        this.page = page

        this.item = page.getByTestId('todo-item')
        this.itemLabel = page.getByTestId('todo-title')
        this.completeToggle = page.getByLabel('Toggle Todo')
        this.textBox = page.getByRole('textbox')
    }

    editToDoText = async (index, text, action) => {
        const item = await this.item.nth(index)
        await item.dblclick()
        await item.getByRole('textbox').fill(text)

        action === 'blur' 
        ? await item.getByRole('textbox').blur()
        : await item.getByRole('textbox').press(action)
    }
    
    nth = async (index) => await this.item.nth(index)
}
