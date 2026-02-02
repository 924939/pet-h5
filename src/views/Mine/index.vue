<template>
    <div class="xr-my">
        <!-- 用户信息 -->
        <div class="xr-user">
            <img class="avatar" :src="user.avatar" />
            <div class="meta">
                <div class="name">
                    {{ user.name }}
                    <div
                        class="level-badge"
                        :style="{
                            background: `linear-gradient(135deg, ${currentLevel.gradient[0]}, ${currentLevel.gradient[1]})`,
                        }"
                    >
                        Lv{{ user.level }} · {{ currentLevel.title }}
                    </div>
                </div>
                <div class="sign">今天也在为生命努力 🐾</div>
            </div>
        </div>

        <!-- 公益能量 -->
        <div class="xr-card energy-card" @click="goPublicHome">
            <div class="energy-header">
                <div>
                    <div class="label">公益能量</div>
                    <div class="energy">
                        {{ user.score }}
                        <span>点</span>
                    </div>
                </div>
                <div class="arrow">›</div>
            </div>

            <div class="progress">
                <div class="bar" :style="{ width: percent + '%' }"></div>
            </div>

            <div class="progress-text">距离 <b>生命守护者</b> 还差 {{ nextNeed }} 点</div>

            <div class="achievement">
                <span>{{ user.feedCount }} 次喂养</span>
                <span>{{ user.score }} 累计能量</span>
            </div>
        </div>

        <!-- 最近公益记录 -->
        <div class="xr-card">
            <div class="title">最近公益记录</div>
            <div class="feed-item" v-for="(item, i) in feeds" :key="i">
                <div class="dot"></div>
                <div>
                    <div class="text">{{ item.text }}</div>
                    <div class="time">{{ item.time }}</div>
                </div>
            </div>
        </div>

        <!-- 底部功能 -->
        <div class="xr-card menu">
            <div class="menu-item">📱 绑定手机号</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { LEVEL_CONFIG } from "@/config/level.config";

const router = useRouter();

/* 用户数据（后期可接接口） */
const user = {
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    name: "公益喂养官",
    level: 3,
    score: 1280,
    feedCount: 12,
};

const currentLevel = LEVEL_CONFIG.find((l) => l.level === user.level) || LEVEL_CONFIG[0];

const levelMax = 2000;
const percent = Math.min((user.score / levelMax) * 100, 100);
const nextNeed = Math.max(levelMax - user.score, 0);

/* 最近记录 */
const feeds = [
    { text: "完成一次联合喂养计划", time: "今天 10:23" },
    { text: "签到获得公益能量 +10", time: "昨天" },
    { text: "首次参与流浪动物救助", time: "3 天前" },
];

/* 跳转公益主页 */
const goPublicHome = () => {
    router.push("/public-home");
};
</script>

<style scoped>
/* —— 你原样式，完全未动 —— */
.xr-my {
    background: #f7f7f7;
    padding: 16px;
}

/* 用户 */
.xr-user {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #fff;
    border-radius: 18px;
    margin-bottom: 14px;
}

.avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
}

.meta {
    margin-left: 12px;
}

.name {
    font-size: 16px;
    font-weight: 600;
}

.sign {
    font-size: 13px;
    color: #888;
    margin-top: 6px;
}

/* 卡片 */
.xr-card {
    background: #fff;
    border-radius: 18px;
    padding: 14px;
    margin-bottom: 16px;
}

/* 能量卡 */
.energy-card {
    background: linear-gradient(135deg, #fff7ec, #ffe6c9);
}

.energy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label {
    font-size: 12px;
    color: #999;
}

.energy {
    font-size: 24px;
    font-weight: 700;
    color: #ff8a00;
}

.energy span {
    font-size: 13px;
    margin-left: 4px;
}

.arrow {
    font-size: 24px;
    color: #d38b00;
}

.progress {
    height: 5px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 999px;
    margin: 10px 0 6px;
    overflow: hidden;
}

.bar {
    height: 100%;
    background: linear-gradient(90deg, #ffb347, #ff8a00);
}

.progress-text {
    font-size: 12px;
    color: #8a5a00;
}

/* 成就 */
.achievement {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #a05a00;
    margin-top: 10px;
}

/* 记录 */
.title {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
}

.feed-item {
    display: flex;
    margin-bottom: 12px;
}

.dot {
    width: 6px;
    height: 6px;
    background: #ff8a00;
    border-radius: 50%;
    margin-top: 6px;
    margin-right: 12px;
}

.text {
    font-size: 14px;
}

.time {
    font-size: 12px;
    color: #aaa;
    margin-top: 4px;
}

/* 菜单 */
.menu {
    padding: 8px 16px;
}

.menu-item {
    padding: 14px 0;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
}

.level-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    color: #fff;
    font-size: 12px;
}
</style>
