<template>
  <div class="user-manager">
    <h2>👤 用户管理</h2>
    
    <div class="user-section">
      <div class="current-user" v-if="currentUser">
        <h3>当前用户</h3>
        <div class="user-card">
          <div class="user-avatar">👤</div>
          <div class="user-info">
            <div class="user-name">{{ currentUser.name }}</div>
            <div class="user-id">ID: {{ currentUser.id }}</div>
            <div class="user-stats">
              游戏次数: {{ currentUser.gameCount || 0 }}
            </div>
          </div>
        </div>
      </div>

      <div class="user-form">
        <h3>{{ currentUser ? '切换用户' : '创建用户' }}</h3>
        <div class="input-group">
          <input
            type="text"
            v-model="newUserName"
            placeholder="输入用户名"
            maxlength="20"
            class="user-input"
          >
          <button @click="createOrSwitchUser" class="user-btn">
            {{ currentUser ? '切换' : '创建' }}
          </button>
        </div>
      </div>

      <div class="user-list" v-if="userList.length > 0">
        <h3>所有用户</h3>
        <div class="users-grid">
          <div
            v-for="user in userList"
            :key="user.id"
            class="user-item"
            :class="{ active: currentUser && currentUser.id === user.id }"
            @click="switchUser(user)"
          >
            <div class="user-avatar">👤</div>
            <div class="user-details">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-game-count">游戏: {{ user.gameCount || 0 }} 次</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManager',
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['user-changed'],
  data() {
    return {
      newUserName: '',
      userList: []
    }
  },
  created() {
    this.loadUserList()
  },
  methods: {
    createOrSwitchUser() {
      if (!this.newUserName.trim()) {
        alert('请输入用户名')
        return
      }

      const userName = this.newUserName.trim()
      let user = this.userList.find(u => u.name === userName)
      
      if (!user) {
        user = {
          id: this.generateUserId(),
          name: userName,
          gameCount: 0,
          created: new Date().toISOString()
        }
        this.userList.push(user)
        this.saveUserList()
      }

      this.$emit('user-changed', user)
      this.newUserName = ''
    },

    switchUser(user) {
      this.$emit('user-changed', user)
    },

    generateUserId() {
      return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    },

    loadUserList() {
      const savedUsers = localStorage.getItem('treasureHuntUsers')
      if (savedUsers) {
        this.userList = JSON.parse(savedUsers)
      }
    },

    saveUserList() {
      localStorage.setItem('treasureHuntUsers', JSON.stringify(this.userList))
    }
  }
}
</script>

<style scoped>
.user-manager {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.user-manager h2 {
  text-align: center;
  color: #FFD700;
  margin-bottom: 30px;
  font-size: 2rem;
}

.user-section h3 {
  color: #FFA500;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.current-user {
  margin-bottom: 30px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 215, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #FFD700;
}

.user-avatar {
  font-size: 2.5rem;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 1.4rem;
  color: #FFD700;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-id {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.user-stats {
  color: #4CAF50;
  font-weight: bold;
}

.user-form {
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  gap: 10px;
  max-width: 400px;
}

.user-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #555;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.user-input:focus {
  outline: none;
  border-color: #FFD700;
}

.user-btn {
  padding: 12px 25px;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.user-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.user-item.active {
  border-color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
}

.user-details {
  flex: 1;
}

.user-game-count {
  font-size: 0.8rem;
  color: #888;
}

@media (max-width: 768px) {
  .users-grid {
    grid-template-columns: 1fr;
  }
  
  .input-group {
    flex-direction: column;
  }
}
</style>