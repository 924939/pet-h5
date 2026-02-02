<template>
    <div class="share-card-wrapper">
        <canvas ref="canvas" width="340" height="550"></canvas>
        <button class="save-btn" @click="saveImage">保存分享图片</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import QRCode from "qrcode";

const canvas = ref(null);

// ===== 动态数据 =====
const animalType = "猫";
const animalCount = 3;
const days = 7;
const times = 12;
const projectName = "联合喂养计划";
const imageUrl = "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";
const shareUrl = "https://your-domain.com/project/1";

onMounted(drawCard);

async function drawCard() {
    const ctx = canvas.value.getContext("2d");
    const W = 340;
    const H = 540;
    const cx = W / 2;

    ctx.clearRect(0, 0, W, H);

    // ===== 主卡片 =====
    drawRoundRect(ctx, 16, 12, 308, 532, 28);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,0.10)";
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.shadowBlur = 0;

    // ===== 身份胶囊 =====
    drawRoundRect(ctx, cx - 70, 36, 140, 34, 17);
    ctx.fillStyle = "rgba(255,138,0,0.12)";
    ctx.fill();

    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#FF8A00";
    ctx.textAlign = "center";
    ctx.fillText("❤️ 暖心喂养官", cx, 58);

    // ===== 主图 =====
    const img = await loadImage(imageUrl);
    drawRoundRect(ctx, 32, 86, 276, 210, 24);
    ctx.save();
    ctx.clip();
    ctx.drawImage(img, 32, 86, 276, 210);
    ctx.restore();

    // ===== 文案 =====
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#333";
    ctx.fillText(`已帮助 ${animalCount} 只流浪${animalType}`, cx, 330);

    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#999";
    ctx.fillText(`坚持 ${days} 天 · 累计 ${times} 次`, cx, 352);

    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = "#FF8A00";
    ctx.fillText("我已经坚持下来了", cx, 382);
    ctx.fillText("你愿意和我一起吗？", cx, 404);

    // ===== 分割线 =====
    ctx.strokeStyle = "#F0E6D8";
    ctx.beginPath();
    ctx.moveTo(cx - 60, 420);
    ctx.lineTo(cx + 60, 420);
    ctx.stroke();

    // ===== 二维码 =====
    const qrUrl = await QRCode.toDataURL(shareUrl, {
        width: 72,
        margin: 1,
        color: { dark: "#333", light: "#fff" },
    });
    const qr = await loadImage(qrUrl);
    ctx.drawImage(qr, cx - 36, 436, 72, 72);

    // ===== 来源（安全区内）=====
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#bbb";
    ctx.fillText(`来自 · ${projectName}`, cx, 522);
}

// ===== 工具 =====
function drawRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = src;
    });
}

function saveImage() {
    const link = document.createElement("a");
    link.download = "share.png";
    link.href = canvas.value.toDataURL("image/png");
    link.click();
}
</script>

<style scoped>
.share-card-wrapper {
    height: 100vh;
    box-sizing: border-box;
    padding: 12px;
    text-align: center;
    background-color: #fff9f1;
}

canvas {
    border-radius: 28px;
}

.save-btn {
    margin-top: 20px;
    width: 100%;
    height: 48px;
    border-radius: 24px;
    background: linear-gradient(90deg, #ffb347, #ff8a00);
    color: #fff;
    border: none;
    font-size: 16px;
}
</style>
