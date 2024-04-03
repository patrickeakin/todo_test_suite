import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'
import { ToDoItem } from "../component-objects/ToDoItem"

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
})

const itemTitles = [ '1st item', '2nd item' ]

test('Can create todo items', async({ page }) => {
    const textInput = new TextInput(page)
    await textInput.createToDoItem(itemTitles[0])
    await textInput.createToDoItem(itemTitles[1])

    const toDoItem = new ToDoItem(page)
    await expect(toDoItem.itemLabel).toHaveText(itemTitles)
})

test.only('Text field is clear after adding item', async({ page }) => {
    const textInput = new TextInput(page)
    await textInput.createToDoItem(itemTitles[0])
    await expect(textInput.input).toBeEmpty()
})