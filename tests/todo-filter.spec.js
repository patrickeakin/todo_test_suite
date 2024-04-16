import { test, expect } from '@playwright/test'
import { ToDoItem } from "../component-objects/ToDoItem"
import { Footer } from '../component-objects/Footer'
import { createToDos } from '../utils/create-todos'
import { itemTitles } from '../data/item-titles'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
    await createToDos(page, itemTitles)
})

test.describe('Filter controls', () => {
    test('allow displaying only active items', async ({ page }) => {
        const toDoItem = new ToDoItem(page)
        const footer = new Footer(page)
        await toDoItem.completeToggle.first().check()
        await footer.activeFilter.click()
        await expect(toDoItem.item).toHaveCount(1)
        await expect(toDoItem.item).toHaveText(itemTitles[1])
    })

    test('allow displaying only completed items', async ({ page }) => {
        const toDoItem = new ToDoItem(page)
        const footer = new Footer(page)
        await toDoItem.completeToggle.first().check()
        await footer.completedFilter.click()
        await expect(toDoItem.item).toHaveCount(1)
        await expect(toDoItem.item).toHaveText(itemTitles[0])
    })

    test('allow displaying all items', async ({ page }) => {
        const toDoItem = new ToDoItem(page)
        const footer = new Footer(page)
        await toDoItem.completeToggle.first().check()
        await footer.completedFilter.click()
        await footer.allFilter.click()
        await expect(toDoItem.item).toHaveCount(2)
        await expect(toDoItem.item).toHaveText(itemTitles)
    })

    test('highlight the applied filter', async ({ page }) => {
        const footer = new Footer(page)
        await footer.activeFilter.click()
        await expect(footer.activeFilter).toHaveClass('selected')
       
        await footer.completedFilter.click()
        await expect(footer.completedFilter).toHaveClass('selected')

        await footer.allFilter.click()
        await expect(footer.allFilter).toHaveClass('selected')
    })

    test('respect the browser back button', async ({ page }) => {
        const toDoItem = new ToDoItem(page)
        const footer = new Footer(page)
        await createToDos(page, ['3rd item'])
        await toDoItem.completeToggle.first().check()
        await toDoItem.completeToggle.nth(1).check()

        await footer.activeFilter.click()
        await footer.completedFilter.click()
        await footer.allFilter.click()

        await page.goBack()
        await expect(footer.completedFilter).toHaveClass('selected')
        await expect(toDoItem.item).toHaveCount(2)

        await page.goBack()
        await expect(footer.activeFilter).toHaveClass('selected')
        await expect(toDoItem.item).toHaveCount(1)

        await page.goBack()
        await expect(footer.allFilter).toHaveClass('selected')
        await expect(toDoItem.item).toHaveCount(3)
    })
})