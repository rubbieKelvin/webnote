<template>
    <div tabindex="0" @focus="setNull" class=" max-h-screen h-screen flex">
        <TheSideBar/>
        <div class=" flex-grow">
            <TheMenubar/>
            <TheMain/>
        </div>
    </div>
</template>

<script>
import TheSideBar from '../components/TheSideBar.vue'
import TheMain from '../components/TheMain.vue'
import TheMenubar from '../components/TheMenubar.vue'

export default {
    components: {TheSideBar, TheMain, TheMenubar},
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
