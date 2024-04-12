<script lang="ts" setup>
const category = [
    {
        id: 1,
        name: 'Health',
        slug: 'health',
    },
    {
        id: 2,
        name: 'Career',
        slug: 'career',
    },
    {
        id: 3,
        name: 'Education',
        slug: 'education',
    },
    {
        id: 4,
        name: 'Housing',
        slug: 'housing',
    },
    {
        id: 5,
        name: 'Lifestyle',
        slug: 'lifestyle',
    },
    {
        id: 6,
        name: 'Fashion',
        slug: 'fashion',
    },
    {
        id: 7,
        name: 'Law',
        slug: 'law',
    },
    {
        id: 8,
        name: 'Game',
        slug: 'game',
    },
    {
        id: 9,
        name: 'TV Show',
        slug: 'tv-show',
    },
    {
        id: 10,
        name: 'Car',
        slug: 'car',
    },
]
const sidebarVisible = ref<boolean>(false)
</script>

<template>
    <header class="bg-color1 fixed left-0 top-0 z-100 h-70px w-full flex-center py-10px shadow-lg">
        <div class="my0 h-50px max-w-1400px w-full flex justify-between px-20px">
            <a href="/" class="h-full w40 flex items-center justify-center xs-w50">
                <div class="i-svg-logo h-full w-full"></div>
            </a>

            <div class="hidden flex-center gap-14px text-14px lg-flex xl-gap-40px xl-text-18px">
                <a
                    v-for="item in category"
                    :key="item.name"
                    :href="`/c/${item.slug}`"
                    class="color-color3 hover:color-color4"
                >
                    {{ item.name }}
                </a>
            </div>
            <div
                class="color-color2 i-svg-menu relative block h-50px w-50px lg-hidden"
                @click="sidebarVisible = !sidebarVisible"
            ></div>
        </div>
    </header>
    <BaseSitebar v-model:visible="sidebarVisible" :nav-arr="category" />
</template>

<style scoped lang="scss"></style>
