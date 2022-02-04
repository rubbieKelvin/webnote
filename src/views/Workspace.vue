<template>
    <div class=" flex flex-row h-screen max-h-screen min-h-screen">
        <side-bar/>
        <left-section/>
        <div class=" bg-stroke" style="width: 1px;"/>
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
    components: {SideBar, LeftSection, NoteSpace, RightSideBar}
}
</script>