<template>
    <div class="mx-auto max-w-1200px w-full">
        <!-- searchbar -->
        <slot name="searchBar" />
        <!-- title -->
        <slot name="title" />

        <!-- ad -->
        <slot name="Ad" />

        <slot name="relatedSearch" />
        <!-- <RelatedSearch :search-text="searchText" /> -->

        <!-- coupons -->
        <slot name="recommendCode" />
        <!-- <RecommendCode :coupons="recommendCoupons" :category="category" /> -->
    </div>
</template>
