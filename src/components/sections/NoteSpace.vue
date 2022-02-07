<template>
    <div ref="noteSpaceView" @keydown.esc="deleteModalOpen=false" @keypress.delete="deleteModalOpen=true" :tabindex="activeNote?'0':''" class="pt-4 border-white relative focus:border-blue-300 border-2 outline-none flex-grow pb-1 max-w-[50%] min-w-[calc(50%-1px)] gap-3 flex flex-col">
        <div class=" select-none px-2 flex gap-6" :class="[activeNote===null ? ' text-gray-400 pointer-events-none' : 'text-text']">
            <group-button label="">
                <group-button-item class="group" title="duplicate note [Ctrl+D]" @click="duplicateNote()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 5.25V11.25C6 12.0784 6.67157 12.75 7.5 12.75H12M6 5.25V3.75C6 2.92157 6.67157 2.25 7.5 2.25H10.9393C11.1383 2.25 11.329 2.32902 11.4697 2.46967L14.7803 5.78033C14.921 5.92098 15 6.11175 15 6.31066V11.25C15 12.0784 14.3284 12.75 13.5 12.75H12M6 5.25H5C3.89543 5.25 3 6.14543 3 7.25V14.25C3 15.0784 3.67157 15.75 4.5 15.75H10C11.1046 15.75 12 14.8546 12 13.75V12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span>Copy</span>
                        <span class="shortcut-snack">Ctrl+D</span>
                    </p>
                </group-button-item>
                <group-button-item class="group" :title="(noteseditmode) ? 'save [Ctrl+S]': 'enter edits mode [Ctrl+E]'" :class="{'text-white bg-accent hover:bg-accent': noteseditmode}" @click="toggleEditMode()">
                    <svg v-if="noteseditmode" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 16C4.79086 16 3 14.2091 3 12C3 10.0929 4.33457 8.4976 6.12071 8.09695C6.04169 7.74395 6 7.37684 6 7C6 4.23858 8.23858 2 11 2C13.4193 2 15.4373 3.71825 15.9002 6.00098C15.9334 6.00033 15.9666 6 16 6C18.7614 6 21 8.23858 21 11C21 13.419 19.2822 15.4367 17 15.9M15 13L12 10M12 10L9 13M12 10L12 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.315 15.4342C3.10461 15.4339 2.90405 15.3452 2.76225 15.1897C2.61783 15.0356 2.54607 14.8271 2.565 14.6167L2.74875 12.5962L11.2372 4.11074L13.89 6.76274L5.40375 15.2475L3.38325 15.4312C3.36 15.4335 3.33675 15.4342 3.315 15.4342ZM14.4195 6.23249L11.7675 3.58049L13.3582 1.98974C13.4989 1.84891 13.6898 1.76978 13.8889 1.76978C14.0879 1.76978 14.2788 1.84891 14.4195 1.98974L16.0102 3.58049C16.1511 3.72117 16.2302 3.91206 16.2302 4.11112C16.2302 4.31017 16.1511 4.50106 16.0102 4.64174L14.4202 6.23174L14.4195 6.23249Z" fill="currentColor"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span v-if="noteseditmode">Save</span>
                        <span v-else>Edit</span>
                        <span class="shortcut-snack">
                            {{ (noteseditmode) ? 'Ctrl+S':'Ctrl+E'}}
                        </span>
                    </p>
                </group-button-item>
                <group-button-item class="group" title="mark as favourite" :class="{'text-white bg-accent hover:bg-accent': getActiveNote?.favorite}" @click="$store.commit('UPDATE_ACTIVE_NOTE', {favorite: !getActiveNote.favorite})">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.23851 4.73851C1.9205 6.05653 1.9205 8.19347 3.23851 9.51149L9.00004 15.273L14.7615 9.51149C16.0795 8.19347 16.0795 6.05653 14.7615 4.73851C13.4435 3.4205 11.3065 3.4205 9.98851 4.73852L9.00004 5.72707L8.01149 4.73851C6.69347 3.4205 4.55653 3.4205 3.23851 4.73851Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span>Favorite</span>
                        <span class="shortcut-snack">Ctrl+L</span>
                    </p>
                </group-button-item>
                <group-button-item class="group" title="Add Comment" @click="setCommentBoxVisibility(true)">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.03851 13.3713L6.52864 13.6334C7.28821 14.0395 8.13645 14.2513 8.99775 14.25L9 14.25C11.8996 14.25 14.25 11.8996 14.25 9C14.25 6.1004 11.8996 3.75 9 3.75C6.10041 3.75 3.75001 6.1004 3.75001 9V9.00225C3.74871 9.86355 3.96054 10.7118 4.36663 11.4714L4.62866 11.9615L4.22575 13.7743L6.03851 13.3713ZM2.25001 15.75L3.04381 12.1786C2.52104 11.2008 2.24834 10.1088 2.25001 9C2.25001 5.27197 5.27198 2.25 9 2.25C12.728 2.25 15.75 5.27197 15.75 9C15.75 12.728 12.728 15.75 9 15.75C7.89122 15.7517 6.79925 15.479 5.82143 14.9562L2.25001 15.75Z" fill="currentColor"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span>Comment</span>
                        <span class="shortcut-snack">Ctrl+Alt+C</span>
                    </p>
                </group-button-item>
                <group-button-item class="group" :stroke="false" title="delete" @click="deleteModalOpen=true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 16.5H5.25C4.42157 16.5 3.75 15.8284 3.75 15V5.25H2.25V3.75H5.25V3C5.25 2.17157 5.92157 1.5 6.75 1.5H11.25C12.0784 1.5 12.75 2.17157 12.75 3V3.75H15.75V5.25H14.25V15C14.25 15.8284 13.5784 16.5 12.75 16.5ZM5.25 5.25V15H12.75V5.25H5.25ZM6.75 3V3.75H11.25V3H6.75ZM11.25 13.5H9.75V6.75H11.25V13.5ZM8.25 13.5H6.75V6.75H8.25V13.5Z" fill="currentColor"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span>Delete</span>
                    </p>
                </group-button-item>
            </group-button>

            <group-button v-if="noteseditmode" label="">
                <group-button-item class="group" @click="editorAddText()" title="add text">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 9H11.25M6.75 12H11.25M12.75 15.75H5.25C4.42157 15.75 3.75 15.0784 3.75 14.25V3.75C3.75 2.92157 4.42157 2.25 5.25 2.25H9.43934C9.63825 2.25 9.82902 2.32902 9.96967 2.46967L14.0303 6.53033C14.171 6.67098 14.25 6.86175 14.25 7.06066V14.25C14.25 15.0784 13.5784 15.75 12.75 15.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span>Text</span>
                        <span class="shortcut-snack">Ctrl+Alt-T</span>
                    </p>
                </group-button-item>
                <group-button-item class="group" @click="editorAddImage()" title="add image">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 16.5H4.5C3.67157 16.5 3 15.8284 3 15V3.00001C3 2.17159 3.67157 1.50001 4.5 1.50001H9.75C9.75672 1.49914 9.76353 1.49914 9.77025 1.50001H9.77475C9.78183 1.50223 9.78912 1.50374 9.7965 1.50451C9.86264 1.50875 9.92794 1.52161 9.99075 1.54276H10.002H10.0132H10.0223C10.0361 1.55246 10.0491 1.56324 10.0612 1.57501C10.143 1.61133 10.2174 1.66215 10.281 1.72501L14.781 6.22501C14.8439 6.2886 14.8947 6.36305 14.931 6.44476C14.9377 6.46126 14.943 6.47701 14.9482 6.49426L14.9557 6.51526C14.9767 6.57781 14.989 6.6429 14.9925 6.70876C14.9932 6.71623 14.9949 6.72357 14.9977 6.73051V6.73501C14.999 6.73993 14.9997 6.74495 15 6.75001V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5ZM6.75 12L4.5 15H13.5L9.75 9.75001L7.5 12.75L6.75 12ZM6.375 8.25001C5.76148 8.25084 5.26176 8.74308 5.25167 9.35652C5.24159 9.96995 5.72486 10.4784 6.33802 10.4994C6.95118 10.5204 7.4681 10.0462 7.5 9.43351V9.65101V9.37501C7.5 8.75369 6.99632 8.25001 6.375 8.25001ZM9.75 3.00001V6.75001H13.5L9.75 3.00001Z" fill="currentColor"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span>Image</span>
                        <span class="shortcut-snack">Ctrl+Alt-I</span>
                    </p>
                </group-button-item>
                <group-button-item class="group" @click="editorAddList()" title="add list" :stroke="false">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25 3H15.75V4.5H8.25V3ZM8.25 6H12.75V7.5H8.25V6ZM8.25 10.5H15.75V12H8.25V10.5ZM8.25 13.5H12.75V15H8.25V13.5ZM2.25 3H6.75V7.5H2.25V3ZM3.75 4.5V6H5.25V4.5H3.75ZM2.25 10.5H6.75V15H2.25V10.5ZM3.75 12V13.5H5.25V12H3.75Z" fill="currentColor"/>
                    </svg>
                    <div class="w-[2px]"/>
                    <p class="text-sm items-center flex gap-2">
                        <span>List</span>
                        <span class="shortcut-snack">Ctrl+Alt+L</span>
                    </p>
                </group-button-item>
            </group-button>
        </div>

        <div class="mx-2 bg-stroke" style="height: 1px"/>

        <note-view-pad v-if="activeNote"/>

        <div v-else class="flex items-center justify-center h-full">
            <div class="flex-col flex justify-center items-center">
                <svg width="150" height="178" viewBox="0 0 150 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M75 167C116.421 167 150 133.421 150 92C150 50.5786 116.421 17 75 17C33.5786 17 0 50.5786 0 92C0 133.421 33.5786 167 75 167Z" fill="url(#paint0_linear_1_216)"/>
                    <g filter="url(#filter0_d_1_216)">
                    <path d="M118 60H32C29.2386 60 27 62.2386 27 65V170C27 172.761 29.2386 175 32 175H118C120.761 175 123 172.761 123 170V65C123 62.2386 120.761 60 118 60Z" fill="white"/>
                    </g>
                    <path d="M65 75H39C37.3431 75 36 76.3431 36 78C36 79.6569 37.3431 81 39 81H65C66.6569 81 68 79.6569 68 78C68 76.3431 66.6569 75 65 75Z" fill="#B4DAFF"/>
                    <path d="M83 88H39C37.3431 88 36 89.3431 36 91C36 92.6569 37.3431 94 39 94H83C84.6569 94 86 92.6569 86 91C86 89.3431 84.6569 88 83 88Z" fill="#DFEAFB"/>
                    <path d="M65 102H39C37.3431 102 36 103.343 36 105C36 106.657 37.3431 108 39 108H65C66.6569 108 68 106.657 68 105C68 103.343 66.6569 102 65 102Z" fill="#B4DAFF"/>
                    <path d="M83 115H39C37.3431 115 36 116.343 36 118C36 119.657 37.3431 121 39 121H83C84.6569 121 86 119.657 86 118C86 116.343 84.6569 115 83 115Z" fill="#DFEAFB"/>
                    <path d="M65 129H39C37.3431 129 36 130.343 36 132C36 133.657 37.3431 135 39 135H65C66.6569 135 68 133.657 68 132C68 130.343 66.6569 129 65 129Z" fill="#B4DAFF"/>
                    <path d="M83 142H39C37.3431 142 36 143.343 36 145C36 146.657 37.3431 148 39 148H83C84.6569 148 86 146.657 86 145C86 143.343 84.6569 142 83 142Z" fill="#DFEAFB"/>
                    <g filter="url(#filter1_d_1_216)">
                    <path d="M118 9H32C29.2386 9 27 11.2386 27 14V44C27 46.7614 29.2386 49 32 49H118C120.761 49 123 46.7614 123 44V14C123 11.2386 120.761 9 118 9Z" fill="#1485FD"/>
                    </g>
                    <path d="M65 20H39C37.3431 20 36 21.3431 36 23C36 24.6569 37.3431 26 39 26H65C66.6569 26 68 24.6569 68 23C68 21.3431 66.6569 20 65 20Z" fill="#B4DAFF"/>
                    <path d="M83 33H39C37.3431 33 36 34.3431 36 36C36 37.6569 37.3431 39 39 39H83C84.6569 39 86 37.6569 86 36C86 34.3431 84.6569 33 83 33Z" fill="white"/>
                    <defs>
                    <filter id="filter0_d_1_216" x="21" y="51" width="108" height="127" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="-3"/>
                    <feGaussianBlur stdDeviation="3"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_216"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_216" result="shape"/>
                    </filter>
                    <filter id="filter1_d_1_216" x="21" y="0" width="108" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="-3"/>
                    <feGaussianBlur stdDeviation="3"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_216"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_216" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_1_216" x1="75" y1="17" x2="75" y2="167" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#E3ECFA"/>
                    <stop offset="1" stop-color="#DAE7FF"/>
                    </linearGradient>
                    </defs>
                </svg>
                <h2 class=" select-none text-gray-600">Select a note to get started</h2>
            </div>
        </div>

        <!-- overlay -->
        <div @focus="deleteModalOpen=false, $refs.noteSpaceView.focus()" tabindex="0" v-if="activeNote && deleteModalOpen" class="select-none text-text absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-10">
            <div @keydown.esc="deleteModalOpen=false, $refs.noteSpaceView.focus()" tabindex="0" class="bg-white p-4 rounded-md shadow-md flex flex-col gap-2">
                <h1 class="font-medium text-xl">Delete {{getActiveNote.title}}</h1>
                <p class="text-gray-800">Be sure you want to perform this action</p>
                <div class="flex flex-row gap-3">
                    <button @click="deleteModalOpen=false, $refs.noteSpaceView.focus()" class=" bg-gray-200 px-4 rounded-md py-3 transition-all hover:-translate-y-1 duration-200">Cancel</button>
                    <button @click="$store.commit('UPDATE_ACTIVE_NOTE', {trash: true}), deleteModalOpen=false, $store.state.notebook.activeNote=null" class=" bg-gray-200 px-4 rounded-md py-3 transition-all hover:-translate-y-1 duration-200">Move To Trash</button>
                    <button @click="$store.commit('DELETE_CURRENT_NOTE'), deleteModalOpen=false, $refs.noteSpaceView.focus()" class=" px-4 rounded-md py-3 transition-all hover:-translate-y-1 duration-200 bg-danger text-white">Yes, Delete Permanetly</button>
                </div>
            </div>
        </div>

        <!-- comment -->
        <div :class="[(activeNote && showCommentModal) ? 'h-auto px-5 py-2 gap-4':'h-0 p-0 pointer-events-none']" class="bg-gray-200 transition-all duration-200 overflow-clip items-center flex">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.70946 14.857L7.25405 15.1482C8.09801 15.5994 9.0405 15.8348 9.99749 15.8333L10 15.8333C13.2218 15.8333 15.8333 13.2218 15.8333 10C15.8333 6.77822 13.2218 4.16667 10 4.16667C6.77823 4.16667 4.16668 6.77822 4.16668 10V10.0025C4.16523 10.9595 4.4006 11.902 4.85181 12.746L5.14296 13.2905L4.69528 15.3047L6.70946 14.857ZM2.50001 17.5L3.38201 13.5317C2.80116 12.4453 2.49815 11.232 2.50001 10C2.50001 5.85775 5.85776 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1423 17.5 10 17.5C8.76802 17.5018 7.55472 17.1988 6.46826 16.618L2.50001 17.5Z" fill="currentColor"/>
            </svg>
            <input @keypress.enter="comment()" ref="commentInput1" @keydown.esc="setCommentBoxVisibility(false)" placeholder="Enter comment" class="flex-grow h-10 rounded-md outline-none bg-transparent" type="text" name="" id="">
            <button @click="comment()" class="bg-accent hover:bg-blue-600 px-3 py-2 text-sm outline-blue-600 text-white rounded-md">Send</button>
        </div>
    </div>
