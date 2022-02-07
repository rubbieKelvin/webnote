import { createStore } from "vuex";
import {createNote} from '../notes.js'
import {v4 as uuid4} from 'uuid'

const filterTypes = {
    allNotes: 'allNotes',
    favorites: 'favorites',
    shared: 'shared',
    trash: 'trash'
} 

const getNoteBook = (notes, local_id) => {
    if (local_id===null) return null
    const note = notes.filter(n=>n.local_id==local_id)[0]
    return (note===undefined) ? null : note
}

const getNoteContentitem = (note, id) => {
    if (id==null) return null
    const item = note.content.filter(i=>i.id===id)[0]
    return (item === undefined) ? null : item
}

const set_active_note = (state, note) => {
    if (note.trash) return
    state.notebook.activeNote = note.local_id
    state.appmode.noteseditmode = false
    state.notebook.activeContentItem = null
    state.appmode.rightsidemode = 'default'
}

export function contentPush(store, item){
    const note = store.getters.getActiveNote
    if (note){
        const content = note.content
        content.push(item)
        store.commit("UPDATE_ACTIVE_NOTE", {content})
    }
}

export const updateNote = (notebook, patch) => {
    notebook.synced = false
    notebook.last_edited = new Date()
    if (notebook!==undefined) {
        Object.entries(patch).forEach(kv => {
            notebook[kv[0]] = kv[1]
        })
    }
}

export const deleteNote = (state, note) => {
    state.notebook.notes = state.notebook.notes.filter(
        (n)=>n.local_id!==note.local_id
    )
    state.notebook.activeNote = null
    state.notebook.activeContentItem = null
    state.appmode.noteseditmode = false
    state.appmode.rightsidemode = 'default'
}

export const store = createStore({
    state: {
        notebook: {
            notes: [],
            activeNote: null,
            activeContentItem: null,
        },
        appmode: {
            noteslistmode: 'notes',
            noteseditmode: false,
            rightsidemode: 'default',
            newnotemodalvisible: false
        },
        searchFilter: ''
    },
    getters: {
        getNotes: (state) => {
            const mode = state.appmode.noteslistmode
            const notes = state.notebook.notes
            if (mode==='notes')
                return notes.filter(n=>!n.trash)
            else if(mode==='favorites')
                return notes.filter(n=>(n.favorite && !n.trash))
            else if (mode==='shared')
                return notes.filter(n=>(n.collaborators.length>0 && !n.trash))
            else if (mode==='trash')
                return notes.filter(n=>n.trash)
        },
        getActiveNote: (state) => getNoteBook(state.notebook.notes, state.notebook.activeNote),
        getActiveContentItem(state){
            if (state.notebook.activeContentItem==null) return null
            const note = getNoteBook(state.notebook.notes, state.notebook.activeNote)
            return getNoteContentitem(note, state.notebook.activeContentItem)
        }
    },
    mutations: {
        SET_SEARCH_FILTER(state, value){
            state.searchFilter = value
        },
        SET_NOTE_LIST_MODE(state, name){
            state.appmode.noteslistmode = name
            state.searchFilter = ''
        },

        CREATE_NOTE(state, title){
            const note = createNote(title)
            state.notebook.notes.push(note)
            state.notebook.activeNote = note.local_id
        },

        DUPLICATE_CURRENT_NOTE(state){
            const currentNote = getNoteBook(state.notebook.notes, state.notebook.activeNote)
            const newNote = {...currentNote}
            // ...
            newNote.id = null
            newNote.local_id = uuid4()
            newNote.title = `${newNote.title}-copy`
            state.notebook.notes.push(newNote)
            // ...
            set_active_note(state, newNote)
        },

        SET_ACTIVE_NOTE: (state, note) => set_active_note(state, note),

        SET_EDIT_MODE(state, mode){
            state.appmode.noteseditmode = mode
            
            if (!mode){
                state.notebook.activeContentItem = null
                state.appmode.rightsidemode = 'default'
                // do syncing
            }else{
                const note = getNoteBook(state.notebook.notes, state.notebook.activeNote)
                note.synced = false
                note.last_edited = new Date()
            }
        },
        
        SET_CURRENT_CONTENT_ITEM(state, id){
            state.notebook.activeContentItem = id
            state.appmode.rightsidemode = 'widget'
        },

        UPDATE_ACTIVE_NOTE(state, note){
            const lID = state.notebook.activeNote
            if (lID===null) return null
            let notebook = state.notebook.notes.filter(n=>n.local_id==lID)[0]
            notebook.synced = false
            notebook.last_edited = new Date()
            if (notebook!==undefined) {
                Object.entries(note).forEach(kv => {
                    notebook[kv[0]] = kv[1]
                })
            }
        },

        DELETE_CURRENT_NOTE(state){
            state.notebook.notes = state.notebook.notes.filter(
                (note)=>note.local_id!==state.notebook.activeNote
            )
            state.notebook.activeNote = null
            state.notebook.activeContentItem = null
            state.appmode.noteseditmode = false
            state.appmode.rightsidemode = 'default'
        },

        DELETE_CURRENT_NOTE_CONTENT_ITEM(state){
            if (state.appmode.noteseditmode && state.notebook.activeNote && state.notebook.activeContentItem){
                const note = getNoteBook(state.notebook.notes, state.notebook.activeNote)
                note.content = note.content.filter(c => c.id!=state.notebook.activeContentItem)
                state.appmode.rightsidemode = 'default'
                state.notebook.activeContentItem = null

            }
        },

        UPDATE_ACTIVE_NOTE_CONTENT_ITEM(state, payload){
            const id = payload.id
            const data = payload.data

            delete data['id'] // just incase id tries to be changed from outside

            const lID = state.notebook.activeNote
            if (lID===null) return null
            let note = state.notebook.notes.filter(n=>n.local_id==lID)[0]
            note.synced = false
            note.last_edited = new Date()

            const content = note.content
            const item = content.filter(n=>n.id===id)[0]
            Object.entries(data).forEach(kv => {
                item[kv[0]] = kv[1]
            })

            note.synced = false
            note.last_edited = new Date()
        },
        SET_NEW_NOTE_MODAL(state, value){
            state.appmode.newnotemodalvisible = value
        },
        ADD_COMMENT(store, value){
            if (!store.notebook.activeNote) return
            const note = getNoteBook(store.notebook.notes, store.notebook.activeNote)
            note.comments.push(value)
            note.synced = false
        }
    },
    actions: {
        setNoteListMode(context, name){
            context.commit('SET_NOTE_LIST_MODE', name)
        },

        newNote(context, title){
            const name = title.trim()
            if (name) {
                context.commit("CREATE_NOTE", name)
            }
        },

        setActiveNote(context, note){
            context.commit("SET_ACTIVE_NOTE", note)
        },

        toggleEditMode(context){
            const mode = context.state.appmode.noteseditmode
            context.commit("SET_EDIT_MODE", !mode)
        },
    }
})