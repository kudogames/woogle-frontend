<script setup lang="ts">
const { searchText } = defineProps({
    searchText: {
        type: String,
        default: '',
    },
})
</script>
<template>
    <div>
        <form action="/q" class="relative h-40px overflow-hidden b-2px border-color5 rd-40px focus:border-color5">
            <input
                :value="searchText"
                type="text"
                name="q"
                placeholder="Search and hit enter..."
                class="h-full w-full rd-40px pl-3 text-14px color-gray-5 outline-none hover:color-black"
            />
            <button aria-label="Search" type="submit" class="absolute right-6px top-0 cursor-pointer">
                <div class="i-svg-search h-36px w-36px"></div>
            </button>
        </form>
    </div>
</template>
