<template>
    <a class="code-link relative my-2 ms-4  pl-2 block rounded border-none text-left text-blue hover:bg-blue hover:text-white sameline"
        @click="Code_changesort">
        <div class="text-[.7rem] font-medium text-grey-600/50">{{ sort }} <span class="font-bold text-white">{{ comment }}
            </span>
        </div>
    </a>
</template>
<script>

export default {
    name: "CodeCard",
    props: ["type", "sort", "comment"],
    data() {
        return {
        };
    },
    methods: {
        Code_changesort() {
            this.$nextTick(() => {
                this.$parent.$parent.$emit('changesort', this.type)
            });
        }
    }
};
</script>
<style>
.sameline {
    display: inline-block !important;
}
</style>
<style scoped>
a {
    cursor: pointer;
}
</style>
