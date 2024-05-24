<script setup lang="ts">
interface PolicyData {
    title: string
    path: string
}

const policyData: PolicyData[] = [
    {
        title: 'contactus',
        path: '/contactus',
    },
    {
        title: 'privacy',
        path: '/privacy',
    },
    {
        title: 'legal terms',
        path: '/legalterms',
    },
]
</script>
<template>
    <footer class="w-full flex-center flex-col py-20px text-13px font-exo color-#AAAAAA">
        <div>© 2023 Idea Info</div>
        <div class="flex gap-4">
            <a v-for="item in policyData" :key="item.title" :href="item.path" class="hover-decoration-underline">
                {{ item.title }}
            </a>
        </div>
    </footer>
</template>
