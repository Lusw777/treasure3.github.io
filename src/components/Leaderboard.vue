<template>
  <div class="leaderboard">
    <h2>🏆 排行榜</h2>
    
    <div class="leaderboard-content">
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-number">{{ totalGames }}</div>
          <div class="stat-label">总游戏次数</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ topScore }}</div>
          <div class="stat-label">最高分数</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ uniquePlayers }}</div>
          <div class="stat-label">参与玩家</div>
        </div>
      </div>

      <div class="ranking-list">
        <h3>分数排行榜</h3>
        <div class="ranking-header">
          <span>排名</span>
          <span>玩家</span>
          <span>分数</span>
          <span>时间</span>
        </div>
        <div class="ranking-items">
          <div
            v-for="(result, index) in sortedResults"
            :key="result.timestamp + result.userId"
            class="ranking-item"
            :class="{
              'current-user': currentUser && currentUser.id === result.userId,
              'top-three': index < 3
            }"
          >
            <div class="rank">
              <span v-if="index < 3" class="medal">
                {{ ['🥇', '🥈', '🥉'][index] }}
              </span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="player-name">
              {{ result.userName }}
              <span v-if="currentUser && currentUser.id === result.userId" class="you-badge">(你)</span>
            </div>
            <div class="score">{{ result.score }}</div>
            <div class="time">{{ formatDate(result.timestamp) }}</div>
          </div>
          
          <div v-if="sortedResults.length === 0" class="no-results">
            🎮 暂无游戏记录，快去玩游戏吧！
          </div>
        </div>
      </div>

      <div class="recent-games" v-if="recentGames.length > 0">
        <h3>最近游戏</h3>
        <div class="recent-list">
          <div
            v-for="game in recentGames"
            :key="game.timestamp"
            class="recent-item"
          >
            <div class="game-info">
              <span class="player">{{ game.userName }}</span>
              获得了
              <span class="score">{{ game.score }}</span>
              分
            </div>
            <div class="game-time">{{ formatTime(game.timestamp) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Leaderboard',
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      gameResults: []
    }
  },
  computed: {
    sortedResults() {
      return [...this.gameResults]
        .sort((a, b) => b.score - a.score)
        .slice(0, 20) // 只显示前20名
    },
    
    recentGames() {
      return [...this.gameResults]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10) // 最近10场游戏
    },
    
    totalGames() {
      return this.gameResults.length
    },
    
    topScore() {
      if (this.gameResults.length === 0) return 0
      return Math.max(...this.gameResults.map(r => r.score))
    },
    
    uniquePlayers() {
      const uniqueUserIds = new Set(this.gameResults.map(r => r.userId))
      return uniqueUserIds.size
    }
  },
  created() {
    this.loadGameResults()
  },
  methods: {
    loadGameResults() {
      const savedResults = localStorage.getItem('treasureHuntResults')
      if (savedResults) {
        this.gameResults = JSON.parse(savedResults)
      }
    },
    
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleDateString('zh-CN')
    },
    
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.leaderboard {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.leaderboard h2 {
  text-align: center;
  color: #FFD700;
  margin-bottom: 30px;
  font-size: 2rem;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 215, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: 2px solid #FFD700;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 5px;
}

.stat-label {
  color: #FFA500;
  font-size: 0.9rem;
}

.ranking-list {
  margin-bottom: 30px;
}

.ranking-list h3 {
  color: #FFA500;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.ranking-header {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px;
  gap: 15px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 10px;
}

.ranking-items {
  max-height: 400px;
  overflow-y: auto;
}

.ranking-item {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px;
  gap: 15px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  align-items: center;
}

.ranking-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.ranking-item.current-user {
  background: rgba(76, 175, 80, 0.2);
  border-left: 4px solid #4CAF50;
}

.ranking-item.top-three {
  background: rgba(255, 215, 0, 0.15);
  border-left: 4px solid #FFD700;
}

.rank {
  font-weight: bold;
  color: #FFD700;
}

.medal {
  font-size: 1.2rem;
}

.player-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.you-badge {
  background: #4CAF50;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
}

.score {
  font-weight: bold;
  color: #FFA500;
  font-size: 1.1rem;
}

.time {
  color: #888;
  font-size: 0.9rem;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #888;
  font-size: 1.1rem;
}

.recent-games h3 {
  color: #FFA500;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.recent-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.game-info {
  color: #CCC;
}

.player {
  color: #FFD700;
  font-weight: bold;
}

.game-info .score {
  color: #4CAF50;
  font-weight: bold;
}

.game-time {
  color: #888;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .ranking-header,
  .ranking-item {
    grid-template-columns: 60px 1fr 80px 100px;
    gap: 10px;
    padding: 12px 15px;
  }
  
  .stats-overview {
    grid-template-columns: 1fr;
  }
  
  .recent-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>