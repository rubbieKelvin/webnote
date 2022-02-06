<template>
    <div class=" select-none h-full bg-elevation min-w-[15%] max-w-[15%] flex flex-col gap-3">
        <template v-if="$store.state.appmode.rightsidemode==='default' || $store.state.appmode.rightsidemode==='comments'">
            <div class="text-text flex gap-4 h-14 items-center px-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.70946 14.857L7.25405 15.1482C8.09801 15.5994 9.0405 15.8348 9.99749 15.8333L10 15.8333C13.2218 15.8333 15.8333 13.2218 15.8333 10C15.8333 6.77822 13.2218 4.16667 10 4.16667C6.77823 4.16667 4.16668 6.77822 4.16668 10V10.0025C4.16523 10.9595 4.4006 11.902 4.85181 12.746L5.14296 13.2905L4.69528 15.3047L6.70946 14.857ZM2.50001 17.5L3.38201 13.5317C2.80116 12.4453 2.49815 11.232 2.50001 10C2.50001 5.85775 5.85776 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1423 17.5 10 17.5C8.76802 17.5018 7.55472 17.1988 6.46826 16.618L2.50001 17.5Z" fill="currentColor"/>
                </svg>
                <h2 class="text-lg">Comments</h2>
            </div>
            <div class="bg-stroke h-[1px] mx-2"/>
            <div class="flex-grow flex items-center justify-center">
                <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.2">
                    <path d="M173.464 58.0226C173.464 58.0226 144.088 95.2329 97.085 73.038C50.0821 50.8431 3.07991 110.9 43.5539 147.458C84.0279 184.016 44.4211 204.104 71.9179 226.509C103.17 251.973 130.378 200.336 155.185 212.087C209.935 238.021 250.496 227.754 241.357 197.725C225.314 145.012 204.799 141.583 220.467 114.165C236.134 86.7464 201.556 29.7371 173.464 58.0226Z" fill="#727272"/>
                    <path d="M123.275 174.775C123.275 200.042 143.755 220.522 169.022 220.522C174.906 220.532 180.736 219.4 186.188 217.187C186.3 217.201 186.413 217.207 186.526 217.207H206.549C207.193 217.208 207.831 217.081 208.427 216.835C209.022 216.588 209.563 216.227 210.019 215.771C210.474 215.315 210.836 214.774 211.082 214.179C211.329 213.584 211.455 212.945 211.455 212.301V191.894C213.654 186.455 214.779 180.641 214.77 174.775C214.77 149.508 194.29 129.027 169.022 129.027C143.755 129.027 123.275 149.508 123.275 174.775Z" fill="black"/>
                    <path d="M187.334 142.348C187.334 174.047 161.64 199.74 129.941 199.74C122.56 199.752 115.246 198.331 108.407 195.556C108.266 195.573 108.124 195.581 107.982 195.581H82.8626C82.0542 195.582 81.2536 195.423 80.5066 195.113C79.7596 194.804 79.0809 194.351 78.5093 193.779C77.9377 193.208 77.4843 192.529 77.1751 191.782C76.866 191.035 76.7071 190.234 76.7075 189.426V163.824C73.9491 157.001 72.5369 149.708 72.5487 142.348C72.5487 110.649 98.242 84.9559 129.941 84.9559C161.64 84.9559 187.334 110.649 187.334 142.348Z" fill="#2D2D2D"/>
                    <path d="M103.325 153.992C107.918 153.992 111.642 150.268 111.642 145.675C111.642 141.081 107.918 137.357 103.325 137.357C98.7308 137.357 95.0068 141.081 95.0068 145.675C95.0068 150.268 98.7308 153.992 103.325 153.992Z" fill="white"/>
                    <path d="M127.445 153.992C132.039 153.992 135.763 150.268 135.763 145.675C135.763 141.081 132.039 137.357 127.445 137.357C122.851 137.357 119.127 141.081 119.127 145.675C119.127 150.268 122.851 153.992 127.445 153.992Z" fill="white"/>
                    <path d="M152.399 153.992C156.993 153.992 160.717 150.268 160.717 145.675C160.717 141.081 156.993 137.357 152.399 137.357C147.805 137.357 144.081 141.081 144.081 145.675C144.081 150.268 147.805 153.992 152.399 153.992Z" fill="white"/>
                    <path d="M178.184 114.899C186.452 114.899 193.155 108.196 193.155 99.9273C193.155 91.6585 186.452 84.9554 178.184 84.9554C169.915 84.9554 163.212 91.6585 163.212 99.9273C163.212 108.196 169.915 114.899 178.184 114.899Z" fill="#2D2D2D" stroke="white" stroke-width="15" stroke-miterlimit="10"/>
                    <path d="M182.942 95.4899C182.745 94.7285 182.391 94.0166 181.903 93.3997C181.473 92.88 180.915 92.4814 180.283 92.2431C178.921 91.7731 177.44 91.7731 176.078 92.2431C175.448 92.4799 174.891 92.8789 174.464 93.3997C173.971 94.0136 173.617 94.7266 173.425 95.4899C173.162 96.518 173.04 97.5768 173.06 98.6377V101.161C173.039 102.224 173.163 103.286 173.431 104.315C173.625 105.084 173.982 105.803 174.476 106.424C174.906 106.949 175.464 107.354 176.097 107.599C177.452 108.085 178.934 108.085 180.289 107.599C180.918 107.353 181.472 106.948 181.897 106.424C182.384 105.8 182.736 105.082 182.93 104.315C183.192 103.285 183.315 102.224 183.295 101.161H183.307V98.6377C183.328 97.5768 183.205 96.518 182.942 95.4899V95.4899ZM180.685 101.538C180.694 102.211 180.64 102.884 180.524 103.548C180.446 104.02 180.285 104.474 180.048 104.89C179.866 105.21 179.596 105.472 179.269 105.644C178.934 105.806 178.565 105.886 178.193 105.879C177.821 105.885 177.453 105.804 177.117 105.644C176.786 105.471 176.51 105.21 176.319 104.89C176.077 104.475 175.91 104.021 175.824 103.548C175.698 102.886 175.64 102.212 175.651 101.538V98.2357C175.64 97.5639 175.696 96.8928 175.818 96.232C175.899 95.7688 176.065 95.3244 176.307 94.9209C176.498 94.6126 176.773 94.3641 177.098 94.2036C177.436 94.0567 177.8 93.981 178.168 93.981C178.536 93.981 178.9 94.0567 179.238 94.2036C179.566 94.3602 179.841 94.6096 180.03 94.9209C180.271 95.3245 180.437 95.7688 180.518 96.232C180.64 96.8927 180.696 97.5639 180.685 98.2357V101.538L180.685 101.538Z" fill="white"/>
                    </g>
                </svg>
            </div>
        </template>
        <template v-else-if="$store.state.appmode.rightsidemode==='widget'">
            <div class="text-text flex gap-4 h-14 items-center px-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.70946 14.857L7.25405 15.1482C8.09801 15.5994 9.0405 15.8348 9.99749 15.8333L10 15.8333C13.2218 15.8333 15.8333 13.2218 15.8333 10C15.8333 6.77822 13.2218 4.16667 10 4.16667C6.77823 4.16667 4.16668 6.77822 4.16668 10V10.0025C4.16523 10.9595 4.4006 11.902 4.85181 12.746L5.14296 13.2905L4.69528 15.3047L6.70946 14.857ZM2.50001 17.5L3.38201 13.5317C2.80116 12.4453 2.49815 11.232 2.50001 10C2.50001 5.85775 5.85776 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1423 17.5 10 17.5C8.76802 17.5018 7.55472 17.1988 6.46826 16.618L2.50001 17.5Z" fill="currentColor"/>
                </svg>
                <h2 class="text-lg flex-grow">Widget</h2>
                <button class="hover:text-danger text-gray-600">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 16.5H5.25C4.42157 16.5 3.75 15.8284 3.75 15V5.25H2.25V3.75H5.25V3C5.25 2.17157 5.92157 1.5 6.75 1.5H11.25C12.0784 1.5 12.75 2.17157 12.75 3V3.75H15.75V5.25H14.25V15C14.25 15.8284 13.5784 16.5 12.75 16.5ZM5.25 5.25V15H12.75V5.25H5.25ZM6.75 3V3.75H11.25V3H6.75ZM11.25 13.5H9.75V6.75H11.25V13.5ZM8.25 13.5H6.75V6.75H8.25V13.5Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div class="bg-stroke h-[1px] mx-2"/>


            <div class="flex flex-col gap-4 flex-grow px-4">
                <h1 class="font-medium font-dm text-gray-600">Position</h1>

                <div class="flex gap-[1px] w-full bg-stroke border border-stroke rounded-md">
                    <button @click="shiftContent(-1)" class=" bg-elevation hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center h-[34px] rounded-l-md flex-grow" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.25 8.25L9 4.5M9 4.5L12.75 8.25M9 4.5V13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button @click="shiftContent(1)" class=" bg-elevation hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center h-[34px] rounded-r-md flex-grow">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.75 9.75L9 13.5M9 13.5L5.25 9.75M9 13.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>                   
                </div>

                <h1 class="font-medium font-dm text-gray-600">{{getActiveContentItem.type.toUpperCase()}}</h1>

                <template v-if="getActiveContentItem.type.startsWith('text:')">
                    <div class="">
                        <p>Text type</p>
                        <div class="flex gap-[1px] w-full bg-stroke border border-stroke rounded-md">
                            <button class="hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center h-[34px] rounded-l-md flex-grow" :class="[(getActiveContentItem.type === types.text_paragraph) ? 'text-white bg-accent hover:bg-accent': 'bg-elevation']" title="paragraph" @click="updateContentItem(getActiveContentItem.id, {type: types.text_paragraph})">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.125 7.49999C5.125 5.19881 6.99048 3.33333 9.29167 3.33333H15.125V4.99999H14.2917V16.6667H12.625V4.99999H10.9583V16.6667H9.29167V11.6667C6.99048 11.6667 5.125 9.80118 5.125 7.49999ZM9.29167 9.99999V4.99999C7.91095 4.99999 6.79167 6.11928 6.79167 7.49999C6.79167 8.88071 7.91095 9.99999 9.29167 9.99999Z" fill="currentColor"/>
                                </svg>
                            </button>
                            <button class="hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center h-[34px] flex-grow" :class="[(getActiveContentItem.type === types.text_link) ? 'text-white bg-accent hover:bg-accent': 'bg-elevation']" title="link" @click="updateContentItem(getActiveContentItem.id, {type: types.text_link})">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.5417 14.1667H12.0417V12.5H14.5417C15.9224 12.5 17.0417 11.3807 17.0417 9.99999C17.0417 8.61928 15.9224 7.49999 14.5417 7.49999H12.0417V5.83333H14.5417C16.8429 5.83333 18.7084 7.69881 18.7084 9.99999C18.7084 12.3012 16.8429 14.1667 14.5417 14.1667ZM8.70835 14.1667H6.20835C3.90717 14.1667 2.04169 12.3012 2.04169 9.99999C2.04169 7.69881 3.90717 5.83333 6.20835 5.83333H8.70835V7.49999H6.20835C4.82764 7.49999 3.70835 8.61928 3.70835 9.99999C3.70835 11.3807 4.82764 12.5 6.20835 12.5H8.70835V14.1667ZM14.5417 10.8333H6.20835V9.16666H14.5417V10.8333Z" fill="currentColor"/>
                                </svg>
                            </button>
                            <button class="hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center h-[34px] flex-grow" :class="[(getActiveContentItem.type === types.text_heading) ? 'text-white bg-accent hover:bg-accent': 'bg-elevation']" title="heading" @click="updateContentItem(getActiveContentItem.id, {type: types.text_heading})">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.9583 9.16666V3.33333H15.625V16.6667H13.9583V10.8333H7.29167V16.6667H5.625V3.33333H7.29167V9.16666H13.9583Z" fill="currentColor"/>
                                </svg>
                            </button>
                            <button class="rounded-r-md hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center h-[34px] flex-grow" :class="[(getActiveContentItem.type === types.text_code) ? 'text-white bg-accent hover:bg-accent': 'bg-elevation']" :stroke="false" title="code" @click="updateContentItem(getActiveContentItem.id, {type: types.text_code})">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.20835 16.6667L12.5417 3.33333M15.875 6.66666L19.2084 9.99999L15.875 13.3333M5.87502 13.3333L2.54169 9.99999L5.87502 6.66666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </template>
            </div>

        </template>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import GroupButton from '../controls/GroupButton.vue'
import GroupButtonItem from '../controls/GroupButtonItem.vue'
import {types} from '../../notes.js'

export default {
    components: {GroupButton, GroupButtonItem},
    data(){
        return {
            types
        }
    },
    computed: {
        ...mapGetters([
            'getActiveContentItem',
            'getActiveNote'
        ])
    }    ,
    methods: {
        updateContentItem(id, data){
            this.$store.commit('UPDATE_ACTIVE_NOTE_CONTENT_ITEM', {id, data})
        },
        shiftContent(direction){
            const note = this.getActiveNote
            const index = note.content.indexOf(this.getActiveContentItem)
            const next = index + direction
            if (next == -1 || next == note.content.length) return
            [note.content[index], note.content[next]] = [note.content[next], note.content[index]]
        }
    }
}
</script>