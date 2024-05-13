<script lang="ts" setup>
useHead({
    meta: [
        {
            name: 'theme-color',
            content: '#01074B',
        },
        {
            name: 'msapplication-navbutton-color',
            content: '#01074B',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: '#01074B',
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#01074B',
        },
    ],
})
</script>
<template>
    <div class="bg-#00EBFF pt-4px">
        <div class="bg-#01074B color-#fff">
            <slot />
        </div>
    </div>
</template>
