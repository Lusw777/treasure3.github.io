<template>
  <div class="overview-container">
    <div class="subtitle">点击地点开始探索，每个选择都会带你走向不同的路径！</div>
    
    <div class="locations-grid">
      <div 
        v-for="location in locations" 
        :key="location.scene"
        class="location-card" 
        @click="startGame(location.scene)"
      >
        <div class="location-image">{{ location.emoji }}</div>
        <div class="location-title">{{ location.title }}</div>
        <div class="location-description">{{ location.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  emits: ['start-game'],
  data() {
    return {
      locations: [
        {
          scene: 'start',
          emoji: '🏛️',
          title: '古老图书馆',
          description: '探索这座充满秘密的古老建筑，寻找宝藏线索'
        },
        {
          scene: 'mainHall',
          emoji: '👑',
          title: '中央大厅',
          description: '宏伟的大厅可能隐藏着重要线索'
        },
        {
          scene: 'eastShelves',
          emoji: '📚',
          title: '东侧书架',
          description: '尘封的书籍中或许有你需要的信息'
        },
        {
          scene: 'westStudy',
          emoji: '🔬',
          title: '西侧研究室',
          description: '学者的私人空间可能藏有关键物品'
        },
        {
          scene: 'basement',
          emoji: '🕯️',
          title: '地下室',
          description: '阴暗潮湿的地下空间充满未知'
        },
        {
          scene: 'templeEntrance',
          emoji: '🏛️',
          title: '神庙入口',
          description: '古老神庙的入口，三条通道等待你的选择'
        }
      ]
    }
  },
  methods: {
    startGame(sceneKey) {
      this.$emit('start-game', sceneKey)
    }
  }
}
</script>

<style scoped>
.overview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.subtitle {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.2rem;
  color: #FFA500;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
}

.location-card {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #555;
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-color: #FFD700;
}

.location-image {
  font-size: 3rem;
  margin-bottom: 15px;
}

.location-title {
  font-size: 1.5rem;
  color: #FFD700;
  margin-bottom: 10px;
}

.location-description {
  font-size: 1rem;
  color: #CCC;
}
</style>