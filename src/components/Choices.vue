<template>
  <div class="choices-container">
    <div class="choices-title">你的选择</div>
    <div class="choice-buttons">
      <button
        v-for="choice in choices"
        :key="choice.id"
        class="choice-btn"
        :disabled="isChoiceDisabled(choice)"
        :title="getChoiceTooltip(choice)"
        @click="$emit('choice-selected', choice)"
      >
        {{ choice.text }}
      </button>
      
      <button
        v-if="choices.length === 0"
        class="choice-btn"
        :disabled="!gameActive"
        @click="$emit('choice-selected', { id: 'back', text: '返回上一级' })"
      >
        返回上一级
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Choices',
  props: {
    choices: {
      type: Array,
      default: () => []
    },
    inventory: {
      type: Array,
      default: () => []
    },
    gameActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['choice-selected'],
  methods: {
    isChoiceDisabled(choice) {
      if (!this.gameActive) return true
      if (choice.requiredItem && !this.inventory.includes(choice.requiredItem)) {
        return true
      }
      return false
    },
    
    getChoiceTooltip(choice) {
      if (choice.requiredItem && !this.inventory.includes(choice.requiredItem)) {
        return `需要 ${choice.requiredItem} 才能执行此操作`
      }
      return ''
    }
  }
}
</script>

<style scoped>
.choices-container {
  width: 100%;
}

.choices-title {
  text-align: center;
  margin-bottom: 15px;
  color: #FFD700;
  font-size: 1.4rem;
}

.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.choice-btn {
  padding: 15px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #FF8C00, #FF4500);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  text-align: left;
}

.choice-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #FF9E40, #FF6945);
}

.choice-btn:disabled {
  background: #555;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.7;
}
</style>