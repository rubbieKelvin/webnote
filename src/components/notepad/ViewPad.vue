<template>
    <div class="flex-grow flex flex-col gap-2">
        <!-- header -->
        <div class="flex px-2">
            <div class="flex flex-grow flex-col">
                <!-- ... -->
                <input v-model="noteTitle" class=" h-14 outline-accent font-poppins text-5xl font-bold w-full" v-if="noteseditmode" type="text" placeholder="Enter title..."> 
                <h1 v-else class=" h-12 font-poppins text-5xl font-bold">{{getActiveNote.title}}</h1>
                <!-- ... -->
                <div>
                    <div class="h-8 items-center flex gap-4">
                        <p class=" select-none text-gray-700">{{getActiveNote.author}}</p>
                        <button v-if="noteseditmode" class="text-white bg-accent rounded-md flex items-center justify-center w-6 h-6">+</button>
                    </div>

                </div>
            </div>
            <p v-if="!noteseditmode" class=" w-40 select-none text-sm text-gray-600">last edited {{getActiveNote.last_edited}}</p>
        </div>
        <!-- body -->
        <div class="px-2 mt-1 pb-6 flex h-0 flex-grow gap-2 flex-col scrollbar overflow-y-auto">
            <template :key="item.id" v-for="item in getActiveNote.content">
                <!-- PARAGRAPH -->
                <template v-if="item.type === types.text_paragraph">
                    <template v-if="noteseditmode">
                        <textarea
                            :value="item.text"
                            rows="1"
                            @click="resizeTextArea($event), $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
                            @input="resizeTextArea($event), updateContentItem(item.id, {text: $event.target.value})"
                            placeholder="Enter text..."
                            :class="[
                                (activeContentItem===item.id) ? 'border-accent' : ' border-gray-200'
                            ]"
                            class="px-2 scrollbar font-poppins outline-none border-4 rounded-md outline-2 resize-none"/>
                    </template>
                    <template v-else>
                        <p>{{item.text}}</p>
                    </template>
                </template>

                <!-- LINK -->
                <template v-if="item.type === types.text_link">
                    <template v-if="noteseditmode">
                        <div class="flex gap-4">
                            <div :class="[
                                (activeContentItem===item.id) ? 'border-accent' : ' border-gray-200'
                            ]" class="flex rounded-md gap-1 items-center border-4 px-2">
                                <p class="mr-1 text-sm font-poppins">Display Text</p>
                                <div :class="[(activeContentItem===item.id) ? 'bg-accent' : ' bg-gray-200']" class=" w-[3px] h-[30px]"/>
                                <input @input="updateContentItem(item.id, {text: $event.target.value})" :value="item.text" @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)" class="ml-1 flex-grow outline-none" type="text" placeholder="enter display text...">
                            </div>
                            <div :class="[
                                (activeContentItem===item.id) ? 'border-accent' : ' border-gray-200'
                            ]" class="flex flex-grow rounded-md gap-1 items-center border-4 px-2">
                                <p class="mr-1 text-sm font-poppins">Url</p>
                                <div :class="[(activeContentItem===item.id) ? 'bg-accent' : ' bg-gray-200']" class=" w-[3px] h-[30px]"/>
                                <input @input="updateContentItem(item.id, {url: $event.target.value})" :value="item.url" @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)" class="ml-1 flex-grow outline-none" type="url" placeholder="enter url...">
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <a target="blank" :href="item.url" class=" w-max">
                            <div class="px-3 py-2 rounded-md bg-accent flex flex-row text-accent bg-opacity-20 gap-1 hover:gap-2 transition-all duration-200">
                                <p>{{item.text}}</p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 8L21 12M21 12L17 16M21 12L3 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </a>
                    </template>
                </template>

                <!-- HEADING -->
                <template v-if="item.type === types.text_heading">
                    <template v-if="noteseditmode">
                        <input
                            :value="item.text"
                            @click="$store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
                            @input="updateContentItem(item.id, {text: $event.target.value})"
                            placeholder="Enter text..."
                            :class="[
                                (activeContentItem===item.id) ? 'border-accent' : ' border-gray-200'
                            ]"
                            class="px-2 py-1 scrollbar font-poppins outline-none border-4 rounded-md outline-2 resize-none">
                    </template>
                    <template v-else>
                        <div class="flex flex-col gap-3">
                            <div/>
                            <h1 class=" text-3xl font-medium">{{item.text}}</h1>
                            <div class=" bg-stroke h-[1px]"/>
                        </div>
                    </template>
                </template>

                <!-- CODE -->
                <template v-if="item.type === types.text_code">
                    <template v-if="noteseditmode">
                        <textarea
                            :value="item.text"
                            rows="1"
                            @click="resizeTextArea($event), $store.commit('SET_CURRENT_CONTENT_ITEM', item.id)"
                            @input="resizeTextArea($event), updateContentItem(item.id, {text: $event.target.value})"
                            placeholder="Enter text..."
                            :class="[
                                (activeContentItem===item.id) ? 'border-accent' : ' border-gray-200'
                            ]"
                            class="px-2 scrollbar font-poppins outline-none border-4 rounded-md outline-2 resize-none"/>
                    </template>
                    <template v-else>
                        <div class="flex max-w-[100%] scrollbar flex-col">
                            <div class="flex px-2 items-center bg-gray-200 rounded-t-md">
                                <p class="flex-grow select-none">Code</p>
                                <group-button label="Copy">
                                    <group-button-item :stroke="false">
                                        <svg class=" text-gray-600" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 5.25V11.25C6 12.0784 6.67157 12.75 7.5 12.75H12M6 5.25V3.75C6 2.92157 6.67157 2.25 7.5 2.25H10.9393C11.1383 2.25 11.329 2.32902 11.4697 2.46967L14.7803 5.78033C14.921 5.92098 15 6.11175 15 6.31066V11.25C15 12.0784 14.3284 12.75 13.5 12.75H12M6 5.25H5C3.89543 5.25 3 6.14543 3 7.25V14.25C3 15.0784 3.67157 15.75 4.5 15.75H10C11.1046 15.75 12 14.8546 12 13.75V12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </group-button-item>
                                </group-button>
                            </div>
                            <div class="flex-grow flex">
                                <highlightjs
                                    class="max-w-[100%]"
                                    autodetect
                                    :code="item.text"
                                />
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import 'highlight.js/lib/common'
import {mapState, mapGetters} from 'vuex'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import GroupButton from '../controls/GroupButton.vue'
import GroupButtonItem from '../controls/GroupButtonItem.vue'
import {types} from '../../notes.js'

export default {
    data(){
        return {
            types
        }
    },
    computed: {
        ...mapState({
            noteseditmode: state => state.appmode.noteseditmode,
            activeContentItem: state => state.notebook.activeContentItem
        }),
        ...mapGetters([
            'getActiveNote'
        ]),
        noteTitle: {
            get(){
                return this.getActiveNote.title
            },
            set(value){
                if (value.trim().length===0) value = "Untitled"
                this.$store.commit('UPDATE_ACTIVE_NOTE', {title: value.trim()})
            }
        }
    },
    methods: {
        resizeTextArea(e){
            const el = e.target
            el.style.height = "1px";
            el.style.height = (10+el.scrollHeight)+"px";
        },
        updateContentItem(id, data){
            this.$store.commit('UPDATE_ACTIVE_NOTE_CONTENT_ITEM', {id, data})
        }
    },
    components: {
        GroupButton,
        GroupButtonItem,
        highlightjs: hljsVuePlugin.component},
}
</script>