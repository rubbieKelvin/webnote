<template>
    <div tabindex="0" @focus="setNull" class="md:max-h-screen md:h-screen h-full flex">
        <TheLeftBar/>
        <TheSideBar/>
        <div
            :class="[
                ($route.path.startsWith('/app/note/'))?
                '' :
                'hidden md:flex'
            ]"
            class="flex-col flex-grow">
            <TheMenubar/>
            <TheMain/>
        </div>
    </div>
</template>

<script>
import TheSideBar from '../components/TheSideBar.vue'
import TheLeftBar from '../components/TheLeftBar.vue'
import TheMain from '../components/TheMain.vue'
import TheMenubar from '../components/TheMenubar.vue'

export default {
    components: {TheSideBar, TheMain, TheMenubar, TheLeftBar},
    methods:{
        setNull(){
            const globals = this.$store.state.globals
            globals.popup = null
        }
    },
    mounted(){
        document.addEventListener('keydown', (e) => {
            if (e.key==="Escape"){
                this.setNull()
            }
        })
    }
}
</script>
