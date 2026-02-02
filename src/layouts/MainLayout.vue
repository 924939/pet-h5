<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
            <component :is="Component" />
        </keep-alive>
    </router-view>

    <BottomTabBar v-if="showTab" :tabs="tabs" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import BottomTabBar from "@/components/BottomTabBar.vue";

const route = useRoute();

const tabs = [
    { name: "home", label: "首页", icon: "home-o", path: "/" },
    { name: "discover", label: "发现", icon: "like-o", path: "/discover" },
    { name: "points", label: "求助", icon: "points", path: "/points" },
    { name: "user", label: "我的", icon: "user-o", path: "/mine" },
];

/**
 * 是否显示 TabBar
 */
const showTab = computed(() => route.meta.showTab !== false);

/**
 * keep-alive 白名单
 */
const cachedViews = computed(() =>
    route.matched.filter((r) => r.meta.keepAlive).map((r) => r.components?.default?.name)
);
</script>
