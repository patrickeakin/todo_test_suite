import { test, expect } from '@playwright/test'
import { ToDoItem } from "../component-objects/ToDoItem"
import { createToDos } from '../utils/create-todos'
import { itemTitles } from '../data/item-titles'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
    await createToDos(page, itemTitles)
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

    test('removes item if empty string is entered', async({ page }) => {
        const toDoItem = new ToDoItem(page)
        await expect(toDoItem.item).toHaveCount(2)

        await toDoItem.editToDoText(0, '', 'Enter')
        await expect(toDoItem.item).toHaveCount(1)
    })
})