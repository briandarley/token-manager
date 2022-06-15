<template>
    <div>
        {{__name__}}
    </div>
</template>
<script>
    export default {
        dependencies: [],
        setup() {},
        created(){},
        mounted() {},
        data() {
            return {
                index: 0
            }
        },
        methods: {

        },
        watch: {
            index() {
                console.log(this.index);
            }
        }

    }
</script>
<style lang="scss">
</style>