import { createStore } from "vuex";
import {createNote} from '../notes.js'
import {v4 as uuid4} from 'uuid'

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
    state.notebook.activeNote = note.local_id
    state.appmode.noteseditmode = false
    state.notebook.activeContentItem = null
    state.appmode.rightsidemode = 'default'
}


export const store = createStore({
    state: {
        notebook: {
            notes: [],
            activeNote: null,
            activeContentItem: null
        },
        appmode: {
            noteslistmode: 'notes',
            noteseditmode: false,
            rightsidemode: 'default'
        }
    },
    getters: {
        getActiveNote: (state) => getNoteBook(state.notebook.notes, state.notebook.activeNote),
        getActiveContentItem(state){
            if (state.notebook.activeContentItem==null) return null
            const note = getNoteBook(state.notebook.notes, state.notebook.activeNote)
            return getNoteContentitem(note, state.notebook.activeContentItem)
        }
    },
    mutations: {
        SET_NOTE_LIST_MODE(state, name){
            state.appmode.noteslistmode = name
        },

        CREATE_NOTE(state, title){
            state.notebook.notes.push(
                createNote(title)
            )
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

        UPDATE_ACTIVE_NOTE_CONTENT_ITEM(state, payload){
            const id = payload.id
            const data = payload.data

            delete data['id'] // just incase id tries to be changed from outside

            const lID = state.notebook.activeNote
            if (lID===null) return null
            let note = state.notebook.notes.filter(n=>n.local_id==lID)[0]

            const content = note.content
            const item = content.filter(n=>n.id===id)[0]
            Object.entries(data).forEach(kv => {
                item[kv[0]] = kv[1]
            })

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