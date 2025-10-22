// 游戏工具函数

// 获取场景对应的音乐
export function getSceneMusicKey(sceneKey, sceneParentMap, sceneMusic) {
    if (sceneMusic[sceneKey]) return sceneKey;
    
    let currentKey = sceneKey;
    while (sceneParentMap[currentKey]) {
        currentKey = sceneParentMap[currentKey];
        if (sceneMusic[currentKey]) {
            return currentKey;
        }
    }
    
    return "default";
}

// 延迟函数
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 验证场景是否存在
export function validateScene(sceneKey, gameScenes) {
    if (!gameScenes[sceneKey]) {
        console.error(`场景不存在: ${sceneKey}`);
        return false;
    }
    return true;
}

// 初始化游戏状态
export function initGameState() {
    return {
        currentScene: "start",
        progress: 0,
        inventory: [],
        placedGems: {
            ruby: false,
            emerald: false,
            sapphire: false
        }
    };
}

// 保存游戏状态到本地存储
export function saveGameState(gameState) {
    try {
        localStorage.setItem('treasureHuntGame', JSON.stringify(gameState));
        return true;
    } catch (e) {
        console.error("保存游戏状态失败:", e);
        return false;
    }
}

// 从本地存储加载游戏状态
export function loadGameState() {
    try {
        const savedGame = localStorage.getItem('treasureHuntGame');
        if (savedGame) {
            return JSON.parse(savedGame);
        }
    } catch (e) {
        console.error("加载游戏状态失败:", e);
    }
    return null;
}

// 生成随机事件
export function generateRandomEvent() {
    const randomEvents = [
        { message: "你发现了一枚闪闪发光的金币！", type: "success", item: "金币" },
        { message: "一阵风吹过，带来了远处的奇怪声音...", type: "info" },
        { message: "你似乎听到身后有脚步声，但回头什么也没有...", type: "warning" },
        { message: "墙壁上的火把突然闪烁了几下...", type: "info" },
        { message: "你注意到地上有一张破旧的纸条...", type: "info" },
    ];
    
    return randomEvents[Math.floor(Math.random() * randomEvents.length)];
}

// 检查是否可以获得奖励物品
export function canGetReward(scene, inventory) {
    return scene.rewardItem && !inventory.includes(scene.rewardItem);
}

// 检查是否所有宝石都已放置
export function hasAllGems(placedGems) {
    return placedGems.ruby && placedGems.emerald && placedGems.sapphire;
}

// 生成用户ID
export function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// 格式化日期时间
export function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}