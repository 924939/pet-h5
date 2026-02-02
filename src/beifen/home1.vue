<template>
    <div class="charity-app">
        <div class="fixed-header">
            <van-nav-bar title="联合喂养计划" fixed placeholder />
            <div class="safety-bar">
                <van-icon name="shield-check" color="#07c160" size="14" />
                <span>正规备案 · 真实救助 · 微信支付</span>
            </div>
        </div>

        <div class="main-body">
            <div class="hero-card">
                <div class="hero-overlay">
                    <div class="hero-badge"><van-icon name="fire" /> 热门计划</div>
                    <div class="hero-val-box">
                        <span class="hero-num">7264.5</span>
                        <span class="hero-unit">kg</span>
                    </div>
                    <div class="hero-sub">累计参与 20359 人</div>
                    <div class="hero-timer">
                        <van-icon name="clock-o" /> 剩余 5天 12:34
                    </div>
                </div>
                <van-button class="hero-btn" round>支持一下</van-button>
            </div>

            <div class="list-container">
                <div
                    v-for="(item, index) in projects"
                    :key="index"
                    class="p-item-card"
                    @click="toDetailsPage"
                >
                    <div class="p-card-header">
                        <div class="p-user-info">
                            <van-image round width="24" height="24" :src="item.avatar" />
                            <span class="p-user-name">{{ item.title }}</span>
                        </div>
                        <van-tag type="primary" plain color="#ee0a24">进行中</van-tag>
                    </div>

                    <div class="p-card-content">
                        <div class="p-content-left">
                            <van-image
                                fit="cover"
                                radius="8px"
                                width="100%"
                                height="90px"
                                :src="item.cover"
                            />
                        </div>
                        <div class="p-content-right">
                            <div class="p-data-label">已筹集粮食</div>
                            <div class="p-data-value">
                                <span class="p-num">{{ item.current }}</span>
                                <span class="p-unit">kg</span>
                            </div>
                            <div class="p-progress-box">
                                <div class="p-percent-tag">{{ item.ratio }}%</div>
                                <van-progress
                                    :percentage="item.ratio"
                                    stroke-width="8"
                                    pivot-text=""
                                    color="linear-gradient(to right, #ffd01e, #ee0a24)"
                                    class="flowing-progress"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="p-card-footer">
                        <p class="p-desc-text">{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const toDetailsPage = () => {
    console.log("跳转详情页");
};

const projects = ref([
    {
        title: "凯哥支援流浪狗粮",
        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        cover: "http://cdn.ani999.com/2026/01/16/33c68856-1db3-4272-9b86-a8390b3a50ed",
        current: "5243",
        ratio: 65.5,
        desc:
            "寒冬已至，城市里的流浪狗缺失粮少水，希望大家一同伸出援手，共同守护这些毛孩子。",
    },
    {
        title: "刘春玲援助流浪猫粮",
        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        cover: "http://cdn.ani999.com/2026/01/16/33c68856-1db3-4272-9b86-a8390b3a50ed",
        current: "3125",
        ratio: 48.9,
        desc: "寒冷的空气对于小猫咪们来说更加艰难，大家伸手援手，给它们一个温暖的冬天。",
    },
]);
</script>

<style scoped>
/* 基础背景 */
.charity-app {
    background-color: #f7f8fa;
    min-height: 100vh;
}

/* 导航与安全条 */
.safety-bar {
    height: 32px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #969799;
    border-bottom: 1px solid #ebedf0;
}

.main-body {
    padding: 12px;
}

/* 顶部 Banner 优化 */
.hero-card {
    height: 160px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
        url("https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg") center/cover;
    margin-bottom: 16px;
}
.hero-overlay {
    padding: 16px;
    color: #fff;
}
.hero-badge {
    font-size: 10px;
    background: rgba(238, 10, 36, 0.8);
    width: fit-content;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
}
.hero-num {
    font-size: 32px;
    font-weight: bold;
}
.hero-unit {
    font-size: 14px;
    margin-left: 4px;
}
.hero-sub {
    font-size: 12px;
    opacity: 0.9;
    margin: 4px 0;
}
.hero-timer {
    font-size: 11px;
    opacity: 0.8;
}
.hero-btn {
    position: absolute;
    right: 16px;
    bottom: 16px;
    background: #ee0a24;
    border: none;
    color: #fff;
    height: 32px;
}

/* 项目卡片布局 */
.p-item-card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 14px;
    box-shadow: 0 2px 12px rgba(100, 101, 105, 0.05);
}

.p-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.p-user-info {
    display: flex;
    align-items: center;
    gap: 8px;
}
.p-user-name {
    font-size: 15px;
    font-weight: bold;
    color: #323233;
}

/* 核心内容区：左右布局 */
.p-card-content {
    display: flex;
    gap: 12px;
    align-items: center;
}
.p-content-left {
    width: 120px;
    flex-shrink: 0;
}
.p-content-right {
    flex: 1;
}

.p-data-label {
    font-size: 12px;
    color: #969799;
    margin-bottom: 4px;
}
.p-data-value {
    margin-bottom: 8px;
}
.p-num {
    font-size: 24px;
    font-weight: 800;
    color: #ee0a24;
    font-family: "DIN Alternate", "Helvetica Neue", sans-serif;
}
.p-unit {
    font-size: 12px;
    color: #ee0a24;
    margin-left: 2px;
    font-weight: bold;
}

/* 进度条样式 */
.p-progress-box {
    position: relative;
    padding-top: 14px;
}
.p-percent-tag {
    position: absolute;
    right: 0;
    top: -4px;
    font-size: 12px;
    font-weight: bold;
    color: #ee0a24;
}

/* 进度条流动特效 */
.flowing-progress :deep(.van-progress__portion)::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    animation: progress-flow 2s infinite linear;
}

@keyframes progress-flow {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(100%);
    }
}

/* 底部描述 */
.p-card-footer {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f2f3f5;
}
.p-desc-text {
    font-size: 13px;
    color: #646566;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
