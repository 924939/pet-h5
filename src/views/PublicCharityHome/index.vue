<template>
    <div class="public-home">
        <!-- 顶部公益身份 -->
        <div class="hero">
            <img class="avatar" :src="user.avatar" />
            <div class="name">{{ user.name }}</div>

            <div
                class="level-badge"
                :style="{
                    background: `linear-gradient(135deg, ${level.gradient[0]}, ${level.gradient[1]})`,
                }"
            >
                Lv{{ user.level }} · {{ level.title }}
            </div>

            <div class="slogan">今天也在为生命努力 🐾</div>
        </div>

        <!-- 公益能量 + 成就 -->
        <div class="card energy-card">
            <div class="energy-main">
                <div class="score">{{ user.score }}</div>
                <div class="unit">公益能量</div>
            </div>

            <div class="energy-sub">
                <div>
                    <b>{{ user.feedCount }}</b>
                    <span>次喂养</span>
                </div>
                <div>
                    <b>{{ user.days }}</b>
                    <span>坚持天数</span>
                </div>
            </div>
        </div>

        <!-- 成长等级 -->
        <div class="card">
            <div class="title">公益成长等级</div>

            <div class="progress-info">
                距离 Lv{{ user.level + 1 }} 还差 {{ nextNeed }} 能量
            </div>

            <div class="progress">
                <div class="bar" :style="{ width: percent + '%' }"></div>
            </div>
        </div>

        <!-- 公益记录 -->
        <div class="card">
            <div class="title">最近公益记录</div>

            <div class="timeline">
                <div class="item" v-for="(item, i) in records" :key="i">
                    <div class="dot"></div>
                    <div class="content">
                        <div class="text">{{ item.text }}</div>
                        <div class="time">{{ item.time }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部署名 -->
        <div class="footer">本公益主页由「联合喂养计划」生成</div>
    </div>
</template>

<script setup>
import { LEVEL_CONFIG } from "@/config/level.config";

const user = {
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    name: "公益喂养官",
    level: 3,
    score: 1280,
    feedCount: 12,
    days: 7,
};

const level = LEVEL_CONFIG.find((l) => l.level === user.level);

const levelMax = 2000;
const nextNeed = levelMax - user.score;
const percent = Math.min((user.score / levelMax) * 100, 100);

const records = [
    { text: "完成一次联合喂养计划", time: "今天 10:23" },
    { text: "签到获得公益能量 +10", time: "昨天" },
    { text: "首次参与流浪动物救助", time: "3 天前" },
];
</script>

<style scoped>
.public-home {
    background: #f7f7f7;
    padding: 16px;
}

/* 顶部 */
.hero {
    background: #fff;
    border-radius: 22px;
    padding: 24px 16px;
    text-align: center;
    margin-bottom: 16px;
}

.avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    margin-bottom: 10px;
}

.name {
    font-size: 17px;
    font-weight: 600;
}

.level-badge {
    display: inline-block;
    margin-top: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    color: #fff;
}

.slogan {
    margin-top: 10px;
    font-size: 13px;
    color: #888;
}

/* 卡片 */
.card {
    background: #fff;
    border-radius: 20px;
    padding: 18px 16px;
    margin-bottom: 16px;
}

/* 能量 */
.energy-card {
    text-align: center;
}

.energy-main .score {
    font-size: 36px;
    font-weight: 700;
    color: #ff8a00;
}

.energy-main .unit {
    font-size: 13px;
    color: #999;
}

.energy-sub {
    display: flex;
    justify-content: space-around;
    margin-top: 14px;
}

.energy-sub b {
    font-size: 18px;
    color: #333;
}

.energy-sub span {
    display: block;
    font-size: 12px;
    color: #999;
    margin-top: 4px;
}

/* 标题 */
.title {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
}

/* 进度 */
.progress-info {
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
}

.progress {
    height: 6px;
    background: #eee;
    border-radius: 999px;
    overflow: hidden;
}

.bar {
    height: 100%;
    background: linear-gradient(90deg, #ffb347, #ff8a00);
}

/* 时间线 */
.timeline .item {
    display: flex;
    margin-bottom: 14px;
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

/* 底部 */
.footer {
    text-align: center;
    font-size: 12px;
    color: #bbb;
    padding: 12px 0;
}
</style>
