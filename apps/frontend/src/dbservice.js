// import minimongo from 'minimongo'

//  export const db = new minimongo.IndexedDb({namespace: 'webnotedb'})
//  db.addCollection('notes')
//  export const noteDb = db.notes

//prefixes of implementation that we want to test
import {set, entries, get, setMany, del} from 'idb-keyval'

const parsenote = (key, value) => {
    if (key==="last_edited" || key==="created"){
        return new Date(value)
    }else if (key=="comments"){
        value.forEach(comment=>{
            comment.createdAt = new Date(comment.createdAt)
        })
    }
    return value
}

export const dbSetNote = async (note) => {
    await set(`note.${note.local_id}`, JSON.stringify(note))
}

export const dbGetNote = async (local_id) => {
    const res = await get(`note.${local_id}`)
    return JSON.parse(res, parsenote)
}

export const dbGetAllNotes = async () => {
    let res = await entries()
    res = res.filter(([key, value])=>key.startsWith('note.'))
    res = res.map(([key, value])=>JSON.parse(value, parsenote))
    return res
}

export const dbSaveAll = async (notes) => {
    setMany(notes.map(n=>`note.${n.local_id}`), notes.map(n=>JSON.stringify(n)))
}

export const dbRemoveNote = async (local_id) => {
    del(`note.${local_id}`)
}