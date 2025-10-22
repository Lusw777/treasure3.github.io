<template>
  <div class="log-container">
    <div class="log-header">
      <span>游戏日志</span>
      <button @click="clearLogs" class="clear-btn" title="清空日志">🗑️</button>
    </div>
    <div class="log-content" ref="logContent">
      <div
        v-for="(log, index) in logs"
        :key="index"
        class="log-entry"
        :class="log.type"
      >
        <span class="log-time">{{ formatTime(log.timestamp) }}</span>
        <span class="log-message">{{ log.message }}</span>
      </div>
      <div v-if="logs.length === 0" class="empty-log">
        📝 日志为空，开始游戏后这里会显示游戏事件...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameLog',
  props: {
    logs: {
      type: Array,
      default: () => []
    }
  },
  emits: ['clear-logs'],
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    
    clearLogs() {
      this.$emit('clear-logs')
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.logContent
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    }
  },
  watch: {
    logs: {
      handler() {
        this.scrollToBottom()
      },
      deep: true
    }
  },
  mounted() {
    this.scrollToBottom()
  }
}
</script>

<style scoped>
.log-container {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid #555;
  overflow: hidden;
  margin: 20px 0;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid #555;
  color: #FFD700;
  font-weight: bold;
}

.clear-btn {
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.clear-btn:hover {
  background: rgba(255, 107, 107, 0.2);
  transform: scale(1.1);
}

.log-content {
  height: 200px;
  overflow-y: auto;
  padding: 10px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.log-entry {
  margin-bottom: 8px;
  padding: 8px 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  animation: fadeIn 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.4;
}

.log-time {
  color: #888;
  font-size: 0.8rem;
  min-width: 70px;
  flex-shrink: 0;
  margin-top: 1px;
}

.log-message {
  flex: 1;
  word-wrap: break-word;
}

.log-entry.success {
  background: rgba(127, 255, 0, 0.1);
  border-left: 3px solid #7FFF00;
}

.log-entry.success .log-message {
  color: #7FFF00;
}

.log-entry.warning {
  background: rgba(255, 165, 0, 0.1);
  border-left: 3px solid #FFA500;
}

.log-entry.warning .log-message {
  color: #FFA500;
}

.log-entry.error {
  background: rgba(255, 69, 0, 0.1);
  border-left: 3px solid #FF4500;
}

.log-entry.error .log-message {
  color: #FF4500;
}

.log-entry.info {
  background: rgba(30, 144, 255, 0.1);
  border-left: 3px solid #1E90FF;
}

.log-entry.info .log-message {
  color: #1E90FF;
}

.empty-log {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
}

.log-content::-webkit-scrollbar {
  width: 6px;
}

.log-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.log-content::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.3);
  border-radius: 3px;
}

.log-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 215, 0, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .log-content {
    height: 150px;
    font-size: 0.85rem;
  }
  
  .log-time {
    min-width: 60px;
    font-size: 0.75rem;
  }
  
  .log-entry {
    padding: 6px 8px;
    margin-bottom: 6px;
  }
}
</style>