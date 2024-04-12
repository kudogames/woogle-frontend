<template>
    <div class="mx-auto max-w-1200px w-full">
        <!-- searchbar -->
        <slot name="searchBar" />
        <!-- title -->
        <slot name="title" />

        <!-- related coupons and related searches -->
        <div class="w-full flex flex-col sm-flex-row">
            <!-- left -->
            <slot name="relatedSearch" />
            <!-- right -->
            <div class="w-full sm-w-300px">
                <!-- code -->
                <div class="hidden w-full sm-block">
                    <h1 class="pl-14px pt-20px text-15px">Related Code</h1>
                    <slot name="relatedCode" />
                </div>
                <!-- ad -->
                <slot name="Ad" />
            </div>
        </div>
        <!-- coupons -->
        <slot name="recommendCode" />
    </div>
</template>
