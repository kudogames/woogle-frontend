<script setup lang="ts">
const { searchText } = defineProps({
    searchText: {
        type: String,
        default: '',
    },
    inputClass: {
        type: String,
        default: '',
    },
    buttonClass: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: 'Search and hit enter...',
    },
    svg: {
        type: String,
        default: 'i-svg-search ',
    },
})

const newSearchText = ref(searchText)

const handleSubmit = (e: Event) => {
    if (!newSearchText.value) {
        e.preventDefault()
    }
}
</script>
<template>
    <form action="/q" class="h-36px flex justify-between overflow-hidden b-1px" @submit="handleSubmit">
        <input
            v-model.trim="newSearchText"
            type="text"
            name="q"
            :placeholder="placeholder"
            class="h-full w-full bg-inherit pl-3 text-14px color-gray-5 outline-none hover:color-black"
            :class="inputClass"
        />

        <button
            aria-label="Search"
            type="submit"
            class="relative h-full w-46px flex flex-center flex-shrink-0 cursor-pointer"
            :class="buttonClass"
        >
            <div class="absolute top-0 h-30px w-30px">
                <div :class="svg" class="h-full w-full"></div>
            </div>
        </button>
    </form>
</template>
