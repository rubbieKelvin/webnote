<template>
    <div class="px-2 py-1 md:mx-0 mx-5 rounded-md md:rounded-none bg-accent bg-opacity-10 text-accent text-sm">
        <p class="text">Search results for "<b>{{$store.state.searchFilter.trim()}}</b>"</p>
    </div>
</template>

<script>
export default {
    props: {
        searchTag: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.text{
    word-break: break-all;
}
</style>