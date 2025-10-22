<template>
  <div class="scene">
    <div class="loading-indicator" :class="{ active: isLoading }">
      <div>探索中...</div>
      <div>⏳</div>
    </div>
    <div class="scene-content" v-show="!isLoading">
      <div class="scene-image">{{ scene.image }}</div>
      <div class="scene-title">{{ scene.title }}</div>
      <div class="scene-description">{{ scene.description }}</div>
      <div class="scene-consequence" :class="{ 'dead-end': scene.consequence }">
        {{ scene.consequence }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scene',
  props: {
    scene: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.scene {
  flex: 1;
  min-width: 300px;
  height: 350px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  border: 3px solid #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.scene-content {
  text-align: center;
  width: 100%;
}

.scene-image {
  font-size: 4rem;
  margin-bottom: 20px;
}

.scene-title {
  font-size: 1.5rem;
  color: #FFD700;
  margin-bottom: 15px;
}

.scene-description {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.scene-consequence {
  font-size: 1rem;
  color: #FFA500;
  font-style: italic;
  margin-top: 10px;
}

.scene-consequence.dead-end {
  color: #FF4500;
  font-weight: bold;
  animation: shake 0.5s;
}

.loading-indicator {
  display: none;
  text-align: center;
  padding: 20px;
}

.loading-indicator.active {
  display: block;
  animation: pulseLight 1.5s infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

@keyframes pulseLight {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>