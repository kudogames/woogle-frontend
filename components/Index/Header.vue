<script lang="ts" setup>
const category = [
    {
        id: 1,
        name: 'Vehicle Donation',
        slug: 'vehicle-donation',
    },
    {
        id: 2,
        name: 'Vehicle plans',
        slug: 'vehicle-plans',
    },
    {
        id: 3,
        name: 'Motor Vehicles',
        slug: 'motor-vehicles',
    },
    {
        id: 4,
        name: 'Repair',
        slug: 'repair',
    },
]
const sidebarVisible = ref<boolean>(false)
</script>

<template>
    <header class="fixed left-0 top-0 z-100 h-50px w-full flex-center bg-#193774 py-10px shadow-lg">
        <div class="my0 h-50px max-w-1200px w-full flex items-center justify-between px-20px">
            <a href="/" class="h-full w-160px flex items-center justify-center">
                <div class="i-svg-logo h-full w-full"></div>
            </a>

            <div class="hidden flex-center gap-14px text-14px lg-flex xl-gap-40px xl-text-18px">
                <a
                    v-for="item in category"
                    :key="item.name"
                    :href="`/c/${item.slug}`"
                    class="color-#fff hover:color-#ffd751"
                >
                    {{ item.name }}
                </a>
            </div>
            <div
                class="i-svg-menu relative block h-40px w-40px color-color2 lg-hidden"
                @click="sidebarVisible = !sidebarVisible"
            ></div>
        </div>
    </header>
    <BaseSitebar v-model:visible="sidebarVisible" :nav-arr="category" />
</template>

<style scoped lang="scss"></style>
