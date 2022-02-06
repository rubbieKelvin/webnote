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
        <div class="flex-grow"/>

        <a target="blank" href="https://rubbiekelvin.netlify.app/" class="flex gap-2 hover:bg-gray-200 cursor-pointer text-gray-800 border border-gray-300 rounded-md p-2">
            <div class="flex items-center">
                <div class="bg-danger bg-opacity-20 p-1 rounded-full relative">
                    <svg class=" text-danger" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.31802 6.81802C2.56066 8.57538 2.56066 11.4246 4.31802 13.182L12.0001 20.864L19.682 13.182C21.4393 11.4246 21.4393 8.57538 19.682 6.81802C17.9246 5.06066 15.0754 5.06066 13.318 6.81802L12.0001 8.13609L10.682 6.81802C8.92462 5.06066 6.07538 5.06066 4.31802 6.81802Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div class="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                        <span class="animate-ping bg-danger bg-opacity-50 p-2 rounded-full"/>
                    </div>
                </div>
            </div>
            <div class=" flex flex-col">
                <h1 class="text-sm font-medium">By me a coffee</h1>
                <p class=" text-gray-700 text-xs">This project is free, if you can, drop somthing for boys</p>
                <p class=" text-blue-400 text-xs">rubbiekelvin</p>
            </div>
            <div>
                <svg class="text-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.33325 4.99999H4.99992C4.07944 4.99999 3.33325 5.74619 3.33325 6.66666V15C3.33325 15.9205 4.07944 16.6667 4.99992 16.6667H13.3333C14.2537 16.6667 14.9999 15.9205 14.9999 15V11.6667M11.6666 3.33333H16.6666M16.6666 3.33333V8.33333M16.6666 3.33333L8.33325 11.6667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </a>
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