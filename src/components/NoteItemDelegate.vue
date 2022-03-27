<template>
    <div :class="{'hover:bg-gray-50': !opened}" class="flex flex-col px-[15px] gap-2 cursor-pointer py-2 component-root">
        <div class="flex select-none group gap-2 items-center">
            <router-link to="/app/note/_test" class="flex-grow">
                <h2 class="font-medium">Clicking Settings & members should</h2>
                <p class="text-sm text-gray-500">2 days ago</p>
            </router-link>
            <div class="relative text-gray-500 hover:bg-gray-200 rounded-md" :class="{'bg-gray-200': opened}">
                <div tabindex="0" class=" text-gray-400 outline-none p-2" @click="$emit('sub:click')">
                    <svg class="hidden md:block" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12.2848L13.5075 7.77725L12.4478 6.716L9 10.166L5.553 6.716L4.4925 7.7765L9 12.2848Z" fill="currentColor"/>
                    </svg>
                    <svg class="md:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </div>

                <div
                    tabindex="0"
                    :class="[opened ? 'md:p-1 md:border' : 'w-0 h-0 p-0 border-0']"
                    class="popup">
                    <div class="flex-grow" @click="opened=false"/>
                    <div class="flex gap-1 flex-col content">
                        <div class="md:hidden popup-heading">
                            <span>Clicking Settings & members should</span>
                        </div>
                        <div v-for="title in menu" :key="title" class="menu-text">
                            {{title}}
                        </div>
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

<style scoped>

.popup{
    @apply fixed overflow-clip outline-none;
    @apply transition-all duration-200 right-0 ;
    @apply shadow-lg rounded-md z-10 border-gray-200;
    @apply top-0 right-0 left-0 bottom-0;
    @apply flex flex-col justify-end;
    @apply bg-black bg-opacity-10;
}

.popup > div.content{
    @apply bg-white rounded-t-xl py-4 px-2;
}

.menu-text{
    @apply rounded-md px-2 hover:bg-hoverColor hover:text-textFaint;
    @apply py-3;
}

.popup-heading{
    @apply px-2 py-3;
    @apply font-medium text-lg;
}

@screen md{
    .popup{
        @apply absolute bottom-auto left-auto right-0;
        @apply bg-white;
    }

    .menu-text{
        @apply py-1;
    }

    .popup > div.content{
        @apply rounded-none p-0;
    }
}
</style>