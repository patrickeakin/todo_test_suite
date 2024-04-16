import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'
import { ToDoItem } from "../component-objects/ToDoItem"
import { Main } from '../component-objects/Main'
import { Footer } from '../component-objects/Footer'
import { createToDos } from '../utils/create-todos'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
})

const itemTitles = [ '1st item', '2nd item' ]

test.beforeEach(async({ page }) => {
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
        await expect(lastToDoText).toBe(itemTitles[1])
    })
})

test.describe('Mark all complete toggle', () => {
    test('marks all items as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        const main = new Main(page)
        await main.markAllCompleteToggle.click()
        await expect(toDoItem.item).toHaveClass(['completed', 'completed'])
    })
    
    test('unmarks all items as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        const main = new Main(page)
        await main.markAllCompleteToggle.click()
        await expect(toDoItem.item).toHaveClass(['completed', 'completed'])
    
        await main.markAllCompleteToggle.click()
        await expect(toDoItem.item).not.toHaveClass(['completed', 'completed'])
    })
})

test.describe('Mark item complete toggle', () => {
    test('marks an item as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.completeToggle.first().click()
        await expect(toDoItem.item.first()).toHaveClass('completed')
    })
    
    test('unarks an item as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.completeToggle.first().click()
        await expect(toDoItem.item.first()).toHaveClass('completed')
    
        await toDoItem.completeToggle.first().click()
        await expect(toDoItem.item.first()).not.toHaveClass('completed')
    })
})

test.describe('Editing todo items', () => {
    test('can edit item text', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.editToDoText(0, 'Edited', 'Enter')
        const firstItem = await toDoItem.nth(0)
        await expect(firstItem).toHaveText('Edited')
    })
    
    test('saves edits on blur', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.editToDoText(0, 'Edited', 'blur')
        const firstItem = await toDoItem.nth(0)
        await expect(firstItem).toHaveText('Edited')
    })
    
    test('trims leading and trailing spaces after saving', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.editToDoText(0, ' Trim spaces ', 'Enter')
        const firstItem = await toDoItem.nth(0)
        await expect(firstItem).toHaveText('Trim spaces')
    })
    
    test('cancels edits on escape', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.editToDoText(0, 'Edited', 'Escape')
        const firstItem = await toDoItem.nth(0)
        await expect(firstItem).toHaveText(itemTitles[0])
    })
    
    test('hides the complete item toggle when editing', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        const firstItem = await toDoItem.item.first()
        await expect(toDoItem.completeToggle.first()).toBeVisible()
        
        await firstItem.dblclick()
        await expect(toDoItem.completeToggle.first()).toBeHidden()
    })
})

test.describe('Todo item counter', () => {
    test('displays number of incomplete todos', async({ page }) => {
        const footer = new Footer(page)
        await expect(footer.counter).toHaveText('2 items left')
    })

    test('increments when new item is created', async({ page }) => {
        const footer = new Footer(page)
        await expect(footer.counter).toHaveText('2 items left')
    
        await createToDos(page, ['3rd item'])
        await expect(footer.counter).toHaveText('3 items left')
    })

    test('decrements when an item is completed', async({ page }) => {
        const footer = new Footer(page)
        const main = new Main(page)
        const toDoItem = new ToDoItem(page)
        await expect(footer.counter).toHaveText('2 items left')

        await toDoItem.completeToggle.first().click()
        await expect(footer.counter).toHaveText('1 item left')
    
        await main.markAllCompleteToggle.click()
        await expect(footer.counter).toHaveText('0 items left')
    })
})

test.describe('Clear completed button', () => {
    test('clears completed todos', async({ page }) => {
        const footer = new Footer(page)
        const main = new Main(page)
        const toDoItem = new ToDoItem(page)
        await main.markAllCompleteToggle.click()
        await footer.clearCompletedBtn.click()
        await expect(toDoItem.item).toBeHidden()
    })
})