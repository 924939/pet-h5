<template>
    <div class="detail-page" ref="pageRef" @scroll.passive="onScroll">
        <!-- 轮播 -->
        <van-swipe class="swipe" :autoplay="3000" indicator-color="#ff7a00">
            <van-swipe-item v-for="(img, i) in detail.images" :key="i">
                <img :src="img" class="swipe-img" />
            </van-swipe-item>
        </van-swipe>

        <!-- 基地信息 + 众筹进度 -->
        <div class="card">
            <div class="title-row">
                <div class="title">{{ detail.name }}</div>
                <div class="auth">
                    <van-icon name="passed" color="#07c160" />
                    已认证
                </div>
            </div>

            <div class="progress-info">
                <div class="money">
                    ¥{{ displayAmount }}
                    <span>/ ¥{{ detail.targetAmount }}</span>
                </div>
                <div class="percent">{{ progressPercent }}%</div>
            </div>

            <van-progress
                :percentage="progressPercent"
                stroke-width="8"
                color="#ff7a00"
                pivot-text=""
            />

            <div class="support-count">{{ totalSupportCount }} 人已支持</div>
        </div>

        <!-- 基地介绍 -->
        <div class="card">
            <div class="card-title">基地介绍</div>
            <div class="desc">{{ detail.desc }}</div>
        </div>

        <!-- 基地真实性认证 -->
        <div class="card">
            <div class="verify-header">
                <van-icon name="certificate" color="#07c160" />
                基地真实性认证
            </div>

            <div class="verify-row">
                <span>认证机构</span>
                <span>XX 市公益动物保护协会</span>
            </div>
            <div class="verify-row">
                <span>备案编号</span>
                <span>GY-2024-0821</span>
            </div>

            <div class="verify-tip">平台已对基地主体、救助能力进行人工审核</div>

            <div class="verify-link" @click="viewVerify">查看认证详情 →</div>
        </div>

        <!-- 支持记录 -->
        <div class="card">
            <div class="card-title">支持记录</div>

            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="loadMore"
            >
                <div v-for="(item, i) in supportList" :key="i" class="support-item">
                    <img :src="item.avatar" class="avatar" />
                    <div class="support-info">
                        <div class="support-top">
                            <span class="nickname">{{ item.nickname }}</span>
                            <span class="level">Lv{{ item.level }}</span>
                            <span class="amount">¥{{ item.amount }}</span>
                        </div>
                        <div class="comment">{{ item.comment }}</div>
                    </div>
                </div>
            </van-list>
        </div>

        <div class="van-safe-area-bottom"></div>

        <!-- 回到顶部 -->
        <div v-show="showBackTop" class="back-top" @click="backTop">
            <van-icon name="arrow-up" />
        </div>

        <!-- 底部按钮 -->
        <div class="bottom-bar">
            <van-button type="warning" round block @click="showPopup = true">
                支持一下
            </van-button>
        </div>

        <!-- 支持弹窗 -->
        <van-popup
            v-model:show="showPopup"
            position="bottom"
            :style="{ height: '60%' }"
            round
        >
            <div class="popup">
                <!-- 内容区 -->
                <div class="popup-content">
                    <div class="popup-title">支持基地</div>

                    <div class="points">
                        我的积分：<b>{{ userPoints }}</b>
                    </div>

                    <div
                        v-for="item in rewards"
                        :key="item.key"
                        class="reward"
                        :class="{ active: selectedKey === item.key }"
                        @click="selectReward(item)"
                    >
                        <div>
                            <div class="reward-price">{{ item.label }}</div>
                            <div class="reward-food">
                                ≈ {{ item.foodKg }}kg {{ item.foodType }}
                            </div>
                        </div>

                        <div class="count" @click.stop>
                            <van-icon
                                name="minus"
                                :class="{ disabled: item.count <= 1 }"
                                @click.stop="changeCount(item, -1)"
                            />
                            <span>{{ item.count }}</span>
                            <van-icon name="plus" @click.stop="changeCount(item, 1)" />
                        </div>
                    </div>

                    <van-field
                        v-model="comment"
                        type="textarea"
                        rows="2"
                        autosize
                        placeholder="说点鼓励的话（可选）"
                    />

                    <div class="agreement" ref="agreementRef">
                        <van-checkbox v-model="agree" checked-color="#fb976d">
                            我已阅读并同意
                            <span class="link">《公益支持协议》</span>
                        </van-checkbox>
                    </div>
                </div>

                <!-- 🌟 微信公益同款底部操作栏 -->
                <div class="donate-bar">
                    <div class="donate-info">
                        <div class="donate-label">合计支持</div>
                        <div class="donate-amount">
                            ¥<span>{{ totalAmount }}</span>
                        </div>
                    </div>

                    <van-button
                        class="donate-btn"
                        type="warning"
                        round
                        @click="submitSupport"
                    >
                        确认支持
                    </van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { useSupportStore } from "@/stores/support";

const router = useRouter();
const supportStore = useSupportStore();

/* 页面滚动 */
const pageRef = ref(null);
const showBackTop = ref(false);

const onScroll = () => {
    showBackTop.value = pageRef.value.scrollTop > 400;
};
const backTop = () => {
    pageRef.value.scrollTo({ top: 0, behavior: "smooth" });
};

