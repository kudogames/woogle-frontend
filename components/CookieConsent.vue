<script lang="ts" setup>
const cookieBarVisible = ref(false)

const allowCookie = () => {
    setLocalStroageWithMaxAge<Boolean>('cookieconsent', true, 365 * 24 * 60 * 60)
    cookieBarVisible.value = false
}
onMounted(() => {
    cookieBarVisible.value = !getLoaclStroageWithMaxAge<Boolean>('cookieconsent')
})
</script>

<template>
    <div
        v-if="cookieBarVisible"
        class="fixed bottom-0 left-0 z-5000 w-full flex items-center flex-justify-between rd-t-[10px] bg-#fff px4 py2 line-height-[16px]"
    >
        <div class="mr2 text-[14px] color-[#000]">
            <span class="">This website uses cookies to ensure you get the best experience on our website. </span>
            <a
                class="color-color8 hover:color-color4 hover:underline-solid"
                aria-label="learn more about cookies"
                role="button"
                href="/privacy"
                target="_blank"
            >
                Learn more
            </a>
        </div>
        <div
            class="t-cookie-bar bg-color1 hover:bg-color8 cursor-pointer whitespace-nowrap b-transparent rd-[20px] px8 py-[0.8rem] line-height-[16px] color-#fff hover:color-white"
            @click="allowCookie"
        >
            Got it!
        </div>
    </div>
</template>

<style scoped lang="less"></style>
