import { test, expect } from '@playwright/test'
import { TextInput } from '../component-objects/TextInput'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/examples/react/dist')
})

test.only('Can create todo item', async({ page }) => {
    const textInput = new TextInput(page)
    const toDoItem = await textInput.createToDoItem('my first todo')
    await expect(toDoItem.itemLabel).toBeVisible()
})