<template>
  <div id="app">
    <!-- 音乐播放器 -->
    <music-player 
      :current-scene="currentScene"
      :is-playing="isMusicPlaying"
      @toggle-music="toggleMusic"
      @volume-change="adjustVolume"
    />
    
    <!-- 调试信息 -->
    <div class="debug-info" v-if="currentView === 'game'">
      当前场景: {{ currentScene }} | 
      当前音乐: {{ getCurrentMusicName() }}
    </div>
    
    <!-- 音乐测试按钮（调试用） -->
    <div class="music-test" v-if="currentView === 'overview'">
      <button @click="testAllMusic" class="test-btn">测试音乐</button>
    </div>
    
    <!-- 主页面容器 -->
    <div class="app-container">
      <!-- 导航栏 -->
      <div class="app-header">
        <h1>🏴‍☠️ 迷宫寻宝大冒险 🗺️</h1>
        <div class="header-controls">
          <button class="header-btn" @click="currentView = 'userManager'">👤 用户管理</button>
          <button class="header-btn" @click="currentView = 'leaderboard'">🏆 排行榜</button>
          <button class="header-btn" @click="currentView = 'overview'">🏠 游戏主页</button>
        </div>
      </div>

      <!-- 视图切换 -->
      <div class="view-container">
        <overview 
          v-if="currentView === 'overview'"
          @start-game="startGameFromOverview"
        />
        
        <game 
          v-else-if="currentView === 'game'"
          :initial-scene="initialScene"
          @back-to-overview="currentView = 'overview'"
          @game-completed="handleGameCompleted"
          @scene-change="handleSceneChange"
        />
        
        <user-manager 
          v-else-if="currentView === 'userManager'"
          :current-user="currentUser"
          @user-changed="handleUserChanged"
        />
        
        <leaderboard 
          v-else-if="currentView === 'leaderboard'"
          :current-user="currentUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue'
import Overview from './components/Overview.vue'
import Game from './components/Game.vue'
import UserManager from './components/UserManager.vue'
import Leaderboard from './components/Leaderboard.vue'

// 音乐配置
const sceneMusic = {
  start: { url: "/music/tushuquan.mp3", name: "古老图书馆音乐" },
  mainHall: { url: "/music/hall.mp3", name: "中央大厅音乐" },
  eastShelves: { url: "/music/shujiaqu.mp3", name: "书架区音乐" },
  westStudy: { url: "/music/yanjiushi.mp3", name: "研究室音乐" },
  basement: { url: "/music/dixiashi.mp3", name: "地下室音乐" },
  templeEntrance: { url: "/music/shenmiao.mp3", name: "神庙音乐" },
  default: { url: "/music/maoxian.mp3", name: "冒险音乐" }
};

