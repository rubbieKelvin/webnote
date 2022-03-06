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
            class="absolute outline-none top-9 transition-all duration-100 cursor-default bg-white rounded-md border-gray-200 shadow-lg min-w-[200px] flex flex-col gap-2">
            <p
                v-for="item in list"
                :key="item"
                @click="$emit(`menuclick:${slug(item)}`)"
                class="p-1 cursor-pointer hover:bg-accent rounded-md hover:text-white">
                {{item}}
            </p>
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