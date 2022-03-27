export default {
    methods: {
        setSidebar(value){
            this.$store.state.globals.sidebar = value
        }
    },
    computed: {
        $sidebar(){
            return this.$store.state.globals.sidebar
        }
    }
}