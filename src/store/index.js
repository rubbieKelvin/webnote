import { createStore } from "vuex";
import {createNote} from '../notes.js'

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

export const store = createStore({
    state: {
        notebook: {
            tags: [],
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

        ADD_TAG(state, name){
            state.notebook.tags.push(name)
        },

        CREATE_NOTE(state, title){
            state.notebook.notes.push(
                createNote(title)
            )
        },

        SET_ACTIVE_NOTE(state, note){
            state.notebook.activeNote = note.local_id
            state.appmode.noteseditmode = false
            state.notebook.activeContentItem = null
            state.appmode.rightsidemode = 'default'
        },

        SET_EDIT_MODE(state, mode){
            state.appmode.noteseditmode = mode
            if (mode===false){
                state.notebook.activeContentItem = null
                state.appmode.rightsidemode = 'default'
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
        }
    },
    actions: {
        setNoteListMode(context, name){
            context.commit('SET_NOTE_LIST_MODE', name)
        },

        addNewTag(context, name){
            const tag = name.trim()
            if (tag) {
                context.commit("ADD_TAG", tag)
            }
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