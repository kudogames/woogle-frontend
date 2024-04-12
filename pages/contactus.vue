<script lang="ts" setup>
import { simpleSiteUrl } from '@/constants/index'
</script>

<template>
    <div class="policy-container">
        <h1>Contact Us</h1>
        <p>IF you have any questions or inquiries, please contact us via support@{{ simpleSiteUrl }}</p>
    </div>
</template>

<style scoped lang="scss">
.policy-container {
    min-height: calc(100vh - 30px);
    padding: 70px 20px;
    background-color: #fff;
    word-wrap: break-word;
    h1 {
        color: #000;
        font-size: 30px;
        font-weight: bold;
        margin: 10px 0;
    }

    p {
        font-size: 1rem;
        color: #000;
    }
}
</style>
