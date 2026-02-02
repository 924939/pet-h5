export function getLevel(score) {
    const levels = [
        { lv: 1, name: "初心公益人", min: 0 },
        { lv: 2, name: "温柔守护者", min: 100 },
        { lv: 3, name: "喂养官", min: 300 },
        { lv: 4, name: "守护使者", min: 600 },
        { lv: 5, name: "爱心中坚", min: 1000 },
        { lv: 6, name: "城市守护", min: 1600 },
        { lv: 7, name: "公益传播者", min: 2300 },
        { lv: 8, name: "高级守护者", min: 3200 },
        { lv: 9, name: "公益榜样", min: 4500 },
        { lv: 10, name: "生命守望者", min: 6000 },
    ];

    return [...levels].reverse().find(l => score >= l.min);
}