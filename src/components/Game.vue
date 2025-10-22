<template>
  <div class="game-container">
    <button class="back-button" @click="$emit('back-to-overview')">← 返回全景</button>
    
    <h1>🏴‍☠️ 迷宫寻宝大冒险 🗺️</h1>
    <div class="subtitle">每个选择都会带你走向不同的路径，有些通向宝藏，有些则是死路！</div>
    
    <div class="game-info">
      <inventory :items="inventory" />
      <div class="gem-tracker">
        <div class="gem-tracker-title">已放置的宝石 💎</div>
        <div class="gem-tracker-items">
          <div class="gem-tracker-item" :class="{ placed: placedGems.ruby }">🔴 红宝石</div>
          <div class="gem-tracker-item" :class="{ placed: placedGems.emerald }">🟢 绿宝石</div>
          <div class="gem-tracker-item" :class="{ placed: placedGems.sapphire }">🔵 蓝宝石</div>
        </div>
      </div>
    </div>
    
    <div class="game-area">
      <scene 
        :scene="currentSceneData"
        :is-loading="isLoading"
      />
      
      <div class="choices-panel">
        <choices 
          :choices="currentSceneData.choices"
          :inventory="inventory"
          :game-active="gameActive"
          @choice-selected="handleChoice"
        />
        
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
    
    <game-log :logs="gameLogs" @clear-logs="clearLogs" />
    
    <div class="controls">
      <button class="ctrl-btn" @click="startGame" :disabled="gameActive">开始游戏</button>
      <button class="ctrl-btn reset" @click="resetGame">重新开始</button>
    </div>
    
    <div class="treasure" :class="{ 'treasure-visible': showTreasure }">
      <div class="treasure-img">🎁💰🏆</div>
      <div class="treasure-content">{{ treasureMessage }}</div>
    </div>
  </div>
</template>

<script>
import { gameScenes } from '../data/gameData.js'
import Scene from './Scene.vue'
import Choices from './Choices.vue'
import Inventory from './Inventory.vue'
import GameLog from './GameLog.vue'

