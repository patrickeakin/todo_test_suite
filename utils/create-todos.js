import { TextInput } from "../component-objects/TextInput"

export const createToDos = async (page, itemTitles) => {
    const textInput = new TextInput(page)
    for (const itemTitle of itemTitles) {
        await textInput.createToDoItem(itemTitle)
    }
}