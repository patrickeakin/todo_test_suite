import { test, expect } from '@playwright/test'
import { TextInput } from '../componant-objects/TextInput'

test.beforeEach('go to todo app', async({ page }) => {
    await page.goto('/examples/react/dist')
})

test.only('Can create todo item', async({ page }) => {
    const textInput = new TextInput(page)
    
    await textInput.createToDoItem('my first todo')
    const toDoItem = await page.locator('[data-testid="todo-item-label"]')
    await expect(toDoItem).toBeVisible()
    await page.pause()
})