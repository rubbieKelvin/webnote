<template>
    <div @click="$emit('click')" :class="{'px-3': !stroke}" class="pl-3 flex flex-grow flex-row items-center hover:md:bg-gray-50 cursor-pointer">
        <div class="flex-grow md:hidden"/>
        <div class="flex flex-col md:flex-row md:py-0 py-1 items-center justify-center">
            <slot class="">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 5.25V11.25C6 12.0784 6.67157 12.75 7.5 12.75H12M6 5.25V3.75C6 2.92157 6.67157 2.25 7.5 2.25H10.9393C11.1383 2.25 11.329 2.32902 11.4697 2.46967L14.7803 5.78033C14.921 5.92098 15 6.11175 15 6.31066V11.25C15 12.0784 14.3284 12.75 13.5 12.75H12M6 5.25H5C3.89543 5.25 3 6.14543 3 7.25V14.25C3 15.0784 3.67157 15.75 4.5 15.75H10C11.1046 15.75 12 14.8546 12 13.75V12.75" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </slot>
        </div>
        <div class="flex-grow md:hidden"/>
        <div v-if="stroke" class="ml-3 bg-stroke h-full" style="width: 1px;"/>
    </div>
</template>

<script>
export default {
    props: {
        stroke: {type: Boolean, default: true}
    },
    emits: ['click']
}
</script>