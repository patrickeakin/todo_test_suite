import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'
import { ToDoItem } from "../component-objects/ToDoItem"

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
})

test.only('Can create todo items', async({ page }) => {
    const itemTitles = [ '1st item', '2nd item' ]
    const textInput = new TextInput(page)
    await textInput.createToDoItem(itemTitles[0])
    await textInput.createToDoItem(itemTitles[1])

    const toDoItem = new ToDoItem(page)
    await expect(toDoItem.itemLabel).toHaveText(itemTitles)
})