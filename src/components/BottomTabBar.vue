<template>
    <van-tabbar
        :model-value="active"
        @change="onChange"
        active-color="#ee0a24"
        class="bottom-tab"
        safe-area-inset-bottom
        placeholder
    >
        <van-tabbar-item
            v-for="tab in tabs"
            :key="tab.name"
            :name="tab.name"
            :icon="tab.icon"
        >
            {{ tab.label }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
    },
});

const router = useRouter();
const route = useRoute();

/**
 * 当前高亮 tab（由路由决定）
 */
const active = computed(() => {
    const tab = props.tabs.find(
        (t) => route.path === t.path || route.path.startsWith(t.path + "/")
    );
    return tab?.name;
});

/**
 * 点击 tab → 跳路由
 */
const onChange = (name) => {
    const tab = props.tabs.find((t) => t.name === name);
    if (tab) {
        router.push(tab.path);
    }
};
</script>
<style scoped>

</style>
