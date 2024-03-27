import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/todomvc')
})

test.only('Can create todo item', async({ page }) => {
    const textInput = new TextInput(page)
    await page.pause()
    const toDoItem = await textInput.createToDoItem('my first todo')
    await expect(toDoItem.itemLabel).toBeVisible()
})