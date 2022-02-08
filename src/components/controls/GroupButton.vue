<template>
    <div class=" w-max border border-stroke rounded-md flex md:h-10" style="gap: 1px;">
        <template v-if="label.trim().length>0">
            <div class=" flex px-2 items-center">
                <p class="text-sm select-none">{{label}}</p>
            </div>
            <div class=" bg-stroke" style="width: 1px"/>
        </template>
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        label: {type: String, default: "Group"},
    }
}
</script>