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

        await toDoItem.completeToggle.first().check()
        await expect(footer.counter).toHaveText('1 item left')
    
        await main.markAllCompleteToggle.check()
        await expect(footer.counter).toHaveText('0 items left')
    })
})