<template>
    <div class="charity-app">
        <div class="fixed-header">
            <van-nav-bar title="联合喂养计划" />
            <div class="safety-bar">
                <van-icon name="checked" color="#e6a23c" size="14" />
                <span>正规备案 · 真实救助 · 微信支付</span>
            </div>
        </div>

        <div class="main-body">
            <div class="hero-card">
                <div class="floating-data-panel">
                    <div class="data-title">
                        <van-icon name="medal-o" color="#f2994a" /> 已认购粮食(kg)
                    </div>
                    <div class="data-value">7264.5<span class="kg">kg</span></div>
                    <div class="data-footer">
                        <span class="sub-text">累计参与 20359</span>
                        <span class="sub-text">剩余时间 5天 12:34</span>
                    </div>
                    <div class="hero-progress">
                        <van-progress
                            :percentage="60"
                            stroke-width="6"
                            color="#ee0a24"
                            pivot-text=""
                        />
                    </div>
                </div>
                <van-button class="cta-btn" round>支持一下></van-button>
            </div>

            <div class="list-section">
                <div v-for="(item, index) in projects" :key="index" class="p-card" @click="toDetailsPage">
                    <div class="p-header">
                        <div class="p-user">
                            <van-image round width="24" height="24" :src="item.avatar" />
                            <span class="p-name">{{ item.title }}</span>
                        </div>
                        <van-tag color="linear-gradient(to right, #f6be55, #fb4e51)" class="p-tag">进行中</van-tag>
                    </div>

                    <div class="p-fusion">
                        <div class="p-image-mask">
                            <img :src="item.cover" class="p-img" />
                        </div>
                        <div class="p-info">
                            <div class="p-stats">
                                筹集
                                <span class="num-highlight">{{ item.current }}kg</span>
                                <span class="dot">·</span>
                                <span class="target">目标 {{ item.ratio }}%</span>
                            </div>
                            <van-progress
                                :percentage="item.ratio"
                                stroke-width="6"
                                pivot-text=""
                                color="linear-gradient(90deg, #ff9e3d, #ff4d4f)"
                            />
                        </div>
                    </div>
                    <p class="p-desc">{{ item.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
defineOptions({ name: "Home" });
import { ref } from "vue";

const toDetailsPage = () => {
    router.push('/detail/1');
}

const projects = ref([
    {
        title: "凯哥支援流浪狗粮",
        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        cover: "http://cdn.ani999.com/2026/01/16/33c68856-1db3-4272-9b86-a8390b3a50ed",
        current: "5243",
        ratio: 65.5,
        desc: "寒冬已至，城市里的流浪狗缺失粮少水，希望大家一同伸出援手，共同守护这些毛孩子。",
    },
    {
        title: "刘春玲援助流浪猫粮",
        avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        cover: "http://cdn.ani999.com/2026/01/16/33c68856-1db3-4272-9b86-a8390b3a50ed",
        current: "3125",
        ratio: 48.9,
        desc: "寒冷的空气对于小猫咪们来说更加艰难，大家伸手援手。",
    },
]);
</script>



<style scoped>
.charity-app {
    background-color: #f7f8fa;
    font-family: sans-serif;
}

/* 1. 顶部固定布局 */
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #fff;
}
.safety-bar {
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #999;
    border-bottom: 0.5px solid #eee;
}
.main-body {
    padding: 92px 12px 60px;
}

/* 2. 看板卡片 */
.hero-card {
    height: 180px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    margin-bottom: 12px;
    background: url("https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg") no-repeat
        center center;
    background-size: cover;
}
.floating-data-panel {
    position: absolute;
    left: 12px;
    top: 12px;
    width: 170px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.data-title {
    font-size: 11px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 4px;
}
.data-value {
    font-size: 24px;
    font-weight: bold;
    color: #f2994a;
    margin: 4px 0;
}
.kg {
    font-size: 12px;
    font-weight: normal;
    margin-left: 2px;
}
.data-footer {
    font-size: 10px;
    color: #888;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 8px;
}
.cta-btn {
    position: absolute;
    right: 12px;
    bottom: 12px;
    background: linear-gradient(to right, #ff9e3d, #ff6034);
    border: none;
    height: 34px;
    color: #fff;
    box-shadow: 0 6px 16px rgba(255, 96, 52, 0.35);
}

/* 3. 列表样式 - 彻底修复红框问题 */
.p-card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
}

.p-header {
    display: flex;
    justify-content: space-between;
    align-items: center; /* 修复点：垂直居中 */
    margin-bottom: 12px;
}
.p-user {
    display: flex;
    align-items: center;
    gap: 8px;
} /* 修复点：头像与文字平齐 */
.p-name {
    font-size: 15px;
    font-weight: bold;
    color: #333;
}
.p-tag {
    padding: 2px 8px;
    border-radius: 4px;
    margin-right: 2px; /* 修复点：右侧留出边距，不贴红框边缘 */
}

/* 雾化区域 */
.p-fusion {
    display: flex;
    align-items: center;
    height: 64px;
    position: relative;
    overflow: hidden;
    background: #fff;
}
.p-image-mask {
    width: 60%;
    height: 100%;
    -webkit-mask-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 0) 90%
    );
}
.p-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    filter: brightness(0.95) contrast(1.05);
}
.p-info {
    flex: 1;
    margin-left: -15%;
    z-index: 2;
    padding-right: 4px;
}
.p-stats {
    font-size: 11px;
    color: #999;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
}
.num-highlight {
    color: #ff4d4f;
    font-weight: bold;
    font-size: 13px;
}
.dot {
    font-weight: bold;
}
.p-desc {
    font-size: 12px;
    color: #888;
    margin-top: 12px;
    line-height: 1.5;
}
</style>

