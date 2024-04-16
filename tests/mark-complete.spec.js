import { test, expect } from '@playwright/test'
import { ToDoItem } from "../component-objects/ToDoItem"
import { Main } from '../component-objects/Main'
import { createToDos } from '../utils/create-todos'
import { itemTitles } from '../data/item-titles'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
    await createToDos(page, itemTitles)
})

test.describe('Mark all complete toggle', () => {
    test('marks all items as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        const main = new Main(page)
        await main.markAllCompleteToggle.check()
        await expect(toDoItem.item).toHaveClass(['completed', 'completed'])
    })
    
    test('unmarks all items as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        const main = new Main(page)
        await main.markAllCompleteToggle.check()
        await expect(toDoItem.item).toHaveClass(['completed', 'completed'])
    
        await main.markAllCompleteToggle.uncheck()
        await expect(toDoItem.item).not.toHaveClass(['completed', 'completed'])
    })

    test('updates state when items are toggled complete / active', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        const main = new Main(page)
        await main.markAllCompleteToggle.check()
        await expect(main.markAllCompleteToggle).toBeChecked()

        await toDoItem.completeToggle.first().uncheck()
        await expect(main.markAllCompleteToggle).not.toBeChecked()

        await toDoItem.completeToggle.first().check()
        await expect(main.markAllCompleteToggle).toBeChecked()
    })
})

test.describe('Mark item complete toggle', () => {
    test('marks an item as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.completeToggle.first().check()
        await expect(toDoItem.item.first()).toHaveClass('completed')
    })
    
    test('unarks an item as complete', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await toDoItem.completeToggle.first().check()
        await expect(toDoItem.item.first()).toHaveClass('completed')
    
        await toDoItem.completeToggle.first().uncheck()
        await expect(toDoItem.item.first()).not.toHaveClass('completed')
    })
})