export default {
  name: 'Game',
  components: {
    Scene,
    Choices,
    Inventory,
    GameLog
  },
  props: {
    initialScene: {
      type: String,
      default: 'start'
    }
  },
  emits: ['back-to-overview', 'game-completed', 'scene-change'],
  data() {
    return {
      currentScene: this.initialScene,
      progress: 0,
      gameActive: false,
      inventory: [],
      placedGems: {
        ruby: false,
        emerald: false,
        sapphire: false
      },
      gameLogs: [],
      isLoading: false,
      showTreasure: false,
      treasureMessage: '恭喜你找到了传说中的宝藏！'
    }
  },
  computed: {
    currentSceneData() {
      return gameScenes[this.currentScene] || gameScenes.start
    }
  },
  created() {
    this.loadGameState()
    this.addLog('欢迎来到迷宫寻宝大冒险！你的选择将决定你的命运...', 'info')
  },
  methods: {
    async handleChoice(choice) {
      if (!this.gameActive) return
      
      this.addLog(`你选择了: ${choice.text}`, 'info')
      
      // 更新进度
      if (choice.progress !== undefined) {
        this.progress = Math.min(100, this.progress + choice.progress)
      }
      
      // 处理宝石放置
      if (choice.id === 'placeRuby' || choice.id === 'placeEmerald' || choice.id === 'placeSapphire') {
        await this.handleGemPlacement(choice)
        return
      }
      
      // 处理场景切换
      await this.changeScene(choice.id)
    },
    
    async handleGemPlacement(choice) {
      const gemType = choice.id === 'placeRuby' ? '红宝石' : 
                     choice.id === 'placeEmerald' ? '绿宝石' : '蓝宝石'
      
      if (this.inventory.includes(gemType)) {
        const index = this.inventory.indexOf(gemType)
        this.inventory.splice(index, 1)
        
        if (gemType === '红宝石') this.placedGems.ruby = true
        if (gemType === '绿宝石') this.placedGems.emerald = true
        if (gemType === '蓝宝石') this.placedGems.sapphire = true
        
        this.addLog(`你成功放置了${gemType}！`, 'success')
        
        const hasAllGems = this.placedGems.ruby && this.placedGems.emerald && this.placedGems.sapphire
        
        if (hasAllGems) {
          await this.delay(1000)
          await this.changeScene('altarPuzzle')
        } else {
          await this.delay(500)
          await this.changeScene('ancientAltar')
        }
      } else {
        this.addLog(`你没有${gemType}，无法执行此操作！`, 'error')
      }
      
      this.saveGameState()
    },
    
    async changeScene(sceneKey) {
      this.isLoading = true
      
      // 立即通知场景变化，让音乐尽早切换
      this.$emit('scene-change', sceneKey)
      
      await this.delay(800)
      
      if (!gameScenes[sceneKey]) {
        this.addLog(`错误: 无法找到场景 "${sceneKey}"`, 'error')
        this.isLoading = false
        return
      }
      
      const newScene = gameScenes[sceneKey]
      this.currentScene = sceneKey
      
      // 处理奖励物品
      if (newScene.rewardItem && !this.inventory.includes(newScene.rewardItem)) {
        await this.delay(500)
        this.inventory.push(newScene.rewardItem)
        this.addLog(`你获得了: ${newScene.rewardItem}`, 'success')
      }
      
      // 处理宝藏场景
      if (sceneKey === 'treasureChamber' || sceneKey === 'treasure') {
        await this.delay(800)
        this.showTreasure = true
        this.addLog('你成功找到了宝藏！游戏完成！', 'success')
        this.gameActive = false
        this.$emit('game-completed', this.progress)
      }
      
      this.addLog(`你来到了: ${newScene.title}`, 'info')
      
      if (newScene.consequence) {
        this.addLog(newScene.consequence, 'error')
      }
      
      this.isLoading = false
      this.saveGameState()
    },
    
    startGame() {
      this.gameActive = true
      this.addLog('游戏开始！祝你好运，探险家！', 'success')
    },
    
    resetGame() {
      this.addLog('游戏将重新开始...', 'info')
      
      localStorage.removeItem('treasureHuntGame')
      
      setTimeout(() => {
        this.currentScene = this.initialScene
        this.progress = 0
        this.gameActive = false
        this.inventory = []
        this.placedGems = { ruby: false, emerald: false, sapphire: false }
        this.gameLogs = []
        this.showTreasure = false
        this.addLog('游戏已重置！', 'info')
      }, 1000)
    },
    
    addLog(message, type = 'info') {
      this.gameLogs.push({
        message,
        type,
        timestamp: new Date()
      })
      
      // 限制日志数量
      if (this.gameLogs.length > 50) {
        this.gameLogs.shift()
      }
    },
    
    clearLogs() {
      this.gameLogs = []
      this.addLog('日志已清空', 'info')
    },
    
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    
    loadGameState() {
      const savedGame = localStorage.getItem('treasureHuntGame')
      
      if (savedGame) {
        try {
          const gameState = JSON.parse(savedGame)
          this.currentScene = gameState.currentScene || this.initialScene
          this.progress = gameState.progress || 0
          this.inventory = gameState.inventory || []
          this.placedGems = gameState.placedGems || this.placedGems
          this.addLog('已加载保存的游戏进度', 'info')
        } catch (e) {
          console.error('加载游戏状态失败:', e)
        }
      }
    },
    
    saveGameState() {
      const gameState = {
        currentScene: this.currentScene,
        progress: this.progress,
        inventory: this.inventory,
        placedGems: this.placedGems
      }
      
      try {
        localStorage.setItem('treasureHuntGame', JSON.stringify(gameState))
      } catch (e) {
        console.error('保存游戏状态失败:', e)
      }
    }
  }
}
</script>

<style scoped>
.game-container {
  max-width: 1000px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: 1px solid #FFD700;
  border-radius: 5px;
  cursor: pointer;
  z-index: 100;
}

.back-button:hover {
  background: rgba(255, 215, 0, 0.2);
}

.subtitle {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.2rem;
  color: #FFA500;
}

.game-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.game-area {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
}

.choices-panel {
  flex: 1;
  min-width: 300px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px;
  border: 2px solid #555;
}

.progress-container {
  width: 100%;
  height: 30px;
  background: #333;
  border-radius: 15px;
  margin: 20px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #FF8C00, #FFD700);
  border-radius: 15px;
  transition: width 0.5s ease;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.ctrl-btn {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 1.1rem;
}

.ctrl-btn.reset {
  background: linear-gradient(135deg, #F44336, #D32F2F);
}

.ctrl-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.ctrl-btn:disabled {
  background: #555;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.treasure {
  display: none;
  text-align: center;
  margin-top: 20px;
  animation: pulse 2s infinite;
  padding: 20px;
  background: rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  border: 2px solid #FFD700;
}

.treasure-visible {
  display: block;
}

.treasure-content {
  font-size: 1.4rem;
  margin: 15px 0;
  color: #FFD700;
}

.treasure-img {
  font-size: 4rem;
  margin: 15px 0;
}

.gem-tracker {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 15px;
  border: 2px solid #555;
  flex: 1;
  min-width: 200px;
}

.gem-tracker-title {
  color: #FFD700;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.gem-tracker-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.gem-tracker-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.gem-tracker-item.placed {
  background: rgba(0, 255, 0, 0.2);
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .game-area {
    flex-direction: column;
  }
  
  .game-info {
    flex-direction: column;
  }
}
</style>