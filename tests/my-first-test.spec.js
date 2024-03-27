import { test, expect } from '@playwright/test'
import { TextInput } from '../componant-objects/TextInput'
import { ToDoItem } from '../componant-objects/ToDoItem'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/examples/react/dist')
})

test.only('Can create todo item', async({ page }) => {
    const textInput = new TextInput(page)
    const toDoItem = new ToDoItem(page)
    
    await textInput.createToDoItem('my first todo')
    await expect(toDoItem.itemLabel).toBeVisible()
    await page.pause()
})