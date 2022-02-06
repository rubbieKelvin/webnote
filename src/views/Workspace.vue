<template>
    <div class=" flex flex-row h-screen max-h-screen min-h-screen">
        <side-bar/>
        <left-section/>
        <div class=" bg-stroke min-w-[1px] max-w-[1px]"/>
        <note-space/>
        <right-side-bar/>
    </div>
</template>

<script>
import SideBar from '../components/sections/SideBar.vue'
import LeftSection from '../components/sections/LeftSection.vue'
import NoteSpace from '../components/sections/NoteSpace.vue'
import RightSideBar from '../components/sections/RightSideBar.vue'

export default {
    components: {SideBar, LeftSection, NoteSpace, RightSideBar},
    mounted() {
        this._keyListener = function(e) {
            if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault() // present "Save Page" from getting triggered.
                this.$store.commit("SET_EDIT_MODE", false)
            }else if (e.key === "e" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                this.$store.commit("SET_EDIT_MODE", true)
            }else if (e.key === "d" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                this.$store.commit("DUPLICATE_CURRENT_NOTE")
            }
        };

        document.addEventListener('keydown', this._keyListener.bind(this));
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this._keyListener);
    }
}
</script>