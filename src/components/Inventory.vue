<template>
  <div class="inventory">
    <div class="inventory-title">你的物品 🎒</div>
    <div class="inventory-items">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="inventory-item"
      >
        {{ getItemIcon(item) }} {{ item }}
      </div>
      <div
        v-if="items.length === 0"
        class="inventory-item empty"
      >
        暂无物品
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inventory',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getItemIcon(item) {
      if (item.includes('钥匙')) return '🔑'
      if (item.includes('宝石')) return '💎'
      if (item.includes('地图')) return '🗺️'
      if (item.includes('金币')) return '💰'
      return '🎁'
    }
  }
}
</script>

<style scoped>
.inventory {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 15px;
  border: 2px solid #555;
  flex: 1;
  min-width: 200px;
}

.inventory-title {
  color: #FFD700;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.inventory-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.inventory-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.inventory-item.empty {
  opacity: 0.7;
  font-style: italic;
}
</style>