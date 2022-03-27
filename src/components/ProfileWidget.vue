<template>
    <div class="relative">
        <div
            tabindex="0"
            @click="$store.state.globals.popup=`mbprofile`"
            class="flex gap-2 items-center p-1 rounded-md hover:bg-hoverColor w-max cursor-pointer select-none">
            <img
                src="/src/assets/images/profile.png"
                alt=""
                class="w-7 outline-none h-7 rounded-full md:rounded-lg cursor-pointer">
            <span class="hidden md:inline font-medium">Rubbie Kelvin</span>
        </div>
        <div
            tabindex="0"
            :class="[($store.state.globals.popup=='mbprofile') ? 'md:w-max w-full p-3 border' : 'w-0 h-0 border-0 overflow-clip p-0']"
            class="fixed md:absolute z-10 bottom-0 right-0 md:bottom-auto md:right-auto flex gap-2 flex-col left-0 top-0 bg-white shadow-lg border-gray-200 rounded-md md:transition-all md:duration-150">
            <div class="flex flex-row gap-2">
                <img src="/src/assets/images/profile.png" alt="" class="w-7 h-7 rounded-lg">
                <div class="flex flex-col flex-grow">
                    <h3 class="font-semibold">Rubbie</h3>
                    <p class="text-sm">dev.rubbie@gmail.com</p>
                </div>
                <button class="md:hidden" @click="$store.state.globals.popup=null">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="h-[1px] bg-stroke"/>
            <div>
                <div class="hover:bg-danger transition-all duration-150 hover:text-white text-danger py-1 px-2 cursor-pointer rounded-md">Logout</div>
            </div>
        </div>
    </div>
</template>