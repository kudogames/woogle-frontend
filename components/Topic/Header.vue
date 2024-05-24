<script lang="ts" setup>
const categoryData = [
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
    <div>
        <header class="h-57px w-full flex-center py-4px shadow-md">
            <div
                class="relative my0 h-50px max-w-1060px w-full flex items-center gap-20px px-20px lt-md-justify-center sm-gap-60px"
            >
                <div
                    class="i-svg-menu absolute left-30px h-40px w-40px color-gray-3 md-hidden hover:color-#ff931f"
                    @click="sidebarVisible = !sidebarVisible"
                ></div>
                <a href="/" class="h-full w-180px flex flex-shrink-0 items-center justify-center">
                    <div class="i-svg-logo2 h-full w-full"></div>
                </a>

                <div class="w-full lt-md-hidden">
                    <slot name="search"></slot>
                </div>
            </div>
        </header>
        <BaseSitebar v-model:visible="sidebarVisible" :nav-arr="categoryData" />
    </div>
</template>

<style scoped lang="scss"></style>
