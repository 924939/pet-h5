import { defineStore } from 'pinia'

export const useSupportStore = defineStore('support', {
    state: () => ({
        rewards: [
            { key: 'p', label: '100 积分', amount: 10, foodKg: 2, foodType: '狗粮', count: 1 },
            { key: '10', label: '¥10', amount: 10, foodKg: 2, foodType: '狗粮', count: 1 },
            { key: '20', label: '¥20', amount: 20, foodKg: 4, foodType: '猫粮', count: 1 },
            { key: '30', label: '¥20', amount: 20, foodKg: 4, foodType: '猫粮', count: 1 },
            { key: '40', label: '¥20', amount: 20, foodKg: 4, foodType: '猫粮', count: 1 },
            { key: '50', label: '¥20', amount: 20, foodKg: 4, foodType: '猫粮', count: 1 },
            { key: '60', label: '¥20', amount: 20, foodKg: 4, foodType: '猫粮', count: 1 }
        ],
        selectedKey: 'p'
    }),

    getters: {
        selectedReward(state) {
            return state.rewards.find(i => i.key === state.selectedKey)
        },
        totalAmount() {
            if (!this.selectedReward) return 0
            return this.selectedReward.amount * this.selectedReward.count
        }
    },

    actions: {
        selectReward(item) {
            this.selectedKey = item.key
        },
        changeCount(item, n) {
            if (item.count + n < 1) return
            item.count += n
        }
    }
})