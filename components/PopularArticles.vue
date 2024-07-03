<script setup lang="ts">
withDefaults(
    defineProps<{
        articleList: Article[]
    }>(),
    {
        articleList: () => [],
    }
)
</script>

<template>
    <div class="flex flex-col gap-16px">
        <a
            v-for="(item, index) in articleList"
            :key="index"
            hover="shadow-md scale-102"
            class="group rd-lg transition-transform duration-300 ease"
            :href="`/article/${item.uid}`"
        >
            <div class="font-roboto-bold flex items-center gap-10px">
                <div class="w-80px">
                    <div class="relative overflow-hidden rd-lg pt-100%">
                        <img
                            v-lazy="item.coverImg"
                            class="absolute left-0 top-0 h-full w-full object-cover"
                            :alt="currentArticle?.title"
                        />
                        <div
                            class="absolute right-4px top-4px h-20px w-20px flex flex-center rd-20px bg-#e86187 text-14px color-white"
                        >
                            {{ index + 1 }}
                        </div>
                    </div>
                </div>
                <div class="line-clamp-3 w-[calc(100%-90px)] text-16px font-bold">
                    {{ item.title }}
                </div>
            </div>
        </a>
    </div>
</template>
