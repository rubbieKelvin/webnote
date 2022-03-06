<template>
    <div class="px-4 select-none border-b border-stroke">
        <div class="h-20 flex">
            <div class="flex-grow gap-4 flex items-center justify-start min-w-[33.3%]">
                <MenuItem v-for="title in Object.keys(menu)" :key="title" :list="menu[title]" :title="title"/>
            </div>
            <div class="flex-grow flex justify-center items-center min-w-[33.3%]">
                <p class="w-max">How to make mistakes in python</p>
            </div>
            <div class="flex-grow min-w-[33.3%] items-center justify-end flex">
                <div class="relative">
                    <img
                        tabindex="0"
                        @click="$store.state.globals.popup=`mbprofile`"
                        src="/src/assets/images/profile.png"
                        alt=""
                        class="w-10 outline-none h-10 rounded-full cursor-pointer">
                    <div
                        tabindex="0"
                        :class="[($store.state.globals.popup=='mbprofile') ? 'w-max p-3 border' : 'w-0 h-0 border-0 overflow-clip p-0']"
                        class="absolute flex gap-2 flex-col right-0 top-0 bg-white shadow-lg border-gray-200 rounded-md transition-all duration-200">
                        <div class="flex flex-row gap-2">
                            <img src="/src/assets/images/profile.png" alt="" class="w-10 h-10 rounded-full">
                            <div class="flex flex-col flex-grow">
                                <h3 class="font-semibold">Rubbie</h3>
                                <p class="text-sm">dev.rubbie@gmail.com</p>
                            </div>
                        </div>
                        <div class="h-[1px] bg-stroke"/>
                        <div>
                            <div class="hover:bg-danger transition-all duration-150 hover:text-white text-danger py-1 px-2 cursor-pointer rounded-md">Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue'

export default {
    components: {MenuItem},
    data: () => ({
        menu: {
            File: [
                "New File",
                "Import Webnote",
                "Export Webnote",
                "Share",
                "Account"
            ],
            Edit: [
                "Duplicate",
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
    })
}
</script>