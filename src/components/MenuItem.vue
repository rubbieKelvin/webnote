<template>
    <div class="select-none relative cursor-pointer">
        <div
            tabindex="0"
            :class="[($store.state.globals.popup==`menuitem::${title}`) ? 'bg-accent text-white' : 'hover:bg-gray-200 text-gray-900']"
            class="px-3 outline-none py-1 rounded-md"
            @click="$store.state.globals.popup=(($store.state.globals.popup==`menuitem::${title}`) ? null : `menuitem::${title}`)">
            <p class=" font-medium">{{title}}</p>
        </div>
        <div
            tabindex="0"
            :class="[($store.state.globals.popup==`menuitem::${title}`) ? 'p-2 border' : 'min-w-[0px] h-0 p-0 border-0 overflow-clip']"
            class="_popup">
            <div class="flex px-1 py-2 md:hidden">
                <p class="font-medium text-2xl flex-grow">{{title}}</p>
                <button @click="$store.state.globals.popup=null" class=" bg-gray-100 px-3 py-1 rounded-md text-textFaint text-sm">close</button>
            </div>
            <template v-for="item in list" :key="item">
                <hr v-if="item === '-'">
                <p
                    v-else
                    @click="$emit(`menuclick:${slug(item)}`)"
                    class="md:p-1 p-2 cursor-pointer hover:bg-hoverColor rounded-md hover:text-textFaint">
                    {{item}}
                </p>
            </template>
        </div>
    </div>
</template>

<script>
import slugify from 'slugify'

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        list: {
            type: Array,
            required: true
        }
    },
    methods: {
        slug(word){
            return slugify(word, {
                lower: true,
                strict: true
            })
        }
    }
}
</script>

<style scoped>
._popup{
    @apply fixed md:absolute outline-none transition-all duration-100;
    @apply cursor-default bg-white md:rounded-md border-gray-200;
    @apply md:shadow-lg min-w-[180px] flex flex-col gap-2;
    @apply left-0 top-0 md:top-9 right-0 md:right-auto z-20;
}
</style>
