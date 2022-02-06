<template>
    <div class=" select-none flex gap-2 flex-col text-text flex-grow min-w-[20%] max-w-[20%] py-4">
        <div class="px-2">
            <div class=" group pl-3 bg-elevation flex rounded-full items-center gap-2">
                <svg class=" group-focus:text-accent h-5 w-5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 15.75L11.25 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.60051 12.75 2.25 10.3995 2.25 7.5C2.25 4.60051 4.60051 2.25 7.5 2.25C10.3995 2.25 12.75 4.60051 12.75 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input class=" font-dm bg-transparent focus:outline-0 flex-grow" type="text" placeholder="Search notes...">
                <button @click="new_note_modal_visible=true, $refs.noteTitleInput.focus()" class=" rounded-r-full bg-accent text-white w-12 h-12 items-center flex justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3V15M15 9L3 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- new-note -->

        <div :class="{'h-0': !new_note_modal_visible, 'border p-4': new_note_modal_visible}" class=" transition-all duration-200 rounded-md overflow-clip border-stroke flex flex-col gap-2 mx-2">
            <div class="flex">
                <h3 class="flex-grow font-dm text-sm font-medium text-text">New Note</h3>
                <button @click="new_note_modal_visible=false, $refs.noteTitleInput.value=''" class="hover:bg-gray-300 bg-gray-100 w-6 h-6 flex items-center justify-center rounded-full text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>

            <div class="flex flex-col">
                <p class="font-poppins">Title</p>
                <input @keydown.esc="new_note_modal_visible=false, $refs.noteTitleInput.value=''" @keypress.enter="createNote" ref="noteTitleInput" type="text" placeholder="Note title..." name="" id="" class="px-3 py-2 outline-accent rounded-md border-stroke border">
            </div>

            <button @click="createNote" class="p-3 bg-accent rounded-md hover:text-white hover:bg-opacity-100 text-accent font-poppins bg-opacity-20">Create</button>
        </div>

        <!-- ... -->

        <div class="text-text h-0 scrollbar overflow-y-hidden hover:overflow-y-auto flex flex-col flex-grow">
            <div @click="setActiveNote(note)" :key="note.id || note.local_id" v-for="note in notes" class="px-2 pt-2 cursor-pointer hover:bg-gray-100 flex bg-white flex-col gap-2">
                <h3 class="font-poppins">{{note.title}}</h3>
                <!-- <p class=" text-sm">But with some giudiance and explanation, we might get it right...</p> -->
                <div class="flex flex-row gap-3 items-center">
                    <p class="text-sm flex-grow font-bold text-gray-400">2m ago</p>
                    <svg class=" text-accent" width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.91667 9.91667H8.16667V8.75H9.91667C10.8832 8.75 11.6667 7.9665 11.6667 7C11.6667 6.0335 10.8832 5.25 9.91667 5.25H8.16667V4.08334H9.91667C11.5275 4.08334 12.8333 5.38917 12.8333 7C12.8333 8.61083 11.5275 9.91667 9.91667 9.91667ZM5.83333 9.91667H4.08333C2.4725 9.91667 1.16667 8.61083 1.16667 7C1.16667 5.38917 2.4725 4.08334 4.08333 4.08334H5.83333V5.25H4.08333C3.11684 5.25 2.33333 6.0335 2.33333 7C2.33333 7.9665 3.11684 8.75 4.08333 8.75H5.83333V9.91667ZM9.91667 7.58334H4.08333V6.41667H9.91667V7.58334Z" fill="currentColor"/>
                    </svg>
                    <svg class="text-accent" width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12.8333C6.35567 12.8333 5.83333 12.311 5.83333 11.6667H8.16666C8.16666 12.311 7.64433 12.8333 7 12.8333ZM11.6667 11.0833H2.33333V9.91667L3.5 9.33333V6.125C3.5 4.1055 4.32892 2.79592 5.83333 2.43833V1.16667H8.16666V2.43833C9.67108 2.79533 10.5 4.10433 10.5 6.125V9.33333L11.6667 9.91667V11.0833ZM7 3.35417C6.28814 3.3082 5.60162 3.62675 5.17708 4.2C4.81398 4.77433 4.63583 5.44622 4.66667 6.125V9.91667H9.33333V6.125C9.36413 5.44623 9.18598 4.77434 8.82291 4.2C8.39837 3.62675 7.71186 3.3082 7 3.35417Z" fill="currentColor"/>
                    </svg>
                </div>
                <div v-if="note !== notes.slice(-1)[0]" class="bg-stroke" style="height: 1px;"/>
                <!-- padding -->
                <div v-if="note === notes.slice(-1)[0]"/>
            </div>
            <div v-if="notes.length===0 && !new_note_modal_visible" class="flex-grow flex flex-col items-center justify-center gap-3">
                <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.2">
                    <path d="M101.791 242.485C116.648 251.44 127.247 247.723 131.304 240.542C139.151 226.655 165.242 198.258 206.587 188.66C261.348 175.948 249.912 142.196 216.248 124.484C182.585 106.773 157.414 82.2652 161.224 55.6177C165.034 28.9703 127.288 19.784 110.502 71.0448C99.6545 104.171 80.2151 113.046 67.819 115.179C56.1358 117.19 43.3559 119.713 37.1238 129.797C29.5616 142.033 32.2005 154.411 63.8619 162.9C108.729 174.93 68.4911 222.413 101.791 242.485Z" fill="#717171"/>
                    <path d="M63.1905 184.424C63.8193 184.064 70.9156 181.06 106.219 197.518C106.116 197.658 106.072 197.724 106.072 197.724C106.072 197.724 69.3711 210.084 62.1803 194.858C60.033 190.325 60.6483 187.203 63.1292 184.459L63.1905 184.424Z" fill="black"/>
                    <path d="M181.847 190.652C174.177 197.1 162.149 201.78 150.543 195.557C152.377 194.385 154.271 193.178 156.203 191.929C167.858 184.44 178.125 189.451 181.847 190.652Z" fill="black"/>
                    <path d="M195.585 111.349C203.421 176.601 184.799 188.443 182.726 190.242C182.125 190.763 181.882 190.725 180.975 190.491L180.959 190.5C177.118 189.482 167.859 184.44 156.203 191.928C154.271 193.177 152.376 194.384 150.542 195.556C138.652 203.097 129.05 208.411 122.133 205.327C116.265 202.333 110.975 199.743 106.219 197.518C70.9157 181.06 63.8194 184.064 63.1907 184.424C63.9202 184.027 70.6126 180.317 79.6239 173.793C79.6545 173.776 79.6852 173.758 79.6918 173.734C91.7365 165.005 107.867 151.249 119.461 133.554C127.354 121.521 135.076 91.0171 149.975 85.0318C180.594 73.6092 194.314 98.0763 195.585 111.349Z" fill="#2A2A2A"/>
                    <path d="M161.728 110.204C162.679 107.694 162.586 105.333 161.521 104.93C160.457 104.526 158.823 106.234 157.872 108.744C156.922 111.254 157.015 113.615 158.079 114.018C159.144 114.422 160.778 112.714 161.728 110.204Z" fill="white"/>
                    <path d="M181.224 113.406C181.898 110.809 181.551 108.471 180.448 108.185C179.346 107.899 177.907 109.774 177.233 112.371C176.56 114.969 176.907 117.307 178.009 117.593C179.111 117.878 180.551 116.004 181.224 113.406Z" fill="white"/>
                    <path d="M169.357 122.945C169.197 122.944 169.042 122.89 168.918 122.789C168.794 122.689 168.708 122.549 168.674 122.393C168.549 121.828 167.994 120.156 167.113 119.908C166.233 119.659 164.506 120.624 163.807 121.13C163.657 121.239 163.47 121.284 163.286 121.254C163.103 121.225 162.939 121.124 162.83 120.974C162.721 120.823 162.676 120.636 162.706 120.453C162.735 120.269 162.836 120.105 162.986 119.996C163.262 119.797 165.728 118.062 167.493 118.56C169.335 119.08 169.975 121.788 170.041 122.095C170.064 122.198 170.063 122.304 170.039 122.406C170.015 122.507 169.968 122.603 169.902 122.684C169.837 122.765 169.754 122.831 169.659 122.876C169.565 122.921 169.461 122.945 169.357 122.945H169.357Z" fill="white"/>
                    </g>
                </svg>
                <h1 class="text-sm text-gray-500">You dont have any notes</h1>
                <button @click="new_note_modal_visible=true" class="text-sm px-5 rounded-md text-white py-1 bg-accent">Create</button>
            </div>
        </div>
    </div>
</template>


<script>
import {mapState, mapActions} from 'vuex'

export default {
    data(){
        return {
            new_note_modal_visible: false
        }
    },
    computed: {
        ...mapState({
            notes: state => state.notebook.notes
        })
    },
    methods: {
        ...mapActions([
            'setActiveNote'
        ]),
        createNote(){
            const input = this.$refs.noteTitleInput
            const title = input.value.trim()
            if (title){
                input.value = ""
                this.new_note_modal_visible = false
                this.$store.dispatch('newNote', title)
            }
        }
    }
}
</script>