import {v4 as uuid4} from 'uuid'

export const types = {
    // text
    text_paragraph: 'text:paragraph',
    text_code: 'text:code',
    text_heading: 'text:heading',
    text_link: 'text:link',
}

export const createNote = (title) => {
    return {
        id: null,   // not on the server yet
        local_id: uuid4(),   // fallback id
        title,
        tags: [],
        last_edited: '2 mins ago',
        content: [],
        author: "anonymous",
        summary: "",
        favorite: false
    }
}

export const makeText = (text) => {
    return {
        id: uuid4(),
        text,
        type: types.text_paragraph,
        url: ''
    }
}