/* 基地详情 */
const detail = ref({
    name: "流浪动物救助基地",
    targetAmount: 50000,
    currentAmount: 18600,
    desc: "基地长期致力于流浪动物的救助、治疗和领养。",
    images: ["https://picsum.photos/400/300?1", "https://picsum.photos/400/300?2"],
});

const displayAmount = ref(detail.value.currentAmount);
const progressPercent = computed(() =>
    Math.floor((displayAmount.value / detail.value.targetAmount) * 100)
);

/* 支持记录 */
const supportList = ref([]);
const loading = ref(false);
const finished = ref(false);
const totalSupportCount = ref(48);

const loadMore = () => {
    setTimeout(() => {
        supportList.value.push(
            ...new Array(10).fill(0).map(() => ({
                avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                nickname: "爱心用户",
                level: Math.ceil(Math.random() * 6),
                amount: [10, 20, 30][Math.floor(Math.random() * 3)],
                comment: "愿毛孩子都能被温柔以待",
            }))
        );
        loading.value = false;
        if (supportList.value.length >= totalSupportCount.value) {
            finished.value = true;
        }
    }, 600);
};

/* 弹窗 */
const showPopup = ref(false);
const comment = ref("");
const agree = ref(false);
const agreementRef = ref(null);

const userPoints = ref(320);

/* 直接使用 Pinia */
const rewards = computed(() => supportStore.rewards);
const selectedKey = computed(() => supportStore.selectedKey);
const totalAmount = computed(() => supportStore.totalAmount);

const selectReward = supportStore.selectReward;
const changeCount = supportStore.changeCount;

const submitSupport = () => {
    if (!agree.value) {
        showToast({
            message: "请先阅读并同意公益支持协议",
            duration: 2000,
        });

        agreementRef.value?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        return;
    }
    router.push("/project");
};

const viewVerify = () => {
    showToast("查看认证详情");
};

onMounted(loadMore);
</script>

<style scoped>
* {
    box-sizing: border-box;
}


.detail-page {
    height: 100vh;
    overflow-y: auto;
    background: #f7f8fa;
    padding-bottom: 72px;
}

/* 轮播 */
.swipe {
    height: 220px;
}
.swipe-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
}

/* 卡片 */
.card {
    background: #fff;
    margin: 10px 12px;
    padding: 12px;
    border-radius: 12px;
}

/* 标题 */
.title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title {
    font-size: 16px;
    font-weight: 600;
}
.auth {
    font-size: 12px;
    color: #07c160;
    display: flex;
    align-items: center;
    gap: 4px;
}

/* 进度 */
.progress-info {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
}
.money {
    font-weight: 600;
}
.money span {
    font-size: 12px;
    color: #999;
}
.percent {
    font-size: 12px;
    color: #ff7a00;
}
.support-count {
    font-size: 12px;
    color: #999;
    margin-top: 6px;
}

/* 认证 */
.verify-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
}
.verify-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-top: 6px;
}
.verify-tip {
    font-size: 12px;
    color: #999;
    margin-top: 6px;
}
.verify-link {
    font-size: 12px;
    color: #ff7a00;
    margin-top: 6px;
}

/* 介绍 */
.card-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
}
.desc {
    font-size: 13px;
    color: #555;
    line-height: 1.6;
}

/* 支持记录 */
.support-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}
.support-item:last-child {
    border-bottom: none;
}
.avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}
.support-info {
    flex: 1;
    margin-left: 10px;
}
.support-top {
    display: flex;
    gap: 6px;
    font-size: 12px;
}
.amount {
    margin-left: auto;
    color: #ff7a00;
}
.comment {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}

/* 底部 */
.bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 8px 12px;
    border-top: 1px solid #eee;
}

/* 回到顶部 */
.back-top {
    position: fixed;
    right: 16px;
    bottom: 100px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ff7a00;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup {
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* 内容滚动区 */
.popup-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    padding-bottom: 110px; /* 为底部操作栏预留空间 */
}

/* 底部公益操作栏 */
.donate-bar {
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
    /* background: #fff; */
    border-top: 1px solid #f2f2f2;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.04);
    z-index: 10;
}

/* 左侧金额信息 */
.donate-info {
    display: flex;
    flex-direction: column;
}

.donate-label {
    font-size: 12px;
    color: #999;
}

.donate-amount {
    font-size: 14px;
    color: #ff5a3c;
}

.donate-amount span {
    font-size: 20px;
    font-weight: bold;
}

/* 右侧按钮 */
.donate-btn {
    min-width: 120px;
    height: 40px;
}
.points {
    font-size: 13px;
    margin-bottom: 10px;
}
.reward {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 8px;
}
.reward.active {
    border-color: #ff7a00;
    background: #fff7e6;
}
.reward-price {
    font-weight: 600;
}
.reward-food {
    font-size: 12px;
    color: #999;
}
.count {
    display: flex;
    gap: 10px;
    align-items: center;
}
.count .disabled {
    opacity: 0.3;
}

/* 协议（缩小） */
.agreement {
    margin: 8px 0;
    font-size: 12px;
}
:deep(.van-checkbox__icon) {
    font-size: 14px;
}
:deep(.van-checkbox__label) {
    font-size: 12px;
}
.link {
    color: #ff7a00;
    font-size: 12px;
}

.total {
    text-align: right;
    margin-bottom: 10px;
}
</style>
