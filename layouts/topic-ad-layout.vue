<script lang="ts" setup>
useHead({
    meta: [
        {
            name: 'theme-color',
            content: '#fff',
        },
        {
            name: 'msapplication-navbutton-color',
            content: '#fff',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: '#fff',
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#fff',
        },
    ],
})
</script>
<template>
    <div class="bg-white">
        <slot />
    </div>
</template>
