<template>
    <div class="my-page">
        <!-- 用户信息卡 -->
        <div class="user-card">
            <img class="avatar" :src="user.avatar" />
            <div class="user-info">
                <div class="name">{{ user.name }}</div>
                <div class="phone" :class="{ unbind: !user.phone }">
                    {{ user.phone ? user.phone : "未绑定手机号" }}
                </div>
            </div>

            <div class="score">
                <div class="num">{{ user.score }}</div>
                <div class="label">积分</div>
            </div>
        </div>

        <!-- 功能区 -->
        <div class="action-card">
            <div class="action-item" @click="goScore">
                <span>我的积分</span>
                <i>›</i>
            </div>
            <div class="action-item" @click="goScoreRecord">
                <span>积分记录</span>
                <i>›</i>
            </div>
            <div class="action-item" @click="bindPhone">
                <span>绑定手机号</span>
                <i>›</i>
            </div>
            <div class="action-item">
                <span>我的公益记录</span>
                <i>›</i>
            </div>
        </div>

        <!-- 公益数据 -->
        <div class="data-card">
            <div class="data-item">
                <div class="num">12</div>
                <div class="label">累计喂养</div>
            </div>
            <div class="line"></div>
            <div class="data-item">
                <div class="num">3</div>
                <div class="label">参与项目</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const user = {
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    name: "公益小天使",
    phone: "",
    score: 1280,
};

const goScore = () => {};
const goScoreRecord = () => {};
const bindPhone = () => {};
</script>

<style scoped>
.my-page {
    min-height: 100vh;
    background: #f6f2eb;
    padding: 16px;
}

/* 用户卡片 */
.user-card {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
}

.user-info {
    flex: 1;
    margin-left: 12px;
}

.name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
}

.phone {
    font-size: 13px;
    color: #999;
    margin-top: 4px;
}

.phone.unbind {
    color: #ff8a00;
}

.score {
    text-align: right;
}

.score .num {
    font-size: 20px;
    font-weight: bold;
    color: #ff8a00;
}

.score .label {
    font-size: 12px;
    color: #999;
}

/* 功能卡 */
.action-card {
    margin-top: 14px;
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
}

.action-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    font-size: 15px;
    color: #333;
    border-bottom: 1px solid #f2f2f2;
}

.action-item:last-child {
    border-bottom: none;
}

.action-item i {
    color: #ccc;
    font-style: normal;
}

/* 数据卡 */
.data-card {
    margin-top: 14px;
    background: #fff;
    border-radius: 18px;
    padding: 16px 0;
    display: flex;
    align-items: center;
}

.data-item {
    flex: 1;
    text-align: center;
}

.data-item .num {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.data-item .label {
    margin-top: 6px;
    font-size: 12px;
    color: #999;
}

.line {
    width: 1px;
    height: 36px;
    background: #eee;
}
</style>
