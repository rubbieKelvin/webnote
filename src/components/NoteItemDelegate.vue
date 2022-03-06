<template>
    <div :class="{'hover:bg-gray-50': !opened}" class="flex flex-col px-[15px] gap-2 cursor-pointer py-3">
        <div class="flex select-none group gap-2 items-center">
            <div class="flex-grow">
                <h2 class="font-medium text-lg">Title</h2>
                <p class="text-sm text-gray-500 font-bold">2 days ago</p>
            </div>
            <div class="relative hover:bg-gray-200 rounded-md" :class="{'bg-gray-200': opened}">
                <div tabindex="0" class=" outline-none p-2" @click="$emit('sub:click')">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12.2848L13.5075 7.77725L12.4478 6.716L9 10.166L5.553 6.716L4.4925 7.7765L9 12.2848Z" fill="#797979"/>
                    </svg>
                </div>

                <div
                    tabindex="0"
                    :class="[opened ? 'p-1 border' : 'w-0 h-0 p-0 border-0']"
                    class="overflow-clip top-0 outline-none transition-all duration-200 right-0 bg-white absolute flex gap-1 flex-col border-gray-200 shadow-lg rounded-md z-10">
                    
                    <div v-for="title in menu" :key="title" class="py-1 rounded-md px-2 hover:bg-accent hover:text-white">
                        {{title}}
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        opened: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        menu: [
            "Delete",
            "Rename",
            "Duplicate"
        ]
    })
}
</script>