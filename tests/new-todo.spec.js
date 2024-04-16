import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'
import { ToDoItem } from "../component-objects/ToDoItem"
import { createToDos } from '../utils/create-todos'
import { itemTitles } from '../data/item-titles'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
    await createToDos(page, itemTitles)
})

test.describe('New todo items', () => {
    test('can be created', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await expect(toDoItem.itemLabel).toHaveText(itemTitles)
    })
    
    test('input field is clear after adding item', async({ page }) => {
        const textInput = new TextInput(page)
        await expect(textInput.input).toBeEmpty()
    })
    
    test('go to the bottom of the list', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        const lastToDoText = await toDoItem.item.last().innerText()
        expect(lastToDoText).toBe(itemTitles[1])
    })
})