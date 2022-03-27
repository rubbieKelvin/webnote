<template>
    <div
        :class="[
            ($route.path==='/app/' || $route.path==='/app')?
            'w-full' :
            'hidden md:flex'
        ]"
        class="md:min-w-[20%] relative h-full border-r border-stroke">
        <MobileDrawer v-model="drawerOpened"/>
        <div class="w-full h-full pt-[25px] flex flex-col">
            <div class="px-[15px]">
                <div class="group rounded-md flex gap-2 items-center border-2 border-stroke px-3 focus-within:border-accent focus-within:border-2">
                    <button class="block md:hidden" :class="{'bg-red-500': drawerOpened}" @click="drawerOpened=true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <svg class="hidden md:block w-5 h-5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 15.75L11.25 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.60051 12.75 2.25 10.3995 2.25 7.5C2.25 4.60051 4.60051 2.25 7.5 2.25C10.3995 2.25 12.75 4.60051 12.75 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <input type="text" class=" outline-none bg-transparent py-3 w-full flex-grow" placeholder="Search notes...">

                    <ProfileWidget class="md:hidden"/>
                </div>
            </div>

            <div class="h-[1px] bg-stroke mt-5"/>

            <div class="overflow-y-auto overflow-x-hidden flex-grow">
                <!-- ... -->
                <NoteItemDelegate v-for="i in 30" :key="i" :opened="$store.state.globals.popup==`lsni-${i}`" @sub:click="toggleSubnote(`lsni-${i}`)"/>
                <div class="md:hidden h-16"/>
            </div>

            <button class="md:hidden font-meduim fixed bottom-6 right-6 bg-accent text-white py-3 px-4 rounded-full shadow-lg">
                New Note
            </button>
        </div>
    </div>
</template>

<script>
import NoteItemDelegate from '../components/NoteItemDelegate.vue'
import ProfileWidget from './ProfileWidget.vue'
import MobileDrawer from './MobileDrawer.vue'

export default {
    components: {NoteItemDelegate, ProfileWidget, MobileDrawer},
    data: () => ({
        drawerOpened: false
    }),
    methods: {
        toggleSubnote(i){
            if (this.$store.state.globals.popup == i)
                this.$store.state.globals.popup = null
            else
                this.$store.state.globals.popup = i
        }
    }
}
</script>