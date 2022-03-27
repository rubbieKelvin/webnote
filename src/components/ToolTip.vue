<template>
    <div ref="tooltip" class=" relative">
        <slot/>
        <div
            v-if="true"
            :class="[
                (visible) ? '' : 'w-0 h-0 overflow-clip'
            ]"
            class="absolute z-10 transition-all duration-200 left-[-25%]">
            <slot name="body">
                <div class="bg-slate-800 p-1 mt-2 rounded-md text-white">
                    <p class=" text-sm font-semibold w-max">{{text}}</p>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        timer: null,
        visible: false
    }),
    props: {
        delay: {
            type: Number,
            default: 1000
        },
        text: {
            type: String,
            default: "Text"
        }
    },
    mounted(){
        const tooltip = this.$refs.tooltip
        const self = this
        this._evl_mouseenter = function(e){
            const delay = self.delay
            this.timer = window.setTimeout(()=>{
                this.visible = true
            }, delay)
        }

        this._evl_mouseleave = function(e){
            window.clearTimeout(this.timer)
            this.timer = null
            this.visible = false
        }

        tooltip.addEventListener('mouseenter', this._evl_mouseenter.bind(this))
        tooltip.addEventListener('mouseleave', this._evl_mouseleave.bind(this))
    },
    beforeUnmount(){
        const tooltip = this.$refs.tooltip
        tooltip.removeEventListener('mouseenter', this._evl_mouseenter)
        tooltip.removeEventListener('mouseleave', this._evl_mouseleave)
    }
}
</script>