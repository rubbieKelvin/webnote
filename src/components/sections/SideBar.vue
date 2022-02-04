<template>
    <div class=" select-none text-text bg-elevation min-w-[15%] max-w-[15%] py-4 px-2 flex flex-col gap-12">
        <!-- ... -->
        <profile-banner class=""/>
        <!-- ... -->
        <div class="flex flex-col gap-3">
            <div class=" px-2">
                <h2 class="sec-title font-dm">Quick Links</h2>
            </div>
            <!-- ... -->
            <div class="flex flex-col gap-1">
                <div @click="setNoteListMode('notes')" :class="{'quick-link-active': appmode.noteslistmode=='notes'}" class="quick-link font-poppins">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.75 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H14.25C15.0784 2.25 15.75 2.92157 15.75 3.75V9.75C15.7497 9.75867 15.7482 9.76724 15.7455 9.7755C15.7434 9.78235 15.7418 9.78938 15.741 9.7965C15.7368 9.86264 15.7239 9.92794 15.7028 9.99075L15.696 10.011C15.691 10.0279 15.6847 10.0445 15.6772 10.0605C15.6409 10.1422 15.5901 10.2167 15.5273 10.2802L10.2773 15.5303C10.1374 15.6702 9.94786 15.7492 9.75 15.75ZM3.75 3.75V14.25H9V9.75C9 9.33579 9.33579 9 9.75 9H14.25V3.75H3.75ZM10.5 10.5V13.1903L13.1895 10.5H10.5Z" fill="currentColor"/>
                    </svg>
                    <p>Notes</p>
                </div>

                <div @click="setNoteListMode('reminders')" :class="{'quick-link-active': appmode.noteslistmode=='reminders'}" class="quick-link font-poppins">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6V9L11.25 11.25M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p>Reminders</p>
                </div>

                <div @click="setNoteListMode('favorites')" :class="{'quick-link-active': appmode.noteslistmode=='favorites'}" class="quick-link font-poppins">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.23851 4.73851C1.9205 6.05653 1.9205 8.19347 3.23851 9.51149L9.00004 15.273L14.7615 9.51149C16.0795 8.19347 16.0795 6.05653 14.7615 4.73851C13.4435 3.4205 11.3065 3.4205 9.98851 4.73852L9.00004 5.72707L8.01149 4.73851C6.69347 3.4205 4.55653 3.4205 3.23851 4.73851Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p>Favorite</p>
                </div>

                <div @click="setNoteListMode('shared')" :class="{'quick-link-active': appmode.noteslistmode=='shared'}" class="quick-link font-poppins">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3713 7.62868C9.19975 6.45711 7.30025 6.45711 6.12868 7.62868L3.12868 10.6287C1.95711 11.8003 1.95711 13.6997 3.12868 14.8713C4.30025 16.0429 6.19975 16.0429 7.37132 14.8713L8.19749 14.0451M7.62868 10.3713C8.80025 11.5429 10.6997 11.5429 11.8713 10.3713L14.8713 7.37132C16.0429 6.19975 16.0429 4.30025 14.8713 3.12868C13.6997 1.95711 11.8003 1.95711 10.6287 3.12868L9.80397 3.95339" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p>Shared</p>
                </div>

                <div @click="setNoteListMode('trash')" :class="{'quick-link-active': appmode.noteslistmode=='trash'}" class="quick-link font-poppins">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.25 5.25L13.5995 14.3569C13.5434 15.1418 12.8903 15.75 12.1033 15.75H5.89668C5.10972 15.75 4.45656 15.1418 4.40049 14.3569L3.75 5.25M7.5 8.25V12.75M10.5 8.25V12.75M11.25 5.25V3C11.25 2.58579 10.9142 2.25 10.5 2.25H7.5C7.08579 2.25 6.75 2.58579 6.75 3V5.25M3 5.25H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <p>Trash</p>
                </div>
            </div>
        </div>
        <!-- ... -->
        <div class="flex flex-col gap-3 flex-grow">
            <div class="flex">
                <h2 class="flex-grow sec-title font-dm">Tags</h2>
                <svg @click="toggleTagBox()" class=" text-gray-400 cursor-pointer hover:text-accent" width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3V15M15 9L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div :class="{'h-0 p-0 hidden': !show_tag_box}" class="flex">
                <input @keydown.enter="addTag()" ref="tagInput" autofocus class=" transition-all outline-accent px-2 py-2 rounded-md flex-grow" type="text" name="" placeholder="Enter tag name..." id="">
            </div>
            <!-- ... -->
            <div class="scrollbar flex flex-col gap-1 flex-grow h-0 overflow-y-hidden hover:overflow-y-auto">
                
                <div @click="setNoteListMode(`tag:${tag}`)" :class="{'quick-link-active': appmode.noteslistmode==`tag:${tag}`}" :key="tag" v-for="tag in tags" class="quick-link font-poppins">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.125 2.75782L9.5627 3.25412C9.573 3.26579 9.58366 3.27714 9.59467 3.28815L10.125 2.75782ZM15.2422 10.125L14.7459 9.5627C14.7342 9.573 14.7229 9.58366 14.7119 9.59467L15.2422 10.125ZM15.375 8.00782L15.9373 7.51152C15.927 7.49984 15.9163 7.48849 15.9053 7.47749L15.375 8.00782ZM8.00782 15.375L7.47749 15.9053C7.48849 15.9163 7.49984 15.927 7.51152 15.9373L8.00782 15.375ZM9.99218 15.375L10.4885 15.9373C10.5002 15.927 10.5115 15.9163 10.5225 15.9053L9.99218 15.375ZM2.75782 10.125L3.28815 9.59467L3.27163 9.57815L3.25412 9.5627L2.75782 10.125ZM5.25 4.5C4.83579 4.5 4.5 4.83579 4.5 5.25C4.5 5.66421 4.83579 6 5.25 6V4.5ZM5.2575 6C5.67171 6 6.0075 5.66421 6.0075 5.25C6.0075 4.83579 5.67171 4.5 5.2575 4.5V6ZM3 5.25C3 4.00736 4.00736 3 5.25 3V1.5C3.17893 1.5 1.5 3.17893 1.5 5.25H3ZM3 9V5.25H1.5V9H3ZM5.25 3H9V1.5H5.25V3ZM9 3C9.2239 3 9.42417 3.09717 9.5627 3.25412L10.6873 2.26152C10.2761 1.79565 9.67212 1.5 9 1.5V3ZM15 9C15 9.2239 14.9028 9.42417 14.7459 9.5627L15.7385 10.6873C16.2044 10.2761 16.5 9.67212 16.5 9H15ZM14.8127 8.50412C14.9298 8.63678 15 8.80928 15 9H16.5C16.5 8.42989 16.287 7.9077 15.9373 7.51152L14.8127 8.50412ZM9 15C8.80928 15 8.63678 14.9298 8.50412 14.8127L7.51152 15.9373C7.9077 16.287 8.42989 16.5 9 16.5V15ZM9.49588 14.8127C9.36322 14.9298 9.19072 15 9 15V16.5C9.57011 16.5 10.0923 16.287 10.4885 15.9373L9.49588 14.8127ZM3.25412 9.5627C3.09717 9.42417 3 9.2239 3 9H1.5C1.5 9.67212 1.79565 10.2761 2.26152 10.6873L3.25412 9.5627ZM9.59467 3.28815L14.8447 8.53815L15.9053 7.47749L10.6553 2.22749L9.59467 3.28815ZM8.53815 14.8447L3.28815 9.59467L2.22749 10.6553L7.47749 15.9053L8.53815 14.8447ZM14.7119 9.59467L9.46185 14.8447L10.5225 15.9053L15.7725 10.6553L14.7119 9.59467ZM5.25 6H5.2575V4.5H5.25V6Z" fill="currentColor"/>
                    </svg>
                    <p>{{tag}}</p>
                </div>
            </div>

        </div>

        <div class="flex">
            <a href="https://rubbiekelvin.netlify.app/" class=" text-gray-400 text-xs hover:text-text">stuffsbyrubbie</a>
        </div>
    </div>
</template>

<style scoped>
.quick-link{
    @apply transition-all duration-200 ease-in-out rounded-full px-4 flex py-2 gap-3 items-center cursor-pointer;
}

.quick-link-active{
    @apply bg-accent text-white;
}

.sec-title{
    @apply text-lg font-medium;
}
</style>

<script>
import {mapState, mapActions} from 'vuex'
import ProfileBanner from '../user/ProfileBanner.vue'

export default {
    data(){
        return {
            show_tag_box: false,
        }
    },
    computed: {
        ...mapState({
            appmode: state => state.appmode,
            tags: state => state.notebook.tags
        })
    },
    components: {ProfileBanner},
    methods: {
        ...mapActions([
            'setNoteListMode'
        ]),
        toggleTagBox(){
            this.show_tag_box = !this.show_tag_box
        },
        addTag(){
            const store = this.$store
            const tag = this.$refs.tagInput.value.trim()

            if (tag){
                store.dispatch('addNewTag', tag)
            }
        }
    }
}
</script>