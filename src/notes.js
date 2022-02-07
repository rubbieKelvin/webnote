import {v4 as uuid4} from 'uuid'

export const parseAgoFromDateObj = datetime => {
    const now = new Date()
    const delta = now - datetime
    const years = now.getFullYear()-datetime.getFullYear()
    const months = now.getMonth()-datetime.getMonth()
    const sec = delta/1000
    const minutes = sec/60
    const hours = minutes/60
    const days = hours/24

    if (years>0){
        if (years==1) return 'last year'
        return `${years} years ago`
    }

    if (months>0){
        if (months==1) return 'last month'
        return `${months} months ago`
    }

    if (days>1){
        if (days < 2) return 'yesterday'
        return `${Math.floor(days)} days ago`
    }

    if (hours>1) {
        if (hours < 2) return 'an hour ago'
        return `${Math.floor(hours)} hours ago`
    }

    if (minutes>=1) return `${Math.floor(minutes)} minutes ago`
    return 'few seconds ago'
}

export const types = {
    // text
    text_paragraph: 'text:paragraph',
    text_code: 'text:code',
    text_heading: 'text:heading',
    text_link: 'text:link',
    image: 'image',
    list: "list"
}

export const createNote = (title) => {
    return {
        id: null,   // not on the server yet
        local_id: uuid4(),   // fallback id
        title,
        last_edited: new Date(),
        created: new Date(),
        content: [],
        author: "anonymous",
        summary: "",
        collaborators: [],
        favorite: false,
        reminder: null,
        synced: false,
        comments: [],
        trash: false
    }
}

export const makeText = text => {
    return {
        id: uuid4(),
        text,
        type: types.text_paragraph,
        url: ''
    }
}

export const makeImage = src => {
    return {
        id: uuid4(),
        src,
        type: types.image
    }
}

export const makeList = () => {
    return {
        id: uuid4(),
        type: types.list,
        items: []
    }
}

export const makeListItem = value => {
    return {
        id: uuid4(),
        indent: 0,
        value,
        listType: 'normal', // normal or checklist
        checked: false
    }
}


export const makeComment = (author, text) => {
    return {
        id: uuid4(),
        text,
        author,
        createdAt: new Date()
    }
}