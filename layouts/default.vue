<script lang="ts" setup>
useHead({
    meta: [
        {
            name: 'theme-color',
            content: '#f1f9ff',
        },
        {
            name: 'msapplication-navbutton-color',
            content: '#f1f9ff',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: '#f1f9ff',
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#f1f9ff',
        },
    ],
})
</script>

<template>
    <div class="bg-color2">
        <base-header />
        <slot />
        <base-footer />
        <back-top />
        <cookie-consent />
    </div>
</template>

<style scoped lang="scss"></style>
