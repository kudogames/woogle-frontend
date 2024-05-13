<script lang="ts" setup>
useHead({
    meta: [
        {
            name: 'theme-color',
            content: '#000',
        },
        {
            name: 'msapplication-navbutton-color',
            content: '#000',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: '#000',
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
        },
    ],
})
</script>
<template>
    <div class="bg-#000 color-#cecece">
        <slot />
    </div>
</template>
