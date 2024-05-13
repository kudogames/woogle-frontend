<script setup lang="ts">
const { searchText } = defineProps({
    searchText: {
        type: String,
        default: '',
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
    <form
        action="/q"
        class="h-40px flex justify-between overflow-hidden b-2px border-color5 bg-white focus:border-color5"
        @submit="handleSubmit"
    >
        <input
            v-model.trim="newSearchText"
            type="text"
            name="q"
            placeholder="Search and hit enter..."
            class="h-full w-full pl-3 text-14px color-gray-5 outline-none hover:color-black"
        />

        <button aria-label="Search" type="submit" class="relative h-full w-46px flex-shrink-0 cursor-pointer">
            <div class="absolute top-0 h-36px w-36px">
                <div class="i-svg-search h-full w-full"></div>
            </div>
        </button>
    </form>
</template>
