<template>
    <van-popup v-model:show="show" round position="bottom">
        <div class="popup">
            <!-- 基地真实认证 -->
            <div class="auth">
                <span class="auth-icon"></span>
                <span class="auth-text">基地真实认证</span>
            </div>

            <!-- 支持档位 -->
            <div class="support-list">
                <div
                    v-for="item in supportList"
                    :key="item.price"
                    class="support-item"
                    :class="{ active: store.current.price === item.price }"
                    @click="store.setSupport(item)"
                >
                    <div class="price">¥{{ item.price }}</div>
                    <div class="weight">{{ item.weight }}kg 粮食</div>
                </div>
            </div>

            <!-- 份数 -->
            <div class="count">
                <span @click="store.reduceCount">−</span>
                <span class="num">{{ store.count }}</span>
                <span @click="store.addCount">＋</span>
            </div>

            <!-- 合计 -->
            <div class="total">
                共 {{ store.totalWeight }}kg ｜ ¥{{ store.totalPrice }}
            </div>

            <!-- 协议 -->
            <div class="protocol">
                <input type="checkbox" checked />
                <span>同意《支持协议》</span>
            </div>

            <!-- 支持按钮 -->
            <van-button block type="danger" @click="store.submitSupport">
                支持一下
            </van-button>
        </div>
    </van-popup>
</template>

<script setup>
import { ref } from "vue";
import { useSupportStore } from "@/stores/support";

const store = useSupportStore();
const show = ref(true);

const supportList = [
    { price: 10, weight: 2 },
    { price: 20, weight: 5 },
    { price: 50, weight: 15 },
];
</script>

<style scoped>
.popup {
    padding: 16px;
}
.auth {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 12px;
}
.auth-icon {
    width: 12px;
    height: 12px;
    background: #2ecc71;
    border-radius: 50%;
    margin-right: 6px;
}
.support-list {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}
.support-item {
    flex: 1;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 8px 0;
    text-align: center;
}
.support-item.active {
    border-color: #ff5a5f;
    color: #ff5a5f;
}
.price {
    font-size: 16px;
    font-weight: bold;
}
.weight {
    font-size: 12px;
    color: #999;
}
.count {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 12px 0;
}
.count span {
    font-size: 18px;
}
.num {
    min-width: 24px;
    text-align: center;
}
.total {
    text-align: center;
    margin-bottom: 10px;
    color: #ff5a5f;
}
.protocol {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-bottom: 12px;
}
.protocol input {
    transform: scale(0.8);
    margin-right: 4px;
}
</style>