export default {
  name: 'App',
  components: {
    MusicPlayer,
    Overview,
    Game,
    UserManager,
    Leaderboard
  },
  data() {
    return {
      currentView: 'overview',
      currentScene: 'start',
      initialScene: 'start',
      isMusicPlaying: false,
      currentUser: null,
      volume: 0.5,
      audio: null
    }
  },
  created() {
    this.loadCurrentUser()
    this.setupAudio()
  },
  methods: {
    setupAudio() {
      // 创建音频元素
      this.audio = document.createElement('audio')
      this.audio.id = 'backgroundMusic'
      this.audio.loop = true
      this.audio.volume = this.volume
      document.body.appendChild(this.audio)
      
      // 设置默认音乐
      this.playSceneMusic('start')
      
      this.audio.addEventListener('play', () => {
        this.isMusicPlaying = true
      })
      
      this.audio.addEventListener('pause', () => {
        this.isMusicPlaying = false
      })
      
      this.audio.addEventListener('ended', () => {
        this.isMusicPlaying = false
      })
      
      // 添加用户交互后自动播放
      document.addEventListener('click', this.handleFirstInteraction, { once: true })
    },
    
    handleFirstInteraction() {
      if (this.audio && !this.isMusicPlaying) {
        this.audio.play().catch(error => {
          console.log('自动播放被阻止，需要用户手动播放')
        })
      }
    },
    
    playSceneMusic(sceneKey) {
      if (!this.audio) {
        console.error('音频元素未初始化')
        return
      }
      
      const musicKey = this.getSceneMusicKey(sceneKey)
      const musicConfig = sceneMusic[musicKey] || sceneMusic.default
      
      console.log('切换到音乐:', musicConfig.name, '场景:', sceneKey)
      
      const fullUrl = window.location.origin + musicConfig.url
      if (this.audio.src !== fullUrl) {
        this.audio.src = musicConfig.url
        this.audio.play().catch(error => {
          console.error('播放音乐失败:', error)
          // 用户交互后重试
          document.addEventListener('click', () => {
            this.audio.play().catch(e => console.error('重试播放失败:', e))
          }, { once: true })
        })
      }
    },
    
    getSceneMusicKey(sceneKey) {
      if (sceneMusic[sceneKey]) return sceneKey
      
      // 场景音乐映射
      const sceneMusicMap = {
        'mainHallDocuments': 'mainHall',
        'ceilingMural': 'mainHall',
        'secretPassage': 'mainHall',
        'redBook': 'eastShelves',
        'shelfGap': 'eastShelves',
        'symbolBook': 'eastShelves',
        'decodeSymbols': 'eastShelves',
        'manuscript': 'westStudy',
        'wallChart': 'westStudy',
        'drawers': 'westStudy',
        'findTool': 'westStudy',
        'woodenCrate': 'basement',
        'stoneWall': 'basement',
        'eastTunnel': 'basement',
        'tunnelEnd': 'basement',
        'openCrate': 'basement',
        'fountain': 'secretGarden',
        'fountainClue': 'secretGarden',
        'strangeFlower': 'secretGarden',
        'examineFlower': 'secretGarden',
        'gardenStatue': 'secretGarden',
        'statueClue': 'secretGarden',
        'takeBoat': 'undergroundRiver',
        'riverBank': 'undergroundRiver',
        'searchShore': 'undergroundRiver',
        'findShoreItem': 'undergroundRiver',
        'buildRaft': 'undergroundRiver',
        'raftAcross': 'undergroundRiver',
        'raftBank': 'undergroundRiver',
        'leftPath': 'templeEntrance',
        'rightPath': 'templeEntrance',
        'middlePath': 'templeEntrance',
        'decodedClue': 'mainHall',
        'muralClue': 'mainHall',
        'bookClue': 'eastShelves',
        'decodedManuscript': 'westStudy',
        'altarPuzzle': 'ancientAltar',
        'treasureChamber': 'ancientAltar',
        'treasure': 'treasureChamber'
      }
      
      return sceneMusicMap[sceneKey] || 'default'
    },
    
    getCurrentMusicName() {
      const musicKey = this.getSceneMusicKey(this.currentScene)
      const musicConfig = sceneMusic[musicKey] || sceneMusic.default
      return musicConfig.name
    },
    
    handleSceneChange(newScene) {
      console.log('场景切换到:', newScene)
      this.currentScene = newScene
      this.playSceneMusic(newScene)
    },
    
    startGameFromOverview(sceneKey) {
      this.initialScene = sceneKey || 'start'
      this.currentView = 'game'
      this.currentScene = sceneKey || 'start'
      this.playSceneMusic(sceneKey || 'start')
    },
    
    toggleMusic() {
      if (!this.audio) return
      
      if (this.isMusicPlaying) {
        this.audio.pause()
      } else {
        this.audio.play().catch(error => {
          console.error('播放音乐失败:', error)
        })
      }
    },
    
    adjustVolume(newVolume) {
      this.volume = newVolume
      if (this.audio) {
        this.audio.volume = newVolume
      }
    },
    
    testAllMusic() {
      const musicFiles = [
        { name: '图书馆', url: '/music/tushuquan.mp3' },
        { name: '中央大厅', url: '/music/hall.mp3' },
        { name: '书架区', url: '/music/shujiaqu.mp3' },
        { name: '研究室', url: '/music/yanjiushi.mp3' },
        { name: '地下室', url: '/music/dixiashi.mp3' },
        { name: '神庙', url: '/music/shenmiao.mp3' },
        { name: '冒险', url: '/music/maoxian.mp3' }
      ]
      
      musicFiles.forEach((music, index) => {
        setTimeout(() => {
          if (this.audio) {
            this.audio.src = music.url
            this.audio.play().catch(e => console.error(`播放 ${music.name} 失败:`, e))
            console.log(`测试播放: ${music.name}`)
          }
        }, index * 2000)
      })
    },
    
    handleGameCompleted(score) {
      if (this.currentUser) {
        this.saveGameResult(score)
        this.updateUserGameCount()
      }
      this.currentView = 'overview'
      this.playSceneMusic('start')
    },
    
    loadCurrentUser() {
      const savedUser = localStorage.getItem('currentTreasureHuntUser')
      if (savedUser) {
        try {
          this.currentUser = JSON.parse(savedUser)
        } catch (e) {
          console.error('加载用户数据失败:', e)
          this.currentUser = null
        }
      }
    },
    
    handleUserChanged(user) {
      this.currentUser = user
      localStorage.setItem('currentTreasureHuntUser', JSON.stringify(user))
    },
    
    saveGameResult(score) {
      const results = JSON.parse(localStorage.getItem('treasureHuntResults') || '[]')
      results.push({
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        score: score,
        timestamp: new Date().toISOString()
      })
      
      // 按分数排序
      results.sort((a, b) => b.score - a.score)
      
      // 只保留前50条记录
      if (results.length > 50) {
        results.splice(50)
      }
      
      localStorage.setItem('treasureHuntResults', JSON.stringify(results))
    },
    
    updateUserGameCount() {
      if (!this.currentUser) return
      
      const users = JSON.parse(localStorage.getItem('treasureHuntUsers') || '[]')
      const userIndex = users.findIndex(u => u.id === this.currentUser.id)
      
      if (userIndex !== -1) {
        if (!users[userIndex].gameCount) {
          users[userIndex].gameCount = 1
        } else {
          users[userIndex].gameCount++
        }
        localStorage.setItem('treasureHuntUsers', JSON.stringify(users))
        
        // 更新当前用户数据
        this.currentUser.gameCount = users[userIndex].gameCount
        localStorage.setItem('currentTreasureHuntUser', JSON.stringify(this.currentUser))
      }
    }
  },
  beforeUnmount() {
    // 清理事件监听器
    if (this.audio) {
      this.audio.pause()
      this.audio = null
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Microsoft YaHei', sans-serif;
}

body {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  color: #fff;
  min-height: 100vh;
  padding: 20px;
}

#app {
  width: 100%;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  font-size: 3rem;
  color: #FFD700;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 15px;
}

.header-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.header-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.header-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #66BB6A, #388E3C);
}

.view-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 调试信息 */
.debug-info {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  color: #FFD700;
  z-index: 1000;
}

/* 音乐测试按钮 */
.music-test {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.test-btn {
  padding: 8px 12px;
  background: rgba(255, 215, 0, 0.3);
  color: white;
  border: 1px solid #FFD700;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.test-btn:hover {
  background: rgba(255, 215, 0, 0.5);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2.2rem;
  }
  
  .header-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .header-btn {
    width: 200px;
  }
  
  body {
    padding: 10px;
  }
  
  .music-test {
    top: 10px;
    left: 10px;
  }
  
  .debug-info {
    font-size: 0.7rem;
    top: 5px;
  }
}

@media (max-width: 480px) {
  .app-header h1 {
    font-size: 1.8rem;
  }
}
</style>