import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'
import { ToDoItem } from "../component-objects/ToDoItem"

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
})

const itemTitles = [ '1st item', '2nd item' ]

const createToDos = async (page) => {
    const textInput = new TextInput(page)
    await textInput.createToDoItem(itemTitles[0])
    await textInput.createToDoItem(itemTitles[1])
    return textInput
}

test('Can create todo items', async({ page }) => {
    await createToDos(page)
    const toDoItem = new ToDoItem(page)
    await expect(toDoItem.itemLabel).toHaveText(itemTitles)
})

test('Text field is clear after adding item', async({ page }) => {
    const textInput = await createToDos(page)
    await expect(textInput.input).toBeEmpty()
})

test('New items go to the bottom of the list', async({ page }) => {
    await createToDos(page)
    const lastToDoText = await page.getByTestId('todo-title').last().innerText()
    await expect(lastToDoText).toBe(itemTitles[1])
})