</template>

<style scoped>
.shortcut-snack{
    @apply text-xs bg-gray-200 text-gray-700 group-hover:p-1 rounded-md group-hover:w-auto transition-all duration-200 overflow-clip w-0;
}
</style>

<script>
import GroupButton from '../controls/GroupButton.vue'
import GroupButtonItem from '../controls/GroupButtonItem.vue'
import NoteViewPad from  '../notepad/ViewPad.vue'
import {mapState, mapActions, mapGetters} from 'vuex'
import {makeText, makeImage, makeList, makeComment} from '../../notes.js'
import {contentPush} from '../../store'


export default {
    data: () => ({
        deleteModalOpen: false,
        showCommentModal: false
    }),
    components: {GroupButton, GroupButtonItem, NoteViewPad},
    computed: {
        ...mapState({
            activeNote: state => state.notebook.activeNote,
            noteseditmode: state => state.appmode.noteseditmode
        }),
        ...mapGetters([
            'getActiveNote'
        ])
    },
    methods: {
        ...mapActions([
            'toggleEditMode'
        ]),
        editorAddText(){
            contentPush(this.$store, makeText("Lorem ipsum..."))
        },
        editorAddImage(){
            contentPush(this.$store, makeImage("/src/assets/images/bg.png"))
        },
        editorAddList(){
            contentPush(this.$store, makeList())
        },
        duplicateNote(){
            this.$store.commit('DUPLICATE_CURRENT_NOTE')
        },
        setCommentBoxVisibility(value){
            this.showCommentModal = value
            if (value) this.$refs.commentInput1.focus()
            else this.$refs.noteSpaceView.focus()
        },
        comment(){
            const value = this.$refs.commentInput1.value.trim()
            this.$store.commit('ADD_COMMENT', makeComment('the-anon', value))
            this.$refs.commentInput1.value = ''
            this.setCommentBoxVisibility(false)
        }
    },
    mounted(){
        this._keyListener = function(e){
            const meta = (e.ctrlKey || e.metaKey)
            if (e.key=='c' && meta && e.altKey) {
                e.preventDefault()
                if (this.activeNote){
                    this.setCommentBoxVisibility(!this.showCommentModal)
                }
            }
        }
        document.addEventListener('keydown', this._keyListener.bind(this))
    },
    beforeDestroy(){
        document.addEventListener('keydown', this._keyListener)
    },
}
</script>