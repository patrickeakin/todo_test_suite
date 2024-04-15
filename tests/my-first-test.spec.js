import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'
import { ToDoItem } from "../component-objects/ToDoItem"
import { Main } from '../component-objects/Main'
import { createToDos } from '../utils/create-todos'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
})

const itemTitles = [ '1st item', '2nd item' ]

test.beforeEach(async({ page }) => {
    await createToDos(page, itemTitles)
})

test('Can create todo items', async({ page }) => {
    const toDoItem = new ToDoItem(page)
    await expect(toDoItem.itemLabel).toHaveText(itemTitles)
})

test('Text field is clear after adding item', async({ page }) => {
    const textInput = new TextInput(page)
    await expect(textInput.input).toBeEmpty()
})

test('New items go to the bottom of the list', async({ page }) => {
    const lastToDoText = await page.getByTestId('todo-title').last().innerText()
    await expect(lastToDoText).toBe(itemTitles[1])
})

test('Mark all items as complete', async({ page }) => {
    const toDoItem = new ToDoItem(page)
    const main = new Main(page)
    await main.markAllCompleteToggle.click()
    await expect(toDoItem.item).toHaveClass(['completed', 'completed'])
})

test('Unmark all as complete', async({ page }) => {
    const toDoItem = new ToDoItem(page)
    const main = new Main(page)
    await main.markAllCompleteToggle.click()
    await expect(toDoItem.item).toHaveClass(['completed', 'completed'])

    await main.markAllCompleteToggle.click()
    await expect(toDoItem.item).not.toHaveClass(['completed', 'completed'])
})

test('Mark item as complete', async({ page }) => {
    const toDoItem = new ToDoItem(page)
    await toDoItem.completeToggle.first().click()
    await expect(toDoItem.item.first()).toHaveClass('completed')
})

test('Unark item as complete', async({ page }) => {
    const toDoItem = new ToDoItem(page)
    await toDoItem.completeToggle.first().click()
    await expect(toDoItem.item.first()).toHaveClass('completed')

    await toDoItem.completeToggle.first().click()
    await expect(toDoItem.item.first()).not.toHaveClass('completed')
})

test('Edit item text', async({ page }) => {
    const toDoItem = new ToDoItem(page)
    const firstItem = await toDoItem.item.first()
    await expect(firstItem).toHaveText(itemTitles[0])

    await firstItem.dblclick()
    await firstItem.getByRole('textbox').fill('Edited')
    await firstItem.getByRole('textbox').press('Enter')
    await expect(firstItem).toHaveText('Edited')
})

test('Hide complete toggle when editing', async({ page }) => {
    const toDoItem = new ToDoItem(page)
    const firstItem = await toDoItem.item.first()
    await expect(toDoItem.completeToggle.first()).toBeVisible()
    
    await firstItem.dblclick()
    await expect(toDoItem.completeToggle.first()).toBeHidden()
})