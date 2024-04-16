import { test, expect } from '@playwright/test'
import { ToDoItem } from "../component-objects/ToDoItem"
import { Main } from '../component-objects/Main'
import { Footer } from '../component-objects/Footer'
import { createToDos } from '../utils/create-todos'
import { itemTitles } from '../data/item-titles'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
    await createToDos(page, itemTitles)
})

test.describe('Clear completed button', () => {
    test('clears completed todos', async({ page }) => {
        const footer = new Footer(page)
        const main = new Main(page)
        const toDoItem = new ToDoItem(page)
        await main.markAllCompleteToggle.check()
        await footer.clearCompletedBtn.click()
        await expect(toDoItem.item).toBeHidden()
    })

    test('should be hidden when no items are completed', async ({ page }) => {
        const footer = new Footer(page)
        const main = new Main(page)
        await main.markAllCompleteToggle.check()
        await expect(footer.clearCompletedBtn).toBeVisible()

        await main.markAllCompleteToggle.uncheck()
        await expect(footer.clearCompletedBtn).toBeHidden()
    })
})