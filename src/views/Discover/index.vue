<template>
    <div
        class="charity-page"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
    >
        <div class="card-track" :style="trackStyle">
            <div
                v-for="(item, index) in list"
                :key="item.id"
                class="card-item"
                :style="getItemStyle(index)"
            >
                <div class="card-content">
                    <div class="note-box">
                        <div class="red-dot"></div>
                        <h3 class="title">{{ item.title }}</h3>
                        <p class="desc">{{ item.desc }}</p>
                        <div class="link">故事 ></div>
                    </div>
                    <div class="image-box">
                        <img :src="item.image" />
                    </div>
                    <div class="beneficiary-info">
                        <div class="name">{{ item.name }}</div>
                        <div class="tag">{{ item.tag }}</div>
                    </div>
                    <div class="action-bar">
                        <van-button round block type="danger" color="#ff2d55"
                            >捐一笔，做好事</van-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const TABBAR_HEIGHT = 50;
const PAGE_HEIGHT = window.innerHeight - TABBAR_HEIGHT;
const CARD_HEIGHT = PAGE_HEIGHT * 0.78;
const CARD_GAP = 12;
const STEP = CARD_HEIGHT + CARD_GAP;
const CENTER_PADDING = (PAGE_HEIGHT - CARD_HEIGHT) / 2;

const list = ref([
    {
        id: 1,
        title: "公益让我重生",
        desc: "他在火海中救出了13人...",
        image: "https://picsum.photos/600/400?random=1",
        name: "殷建行",
        tag: "《致敬行善者》",
    },
    {
        id: 2,
        title: "陪伴：关怀老人",
        desc: "为留守老人提供生活护理与陪伴...",
        image: "https://picsum.photos/600/400?random=2",
        name: "张大爷",
        tag: "数字化认证",
    },
    {
        id: 3,
        title: "困境儿童救助",
        desc: "我也想拥有一个快乐的童年...",
        image: "https://picsum.photos/600/400?random=3",
        name: "小花",
        tag: "专业救助",
    },
    {
        id: 4,
        title: "保护红熊猫",
        desc: "让我们的后代也能在雪山看见它...",
        image: "https://picsum.photos/600/400?random=4",
        name: "生态保护",
        tag: "濒危物种项目",
    },
    
    {
        id: 4,
        title: "保护红熊猫",
        desc: "让我们的后代也能在雪山看见它...",
        image: "https://picsum.photos/600/400?random=4",
        name: "生态保护",
        tag: "濒危物种项目",
    },
    
    {
        id: 4,
        title: "保护红熊猫",
        desc: "让我们的后代也能在雪山看见它...",
        image: "https://picsum.photos/600/400?random=4",
        name: "生态保护",
        tag: "濒危物种项目",
    },
    
    {
        id: 4,
        title: "保护红熊猫",
        desc: "让我们的后代也能在雪山看见它...",
        image: "https://picsum.photos/600/400?random=4",
        name: "生态保护",
        tag: "濒危物种项目",
    },
]);

const activeIndex = ref(0);
const dragOffset = ref(0); // 手指实时滑动的距离
const isDragging = ref(false); // 是否正在拖拽

// 轨道样式：由 静态基础偏移 + 动态拖拽距离 组成
const trackStyle = computed(() => {
    // 基础位置逻辑：第一张靠顶，其余居中
    const baseOffset =
        activeIndex.value === 0 ? 15 : CENTER_PADDING - activeIndex.value * STEP;
    const totalTranslateY = baseOffset + dragOffset.value;

    return {
        transform: `translateY(${totalTranslateY}px)`,
        // 拖拽时取消动画（实现跟随），停止拖拽时开启回弹动画
        transition: isDragging.value
            ? "none"
            : "transform 1s cubic-bezier(0.23, 1, 0.32, 1)",
    };
});

// 计算每一项的动态缩放
const getItemStyle = (index) => {
    // 简单的随动缩放逻辑：距离中心越近，缩放越接近 1
    return {
        transform: `scale(${index === activeIndex.value ? 1 : 0.94})`,
        opacity: index === activeIndex.value ? 1 : 0.5,
        transition: isDragging.value ? "none" : "all 0.4s ease",
    };
};

// 手势处理
let startY = 0;

const handleTouchStart = (e) => {
    startY = e.touches[0].pageY;
    isDragging.value = true;
};

const handleTouchMove = (e) => {
    const currentY = e.touches[0].pageY;
    const deltaY = currentY - startY;

    // 增加阻尼感：在顶部和底部滑动时阻力加大
    if (
        (activeIndex.value === 0 && deltaY > 0) ||
        (activeIndex.value === list.value.length - 1 && deltaY < 0)
    ) {
        dragOffset.value = deltaY * 0.3;
    } else {
        dragOffset.value = deltaY;
    }
};

const handleTouchEnd = () => {
    isDragging.value = false;

    // 判断滑动距离是否足以翻页（超过卡片高度的 1/4）
    const threshold = STEP / 4;

    if (dragOffset.value < -threshold && activeIndex.value < list.value.length - 1) {
        activeIndex.value++;
    } else if (dragOffset.value > threshold && activeIndex.value > 0) {
        activeIndex.value--;
    }

    // 重置拖拽增量，依靠 transition 平滑回弹
    dragOffset.value = 0;
};
</script>

<style scoped>
.charity-page {
    width: 100vw;
    background: linear-gradient(180deg, #ff7e8d 0%, #febd7d 100%);
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    touch-action: none; /* 关键：禁止系统默认的下拉刷新等行为 */
}

.card-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    will-change: transform;
}

.card-item {
    width: 92vw;
    height: v-bind('CARD_HEIGHT + "px"');
    margin-bottom: v-bind('CARD_GAP + "px"');
    flex-shrink: 0;
}

.card-content {
    width: 100%;
    height: 100%;
    background-color: #f7e08c;
    border-radius: 24px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* 内部细节省略，保持之前样式即可... */
.note-box {
    background: #fff;
    border-radius: 12px;
    padding: 12px;
    position: relative;
    margin-bottom: 10px;
}
.red-dot {
    position: absolute;
    top: -4px;
    left: 15px;
    width: 8px;
    height: 8px;
    background: #ff4d4f;
    border-radius: 50%;
}
.title {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
}
.desc {
    font-size: 12px;
    color: #666;
    margin: 4px 0;
}
.image-box {
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 10px;
}
.image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.beneficiary-info {
    text-align: center;
    margin-bottom: 10px;
}
.name {
    font-size: 16px;
    font-weight: bold;
}
.tag {
    font-size: 11px;
    color: #8a7b45;
}
</style>
