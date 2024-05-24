<script lang="ts" setup></script>

<template>
    <header class="h-60px w-full flex-center py-4px">
        <div class="my0 h-50px max-w-1200px w-full flex items-center justify-between gap-20px px-10px sm-gap-60px">
            <div class="h-full w-200px">
                <a href="/" class="h-full w-full flex flex-shrink-0 items-center justify-center">
                    <div class="i-svg-logo h-full w-full"></div>
                </a>
            </div>

            <slot name="search"></slot>
        </div>
    </header>
</template>

<style scoped lang="scss"></style>
