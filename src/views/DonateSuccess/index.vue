<template>
    <div class="donate-success">
        <!-- 顶部情绪确认 -->
        <div class="header">
            <div class="heart">❤️</div>
            <h1>感谢你的善意</h1>
            <p class="subtitle">{{ emotionText }}</p>
        </div>

        <!-- 行为成果 -->
        <div class="card result">
            <h2>你刚刚完成了一次喂养</h2>

            <div class="result-main">
                <span class="icon">🥣</span>
                <div class="text">
                    <div class="value">{{ foodCount }} 袋流浪{{ animalType }}粮</div>
                    <div class="desc">
                        可供 {{ animalCount }} 只{{ animalType }}食用 {{ days }} 天
                    </div>
                </div>
            </div>

            <div class="thanks">
                “今天不用挨饿了。”
                <span class="from">—— 来自某只流浪{{ animalType }}</span>
            </div>
        </div>

        <!-- 项目进度 -->
        <div class="card progress">
            <div class="progress-header">
                <span>项目完成进度</span>
                <span class="percent">{{ displayProgress.toFixed(1) }}%</span>
            </div>

            <div class="progress-bar">
                <div
                    class="progress-inner"
                    :style="{ width: displayProgress + '%' }"
                ></div>
            </div>

            <div class="progress-tip">✨ 因为你，进度向前推进了一小步</div>
        </div>

        <!-- 行动引导 -->
        <div class="actions">
            <button class="btn primary" @click="onContinue">🥣 再喂饱一只 TA</button>
            <button class="btn ghost" @click="onShare">❤️ 让更多 TA 吃饱</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

/**
 * ===== 模拟支持数据（真实项目里由支付结果返回）=====
 */
const amount = 20; // 支持金额
const foodCount = 1;
const animalType = "猫";
const animalCount = 3;
const days = 2;

/**
 * ===== 情绪文案等级 =====
 */
const emotionTextMap = {
    small: "你的一点点，刚好是 TA 今天的全部",
    medium: "今天，TA 能安心吃饱一整天了",
    large: "你几乎改变了 TA 接下来的一周生活",
};

const emotionLevel = computed(() => {
    if (amount < 20) return "small";
    if (amount < 50) return "medium";
    return "large";
});

const emotionText = computed(() => emotionTextMap[emotionLevel.value]);

/**
 * ===== 进度动画 =====
 */
const oldProgress = 62;
const newProgress = 66.3;
const displayProgress = ref(oldProgress);

onMounted(() => {
    const step = (newProgress - oldProgress) / 30;
    let current = oldProgress;

    const timer = setInterval(() => {
        current += step;
        if (current >= newProgress) {
            current = newProgress;
            clearInterval(timer);
        }
        displayProgress.value = current;
    }, 20);
});

/**
 * ===== 行为 =====
 */
const onContinue = () => {
    window.location.href = "/";
};

const onShare = () => {
    router.push('/share')
}
</script>

<style scoped>
.donate-success {
    box-sizing: border-box;
    background: linear-gradient(180deg, #fff7ec, #ffffff);
    padding: 20px 16px 32px;
    font-family: -apple-system, BlinkMacSystemFont;
    overflow: hidden;
}

/* 顶部 */
.header {
    text-align: center;
}
.heart {
    font-size: 36px;
    animation: pulse 1.6s infinite;
}
.header h1 {
    font-size: 22px;
    margin: 8px 0 4px;
}
.subtitle {
    font-size: 14px;
    color: #666;
}

/* 卡片 */
.card {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    margin-top: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

/* 成果 */
.result-main {
    display: flex;
    align-items: center;
}
.icon {
    font-size: 32px;
    margin-right: 12px;
}
.value {
    font-size: 18px;
    font-weight: 600;
    color: #ff8a00;
}
.desc {
    font-size: 13px;
    color: #666;
}
.thanks {
    margin-top: 14px;
    font-size: 13px;
    color: #999;
    font-style: italic;
}
.from {
    display: block;
    text-align: right;
    margin-top: 4px;
}

/* 进度 */
.progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
}
.percent {
    color: #ff8a00;
    font-weight: 600;
}
.progress-bar {
    height: 10px;
    background: #f1f1f1;
    border-radius: 6px;
    overflow: hidden;
    margin-top: 8px;
}
.progress-inner {
    height: 100%;
    background: linear-gradient(90deg, #ffb347, #ff8a00);
    transition: width 0.3s ease;
}
.progress-tip {
    font-size: 12px;
    color: #777;
    margin-top: 8px;
}

/* 按钮 */
.actions {
    margin-top: 24px;
}
.btn {
    width: 100%;
    height: 46px;
    border-radius: 24px;
    font-size: 15px;
    border: none;
}
.primary {
    background: linear-gradient(90deg, #ffb347, #ff8a00);
    color: #fff;
    box-shadow: 0 6px 14px rgba(255, 138, 0, 0.3);
}
.ghost {
    background: transparent;
    color: #ff8a00;
    margin-top: 12px;
}

/* 动画 */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
    }
}
</style>
