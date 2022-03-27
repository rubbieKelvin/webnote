<template>
<div>
    <div class="px-4 h-8 flex items-center select-none border-b border-stroke md:hidden">
        Hello
    </div>
    <div class="px-4 select-none border-b border-stroke">
        <div class=" h-12 md:h-16 flex">
            <div class="flex-grow gap-4 flex items-center justify-start min-w-[33.3%]">
                <MenuItem v-for="title in Object.keys(menu)" :key="title" :list="menu[title]" :title="title"/>
            </div>
            <div class="hidden flex-grow md:flex justify-center items-center min-w-[33.3%]">
                <p class="w-max">How to make mistakes in python</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import MenuItem from './MenuItem.vue'

export default {
    components: {MenuItem},
    computed: {
        menu(){
            return {
                File: [
                    "New File",
                    "Import Webnote",
                    "Export Webnote",
                    "-",
                    "Duplicate",
                    "-",
                    "Share",
                    "Account"
                ],
                Edit: [
                    "Edit Mode",
                    "Delete"
                ],
                Insert: [
                    "Text",
                    "Image",
                    "List",
                ],
                Help: [
                    "Walk Through",
                    "About",
                    "Twitter"
                ]
            }
        }
    }
}
</script>