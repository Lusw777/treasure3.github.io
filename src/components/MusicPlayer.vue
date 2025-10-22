<template>
  <div class="music-controls">
    <button class="music-btn" @click="$emit('prev-music')">⏮</button>
    <button class="music-btn" @click="$emit('toggle-music')">
      {{ isPlaying ? '⏸️' : '▶️' }}
    </button>
    <button class="music-btn" @click="$emit('next-music')">⏭</button>
    <div class="volume-control">
      <span>🔊</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        :value="volume"
        @input="$emit('volume-change', $event.target.valueAsNumber)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  props: {
    currentScene: {
      type: String,
      default: 'start'
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    volume: {
      type: Number,
      default: 0.5
    }
  },
  emits: ['toggle-music', 'prev-music', 'next-music', 'volume-change']
}
</script>

<style scoped>
.music-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 12px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 2px solid #FFD700;
}

.music-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
}

.music-btn:hover {
  background: rgba(255, 215, 0, 0.5);
  transform: scale(1.1);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 5px;
}

.volume-control span {
  font-size: 1.2rem;
}

.volume-control input {
  width: 80px;
  height: 5px;
  border-radius: 5px;
  background: #555;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.volume-control input:hover {
  opacity: 1;
}

.volume-control input::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #FFD700;
  cursor: pointer;
}

@media (max-width: 768px) {
  .music-controls {
    bottom: 10px;
    right: 10px;
    padding: 8px;
    gap: 8px;
  }
  
  .music-btn {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
    padding: 6px 10px;
  }
  
  .volume-control input {
    width: 60px;
  }
}

@media (max-width: 480px) {
  .music-controls {
    flex-direction: column;
    border-radius: 25px;
    padding: 10px;
  }
  
  .volume-control {
    order: -1;
    width: 100%;
    justify-content: center;
  }
  
  .volume-control input {
    width: 100px;
  }
}
</style>