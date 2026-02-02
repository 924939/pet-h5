<template>
    <div class="points-page">
        <!-- 积分总览 -->
        <div class="points-header">
            <div class="points">{{ points }}</div>
            <div class="level">当前等级：{{ level.name }}</div>
            <div class="next">
                距离 {{ nextLevel.name }} 还差 {{ nextLevel.need }} 积分
            </div>
        </div>

        <!-- 行为说明 -->
        <div class="section">
            <div class="title">积分如何获得</div>
            <ul>
                <li>❤️ 每次支持 +5</li>
                <li>🔥 连续支持 +2 / 天</li>
                <li>📤 分享被访问 +3</li>
            </ul>
        </div>

        <!-- 明细入口 -->
        <div class="section clickable">查看积分记录 →</div>
    </div>
</template>

<script setup>
const points = 86;

const levels = [
    { name: "关爱者", min: 0 },
    { name: "守护者", min: 50 },
    { name: "喂养官", min: 150 },
    { name: "爱心大使", min: 300 },
];

const level = [...levels].reverse().find((l) => points >= l.min) || levels[0];

const nextLevel = levels.find((l) => l.min > points) || { name: "最高等级", need: 0 };

nextLevel.need = nextLevel.min ? nextLevel.min - points : 0;
</script>

<style scoped>
.points-page {
    background: #f6f2eb;
    min-height: 100vh;
    padding: 16px;
}

.points-header {
    background: linear-gradient(180deg, #ffb347, #ff8a00);
    border-radius: 20px;
    padding: 24px;
    color: #fff;
    text-align: center;
}

.points {
    font-size: 36px;
    font-weight: bold;
}

.level {
    margin-top: 6px;
    font-size: 15px;
}

.next {
    margin-top: 8px;
    font-size: 13px;
    opacity: 0.9;
}

.section {
    margin-top: 16px;
    background: #fff;
    border-radius: 16px;
    padding: 16px;
}

.title {
    font-weight: bold;
    margin-bottom: 8px;
}

ul {
    padding-left: 16px;
    font-size: 14px;
    color: #666;
}

.clickable {
    text-align: center;
    color: #ff8a00;
}
</style>
