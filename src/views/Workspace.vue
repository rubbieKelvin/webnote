<template>
    <div class=" flex flex-row h-full md:h-screen max-h-screen">
        <side-bar/>
        <left-section/>
        <note-space/>
        <right-side-bar/>
    </div>
</template>

<script>
import SideBar from '../components/sections/SideBar.vue'
import LeftSection from '../components/sections/LeftSection.vue'
import NoteSpace from '../components/sections/NoteSpace.vue'
import RightSideBar from '../components/sections/RightSideBar.vue'
import {contentPush} from '../store'
import {makeText, makeList, makeImage} from '../notes.js'

export default {
    components: {SideBar, LeftSection, NoteSpace, RightSideBar},
    mounted() {
        this._keyListener = function(e) {
            const meta = (e.ctrlKey || e.metaKey)
             if (e.key === "s" && meta) {
                e.preventDefault() // present "Save Page" from getting triggered.
                if (this.$store.getters.getActiveNote){
                    this.$store.commit("SET_EDIT_MODE", false)
                }
            }else if (e.key === "e" && meta) {
                e.preventDefault()
                if (this.$store.getters.getActiveNote){
                    this.$store.commit("SET_EDIT_MODE", true)
                }
            }else if (e.key === "d" && meta) {
                e.preventDefault()
                if (this.$store.getters.getActiveNote){
                    this.$store.commit("DUPLICATE_CURRENT_NOTE")
                }
            }else if (e.key === "l" && meta && !e.altKey){
                e.preventDefault()
                const note = this.$store.getters.getActiveNote
                if (note){
                    this.$store.commit('UPDATE_ACTIVE_NOTE', {favorite: !note.favorite})
                }
            }else if (this.$store.getters.getActiveNote && this.$store.state.appmode.noteseditmode){
                if (e.key === "t" && e.altKey && meta){
                    e.preventDefault()
                    contentPush(this.$store, makeText("Lorem ipsum..."))
                }else if (e.key === "i" && e.altKey && meta){
                    e.preventDefault()
                    contentPush(this.$store, makeImage("/src/assets/images/bg.png"))
                }else if (e.key === "l" && e.altKey && meta){
                    e.preventDefault()
                    contentPush(this.$store, makeList())
                }
            }
        };

        document.addEventListener('keydown', this._keyListener.bind(this));
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this._keyListener);
    }

}
</script>