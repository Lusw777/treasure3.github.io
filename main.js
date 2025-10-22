// 游戏场景和状态
const gameScenes = {
    start: {
        title: "古老图书馆",
        image: "🏛️",
        description: "你站在一座古老图书馆的入口，灰尘覆盖着每一个角落，空气中弥漫着陈旧纸张的气味。",
        choices: [
            { id: "mainHall", text: "探索中央大厅", progress: 10 },
            { id: "eastShelves", text: "检查东侧书架", progress: 15 },
            { id: "westStudy", text: "调查西侧研究室", progress: 20 },
            { id: "basement", text: "直接前往地下室", progress: 5 }
        ]
    },
    mainHall: {
        title: "中央大厅",
        image: "👑",
        description: "宏伟的中央大厅有着高耸的天花板和精美的壁画。一张巨大的橡木桌摆在中央，上面散落着一些文件。",
        choices: [
            { id: "mainHallDocuments", text: "检查橡木桌上的文件", progress: 15 },
            { id: "ceilingMural", text: "研究天花板壁画", progress: 20 },
            { id: "secretPassage", text: "寻找隐藏通道", progress: 25 },
            { id: "start", text: "返回图书馆入口", progress: 0 }
        ]
    },
    eastShelves: {
        title: "东侧书架",
        image: "📚",
        description: "东侧的书架上堆满了古老的书籍。一些书籍看起来非常古老，书脊上的标题已经模糊不清。",
        choices: [
            { id: "redBook", text: "翻阅红色封面的古书", progress: 20 },
            { id: "shelfGap", text: "检查书架背后的空隙", progress: 25 },
            { id: "symbolBook", text: "寻找带有奇怪符号的书", progress: 30 },
            { id: "start", text: "返回图书馆入口", progress: 0 }
        ]
    },
    westStudy: {
        title: "西侧研究室",
        image: "🔬",
        description: "这里像是一位学者的私人研究室。桌上放着各种奇怪的仪器和半完成的手稿。",
        choices: [
            { id: "manuscript", text: "检查桌上的手稿", progress: 25 },
            { id: "wallChart", text: "研究墙上的图表", progress: 30 },
            { id: "drawers", text: "搜索抽屉里的内容", progress: 35 },
            { id: "start", text: "返回图书馆入口", progress: 0 }
        ]
    },
    basement: {
        title: "地下室",
        image: "🕯️",
        description: "阴暗潮湿的地下室弥漫着霉味。你只能依靠手中的蜡烛看清有限的范围。",
        choices: [
            { id: "woodenCrate", text: "检查北面的木箱", progress: 15 },
            { id: "stoneWall", text: "调查南面的石墙", progress: 20 },
            { id: "eastTunnel", text: "探索东面的通道", progress: 25 },
            { id: "start", text: "返回图书馆入口", progress: 0 }
        ]
    },
    secretGarden: {
        title: "神秘花园",
        image: "🌳",
        description: "你意外发现了一个隐藏的花园，里面长满了奇异的植物和花卉。中央有一个古老的喷泉。",
        choices: [
            { id: "fountain", text: "检查中央喷泉", progress: 40 },
            { id: "strangeFlower", text: "研究奇异的花朵", progress: 35 },
            { id: "gardenStatue", text: "观察花园雕像", progress: 45 },
            { id: "templeEntrance", text: "返回神庙入口", progress: 0 }
        ]
    },
    undergroundRiver: {
        title: "地下暗河",
        image: "🌊",
        description: "一条地下河流出现在你面前，水面平静如镜。河上有一艘小船，岸边有一个简陋的码头。",
        choices: [
            { id: "takeBoat", text: "乘坐小船过河", progress: 50, requiredItem: "古老钥匙" },
            { id: "searchShore", text: "搜索河岸", progress: 40 },
            { id: "buildRaft", text: "尝试建造木筏", progress: 35 },
            { id: "templeEntrance", text: "返回神庙入口", progress: 0 }
        ]
    },
    ancientAltar: {
        title: "古老祭坛",
        image: "🗿",
        description: "你来到一个古老的祭坛前，上面刻满了神秘的符号。祭坛中央有三个凹槽，似乎可以放置物品。",
        choices: [
            { id: "placeRuby", text: "放置红宝石", progress: 60, requiredItem: "红宝石" },
            { id: "placeEmerald", text: "放置绿宝石", progress: 60, requiredItem: "绿宝石" },
            { id: "placeSapphire", text: "放置蓝宝石", progress: 60, requiredItem: "蓝宝石" },
            { id: "templeEntrance", text: "返回神庙入口", progress: 0 }
        ]
    },
    mainHallDocuments: {
        title: "古老文件",
        image: "📜",
        description: "你发现了一些古老的文件，上面记载着关于宝藏的线索。",
        choices: [
            { id: "decodedClue", text: "尝试解码文件内容", progress: 30 },
            { id: "mainHall", text: "放回文件，返回大厅", progress: 0 }
        ]
    },
    ceilingMural: {
        title: "天花板壁画",
        image: "🎨",
        description: "天花板上绘制着精美的壁画，似乎描绘了一个古老的故事。",
        choices: [
            { id: "muralClue", text: "仔细研究壁画寻找线索", progress: 35 },
            { id: "mainHall", text: "返回大厅", progress: 0 }
        ]
    },
    redBook: {
        title: "红色古书",
        image: "📖",
        description: "这本书非常古老，书页已经泛黄，但里面的内容似乎与宝藏有关。",
        choices: [
            { id: "bookClue", text: "仔细阅读书籍内容", progress: 40 },
            { id: "eastShelves", text: "放回书籍，返回书架", progress: 0 }
        ]
    },
    manuscript: {
        title: "古老手稿",
        image: "✍️",
        description: "手稿上写着一些难以理解的符号和文字，似乎是某种密码。",
        choices: [
            { id: "decodedManuscript", text: "尝试破译手稿", progress: 45 },
            { id: "westStudy", text: "放回手稿，返回研究室", progress: 0 }
        ]
    },
    woodenCrate: {
        title: "木箱",
        image: "📦",
        description: "木箱看起来很旧，但锁已经生锈，似乎可以强行打开。",
        choices: [
            { id: "openCrate", text: "尝试打开木箱", progress: 20 },
            { id: "basement", text: "放弃打开，返回地下室", progress: 0 }
        ]
    },
    secretPassage: {
        title: "隐藏通道",
        image: "🚪",
        description: "你发现了一个隐藏的通道，但里面漆黑一片，看不清前方。",
        consequence: "这是一个死胡同！通道尽头只有一堵墙。",
        choices: [
            { id: "mainHall", text: "返回大厅", progress: 0 }
        ]
    },
    shelfGap: {
        title: "书架空隙",
        image: "🔍",
        description: "你检查了书架背后的空隙，但除了灰尘和蜘蛛网，什么也没有。",
        consequence: "这里什么都没有，是条死路！",
        choices: [
            { id: "eastShelves", text: "返回书架", progress: 0 }
        ]
    },
    wallChart: {
        title: "墙上图表",
        image: "📊",
        description: "墙上的图表看起来很复杂，但似乎与宝藏无关。",
        consequence: "这些图表只是学术研究，与宝藏无关！",
        choices: [
            { id: "westStudy", text: "返回研究室", progress: 0 }
        ]
    },
    stoneWall: {
        title: "石墙",
        image: "🧱",
        description: "石墙看起来很坚固，没有任何隐藏的机关或通道。",
        consequence: "这面墙是实心的，没有隐藏通道！",
        choices: [
            { id: "basement", text: "返回地下室", progress: 0 }
        ]
    },
    decodedClue: {
        title: "解码线索",
        image: "🔐",
        description: "你成功解码了文件内容，发现了一条重要线索：'宝藏藏在神庙的最深处'。",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 50 },
            { id: "mainHall", text: "返回大厅", progress: 0 }
        ]
    },
    muralClue: {
        title: "壁画线索",
        image: "🧩",
        description: "你从壁画中发现了一个隐藏的线索：'只有勇敢者才能找到真正的宝藏'。",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 55 },
            { id: "mainHall", text: "返回大厅", progress: 0 }
        ]
    },
    bookClue: {
        title: "书籍线索",
        image: "🔍",
        description: "你从书中发现了一条线索：'神庙中有三条路，只有中间的路通向宝藏'。",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 60 },
            { id: "eastShelves", text: "返回书架", progress: 0 }
        ]
    },
    decodedManuscript: {
        title: "破译手稿",
        image: "📜",
        description: "你成功破译了手稿，上面写着：'宝藏需要三把钥匙才能打开'。",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 65 },
            { id: "westStudy", text: "返回研究室", progress: 0 }
        ]
    },
    openCrate: {
        title: "打开木箱",
        image: "🗝️",
        description: "你强行打开了木箱，发现里面有一把古老的钥匙！",
        rewardItem: "古老钥匙",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 70 },
            { id: "basement", text: "返回地下室", progress: 0 }
        ]
    },
    templeEntrance: {
        title: "神庙入口",
        image: "🏛️",
        description: "你来到了古老的神庙入口，巨大的石门前有三条通道。",
        choices: [
            { id: "leftPath", text: "走左边的通道", progress: 75 },
            { id: "middlePath", text: "走中间的通道", progress: 80 },
            { id: "rightPath", text: "走右边的通道", progress: 75 },
            { id: "secretGarden", text: "探索隐藏的花园入口", progress: 65 }
        ]
    },
    leftPath: {
        title: "左边通道",
        image: "⬅️",
        description: "你选择了左边的通道，但走了一段后发现前面是死路。",
        consequence: "这是一条死路！",
        choices: [
            { id: "templeEntrance", text: "返回神庙入口", progress: 0 }
        ]
    },
    rightPath: {
        title: "右边通道",
        image: "➡️",
        description: "你选择了右边的通道，这条路通向一条地下暗河。",
        choices: [
            { id: "undergroundRiver", text: "继续探索暗河", progress: 70 },
            { id: "templeEntrance", text: "返回神庙入口", progress: 0 }
        ]
    },
    middlePath: {
        title: "中间通道",
        image: "⬆️",
        description: "你选择了中间的通道，这条路通向一个古老的祭坛。",
        choices: [
            { id: "ancientAltar", text: "调查古老祭坛", progress: 85 },
            { id: "templeEntrance", text: "返回神庙入口", progress: 0 }
        ]
    },
    altarPuzzle: {
        title: "祭坛之谜",
        image: "🔮",
        description: "当你将三块宝石放入祭坛凹槽后，整个房间开始震动，祭坛缓缓移开，露出一个通往地下的阶梯。",
        choices: [
            { id: "treasureChamber", text: "沿着阶梯向下", progress: 95 }
        ]
    },
    treasureChamber: {
        title: "宝藏室",
        image: "💰",
        description: "你终于找到了宝藏室！金光闪闪的宝物堆满了整个房间。",
        choices: [
            { id: "start", text: "重新开始游戏", progress: 100 }
        ]
    },
    treasure: {
        title: "宝藏",
        image: "🎉",
        description: "恭喜你找到了传说中的宝藏！",
        choices: [
            { id: "start", text: "重新开始游戏", progress: 100 }
        ]
    },
    symbolBook: {
        title: "神秘符号书籍",
        image: "🔣",
        description: "这本书上布满了神秘符号，似乎与某种古代仪式有关。",
        choices: [
            { id: "decodeSymbols", text: "尝试解读符号含义", progress: 35 },
            { id: "eastShelves", text: "放回书籍，返回书架", progress: 0 }
        ]
    },
    decodeSymbols: {
        title: "解读符号",
        image: "🔍",
        description: "经过一番努力，你解读了部分符号，发现它们指向神庙的位置。",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 55 },
            { id: "eastShelves", text: "返回书架", progress: 0 }
        ]
    },
    drawers: {
        title: "研究室抽屉",
        image: "🗄️",
        description: "抽屉里放着各种小物件，包括一些工具和笔记。",
        choices: [
            { id: "findTool", text: "仔细搜查抽屉", progress: 40 },
            { id: "westStudy", text: "关上抽屉，返回研究室", progress: 0 }
        ]
    },
    findTool: {
        title: "发现工具",
        image: "🔧",
        description: "你在抽屉深处发现了一把古老的铜钥匙和一张小地图碎片。",
        rewardItem: "铜钥匙",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 60 },
            { id: "westStudy", text: "返回研究室", progress: 0 }
        ]
    },
    eastTunnel: {
        title: "东部隧道",
        image: "⛰️",
        description: "这条隧道蜿蜒向前，墙壁上有一些模糊的雕刻。",
        choices: [
            { id: "tunnelEnd", text: "继续向前探索", progress: 30 },
            { id: "basement", text: "返回地下室", progress: 0 }
        ]
    },
    tunnelEnd: {
        title: "隧道尽头",
        image: "🔑",
        description: "隧道尽头有一个小房间，角落里的箱子里放着一把生锈的钥匙。",
        rewardItem: "生锈钥匙",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 50 },
            { id: "basement", text: "返回地下室", progress: 0 }
        ]
    },
    fountain: {
        title: "花园喷泉",
        image: "⛲",
        description: "喷泉中央有一尊小雕像，基座上刻着奇怪的符号。",
        choices: [
            { id: "fountainClue", text: "研究雕像和符号", progress: 45 },
            { id: "secretGarden", text: "返回花园", progress: 0 }
        ]
    },
    fountainClue: {
        title: "喷泉线索",
        image: "💧",
        description: "你转动雕像，发现基座下藏着一块蓝宝石！",
        rewardItem: "蓝宝石",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 70 },
            { id: "secretGarden", text: "返回花园", progress: 0 }
        ]
    },
    strangeFlower: {
        title: "奇异花朵",
        image: "🌸",
        description: "这朵花散发着微光，花瓣呈现出从未见过的颜色组合。",
        choices: [
            { id: "examineFlower", text: "仔细观察花朵", progress: 40 },
            { id: "secretGarden", text: "返回花园", progress: 0 }
        ]
    },
    examineFlower: {
        title: "花朵奥秘",
        image: "💎",
        description: "当你触碰花朵时，它绽放开来，露出了里面的一颗红宝石！",
        rewardItem: "红宝石",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 65 },
            { id: "secretGarden", text: "返回花园", progress: 0 }
        ]
    },
    gardenStatue: {
        title: "花园雕像",
        image: "🗿",
        description: "这尊大理石雕像描绘了一位古代祭司，手中似乎握着什么东西。",
        choices: [
            { id: "statueClue", text: "检查雕像细节", progress: 50 },
            { id: "secretGarden", text: "返回花园", progress: 0 }
        ]
    },
    statueClue: {
        title: "雕像线索",
        image: "🌿",
        description: "你发现雕像手中握着一个小盒子，里面装有一颗绿宝石！",
        rewardItem: "绿宝石",
        choices: [
            { id: "templeEntrance", text: "前往神庙入口", progress: 75 },
            { id: "secretGarden", text: "返回花园", progress: 0 }
        ]
    },
    takeBoat: {
        title: "乘船渡河",
        image: "🚤",
        description: "你用古老的钥匙解开了船的锁链，成功渡过了暗河。",
        choices: [
            { id: "riverBank", text: "探索河对岸", progress: 60 },
            { id: "undergroundRiver", text: "返回河边", progress: 0 }
        ]
    },
    riverBank: {
        title: "河对岸",
        image: "🏞️",
        description: "河对岸有一个小洞穴，里面似乎有东西在闪闪发光。",
        rewardItem: "金币袋",
        choices: [
            { id: "templeEntrance", text: "返回神庙入口", progress: 80 },
            { id: "undergroundRiver", text: "返回河边", progress: 0 }
        ]
    },
    searchShore: {
        title: "搜索河岸",
        image: "🔍",
        description: "你沿着河岸仔细搜索，希望能找到有用的东西。",
        choices: [
            { id: "findShoreItem", text: "继续搜索", progress: 45 },
            { id: "undergroundRiver", text: "停止搜索", progress: 0 }
        ]
    },
    findShoreItem: {
        title: "发现物品",
        image: "📜",
        description: "你在石头下发现了一张破旧的地图，标记着宝藏的大致位置。",
        rewardItem: "破旧地图",
        choices: [
            { id: "templeEntrance", text: "返回神庙入口", progress: 65 },
            { id: "undergroundRiver", text: "返回河边", progress: 0 }
        ]
    },
    buildRaft: {
        title: "建造木筏",
        image: "🛶",
        description: "你收集了一些树枝和藤蔓，成功制作了一个简陋的木筏。",
        choices: [
            { id: "raftAcross", text: "乘木筏过河", progress: 50 },
            { id: "undergroundRiver", text: "放弃过河", progress: 0 }
        ]
    },
    raftAcross: {
        title: "木筏渡河",
        image: "🌊",
        description: "木筏不太稳固，但你还是成功到达了对岸。",
        choices: [
            { id: "raftBank", text: "探索对岸", progress: 55 },
            { id: "undergroundRiver", text: "返回", progress: 0 }
        ]
    },
    raftBank: {
        title: "木筏到达的岸边",
        image: "🌿",
        description: "这里看起来很荒凉，但你发现了一个小金属盒。",
        rewardItem: "金属盒",
        choices: [
            { id: "templeEntrance", text: "返回神庙入口", progress: 70 },
            { id: "undergroundRiver", text: "返回河边", progress: 0 }
        ]
    }
};


// 音乐配置
const sceneMusic = {
    start: { url: "music/tushuguan.mp3", name: "古老图书馆音乐" },
    mainHall: { url: "music/hall.mp3", name: "中央大厅音乐" },
    eastShelves: { url: "music/shujiaqu.mp3", name: "书架区音乐" },
    westStudy: { url: "music/yanjiushi.mp3", name: "研究室音乐" },
    basement: { url: "music/dixiashi.mp3", name: "地下室音乐" },
    templeEntrance: { url: "music/shenmiao.mp3", name: "神庙音乐" },
    default: { url: "music/maoxian.mp3", name: "冒险音乐" }
};

// 游戏状态
let currentScene = "start";
let gameProgress = 0;
let gameActive = false;
let inventory = [];
let placedGems = {
    ruby: false,
    emerald: false,
    sapphire: false
};

const sceneParentMap = {
    mainHallDocuments: "mainHall",
    ceilingMural: "mainHall",
    secretPassage: "mainHall",
    redBook: "eastShelves",
    shelfGap: "eastShelves",
    symbolBook: "eastShelves",
    decodeSymbols: "eastShelves",
    manuscript: "westStudy",
    wallChart: "westStudy",
    drawers: "westStudy",
    findTool: "westStudy",
    woodenCrate: "basement",
    stoneWall: "basement",
    eastTunnel: "basement",
    tunnelEnd: "basement",
    openCrate: "basement",
    fountain: "secretGarden",
    fountainClue: "secretGarden",
    strangeFlower: "secretGarden",
    examineFlower: "secretGarden",
    gardenStatue: "secretGarden",
    statueClue: "secretGarden",
    takeBoat: "undergroundRiver",
    riverBank: "undergroundRiver",
    searchShore: "undergroundRiver",
    findShoreItem: "undergroundRiver",
    buildRaft: "undergroundRiver",
    raftAcross: "undergroundRiver",
    raftBank: "undergroundRiver",
    leftPath: "templeEntrance",
    rightPath: "templeEntrance",
    middlePath: "templeEntrance",
    decodedClue: "mainHall",
    muralClue: "mainHall",
    bookClue: "eastShelves",
    decodedManuscript: "westStudy",
    altarPuzzle: "ancientAltar",
    treasureChamber: "ancientAltar",
    treasure: "treasureChamber"
};

// 获取场景对应音乐
function getSceneMusicKey(sceneKey) {
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

// 当前播放的音乐
let currentMusic = null;
let isMusicPlaying = false;

// DOM元素
const overviewContainer = document.getElementById("overviewContainer");
const gameContainer = document.getElementById("gameContainer");
const backToOverviewBtn = document.getElementById("backToOverview");
const sceneTitle = document.querySelector(".scene-title");
const sceneImage = document.querySelector(".scene-image");
const sceneDescription = document.getElementById("sceneDescription");
const sceneConsequence = document.getElementById("sceneConsequence");
const choiceButtons = document.getElementById("choiceButtons");
const logContainer = document.getElementById("logContainer");
const progressBar = document.getElementById("progressBar");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const treasure = document.getElementById("treasure");
const treasureMessage = document.getElementById("treasureMessage");
const inventoryItems = document.getElementById("inventoryItems");
const loadingIndicator = document.getElementById("loadingIndicator");
const sceneContent = document.getElementById("sceneContent");
const rubyTracker = document.getElementById("rubyTracker");
const emeraldTracker = document.getElementById("emeraldTracker");
const sapphireTracker = document.getElementById("sapphireTracker");
const backgroundMusic = document.getElementById("backgroundMusic");
const playPauseBtn = document.getElementById("playPauseMusic");
const prevMusicBtn = document.getElementById("prevMusic");
const nextMusicBtn = document.getElementById("nextMusic");
const volumeSlider = document.getElementById("volumeSlider");
const locationCards = document.querySelectorAll('.location-card');

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 验证场景是否存在
function validateScene(sceneKey) {
    if (!gameScenes[sceneKey]) {
        console.error(`场景不存在: ${sceneKey}`);
        addLogEntry(`错误: 无法找到场景 "${sceneKey}"`, "error");
        return false;
    }
    return true;
}

// 初始化游戏
function initGame() {
    const savedGame = localStorage.getItem('treasureHuntGame');
    
    if (savedGame) {
        try {
            const gameState = JSON.parse(savedGame);
            currentScene = gameState.currentScene || "start";
            gameProgress = gameState.gameProgress || 0;
            inventory = gameState.inventory || [];
            placedGems = gameState.placedGems || {
                ruby: false,
                emerald: false,
                sapphire: false
            };
            
            addLogEntry("已加载保存的游戏进度", "info");
        } catch (e) {
            console.error("加载游戏状态失败:", e);
            resetToDefault();
        }
    } else {
        resetToDefault();
    }
    
    updateSceneUI(currentScene);
    updateProgress(gameProgress);
    updateInventory();
    updateGemTracker();
    
    logContainer.innerHTML = '';
    addLogEntry("欢迎来到迷宫寻宝大冒险！你的选择将决定你的命运...", "info");
    addLogEntry("提示: 探索神秘花园可以找到宝石，将它们放置在古老祭坛上可以打开宝藏之门。", "info");
    
    treasure.classList.remove('treasure-visible');
    startBtn.disabled = false;
    resetBtn.disabled = true;
    
    sceneConsequence.textContent = "";
    sceneConsequence.className = "scene-consequence";
}

// 重置到默认状态
function resetToDefault() {
    currentScene = "start";
    gameProgress = 0;
    inventory = [];
    placedGems = {
        ruby: false,
        emerald: false,
        sapphire: false
    };
}

// 保存游戏状态
function saveGameState() {
    const gameState = {
        currentScene,
        gameProgress,
        inventory,
        placedGems
    };
    
    try {
        localStorage.setItem('treasureHuntGame', JSON.stringify(gameState));
    } catch (e) {
        console.error("保存游戏状态失败:", e);
        addLogEntry("警告: 无法保存游戏进度", "warning");
    }
}

// 播放场景音乐
function playSceneMusic(sceneKey, isOverview = false) {
    if (isOverview) {
        const musicConfig = sceneMusic.default;
        if (currentMusic !== musicConfig.url || !isMusicPlaying) {
            backgroundMusic.src = musicConfig.url;
            currentMusic = musicConfig.url;
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                playPauseBtn.textContent = "⏸️";
                addLogEntry(`正在播放: ${musicConfig.name}`, "info");
            }).catch(error => {
                console.error("播放音乐失败:", error);
                addLogEntry("无法播放背景音乐，请与网站交互后重试", "warning");
                isMusicPlaying = false;
                playPauseBtn.textContent = "▶️";
            });
        }
        return;
    }
    
    const musicKey = getSceneMusicKey(sceneKey);
    const musicConfig = sceneMusic[musicKey] || sceneMusic.default;
    
    if (currentMusic !== musicConfig.url || !isMusicPlaying) {
        backgroundMusic.src = musicConfig.url;
        currentMusic = musicConfig.url;
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            playPauseBtn.textContent = "⏸️";
            addLogEntry(`正在播放: ${musicConfig.name}`, "info");
        }).catch(error => {
            console.error("播放音乐失败:", error);
            addLogEntry("无法播放背景音乐，请与网站交互后重试", "warning");
            isMusicPlaying = false;
            playPauseBtn.textContent = "▶️";
        });
    }
}

// 切换音乐播放状态
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        playPauseBtn.textContent = "▶️";
        isMusicPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            playPauseBtn.textContent = "⏸️";
            isMusicPlaying = true;
        }).catch(error => {
            console.error("播放音乐失败:", error);
            addLogEntry("无法播放背景音乐", "warning");
        });
    }
}

// 切换到下一个音乐
function nextMusic() {
    const sceneKeys = Object.keys(sceneMusic);
    const currentIndex = sceneKeys.findIndex(key => sceneMusic[key].url === currentMusic);
    const nextIndex = (currentIndex + 1) % sceneKeys.length;
    const nextSceneKey = sceneKeys[nextIndex];
    
    playSceneMusic(nextSceneKey);
}

// 切换到上一个音乐
function prevMusic() {
    const sceneKeys = Object.keys(sceneMusic);
    const currentIndex = sceneKeys.findIndex(key => sceneMusic[key].url === currentMusic);
    const prevIndex = (currentIndex - 1 + sceneKeys.length) % sceneKeys.length;
    const prevSceneKey = sceneKeys[prevIndex];
    
    playSceneMusic(prevSceneKey);
}

// 调整音量
function adjustVolume() {
    backgroundMusic.volume = volumeSlider.value;
}

// 添加日志条目
function addLogEntry(message, type = 'info') {
    try {
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    } catch (error) {
        console.error("添加日志失败:", error);
    }
}

// 更新进度条
function updateProgress(percentage) {
    try {
        gameProgress = Math.min(100, Math.max(0, percentage));
        progressBar.style.width = `${gameProgress}%`;
    } catch (error) {
        console.error("更新进度失败:", error);
        addLogEntry("更新进度时出错", "error");
    }
}

// 更新宝石追踪器
function updateGemTracker() {
    rubyTracker.classList.toggle('placed', placedGems.ruby);
    emeraldTracker.classList.toggle('placed', placedGems.emerald);
    sapphireTracker.classList.toggle('placed', placedGems.sapphire);
}

// 更新场景UI
function updateSceneUI(sceneKey) {
    try {
        if (!validateScene(sceneKey)) return;
        
        const scene = gameScenes[sceneKey];
        currentScene = sceneKey;
        
        sceneTitle.textContent = scene.title || "未知场景";
        sceneImage.textContent = scene.image || "❓";
        sceneDescription.textContent = scene.description || "场景描述缺失";
        
        if (scene.consequence) {
            sceneConsequence.textContent = scene.consequence;
            sceneConsequence.className = "scene-consequence dead-end";
        } else {
            sceneConsequence.textContent = "";
            sceneConsequence.className = "scene-consequence";
        }
        
        renderChoiceButtons(scene.choices || []);
    } catch (error) {
        console.error("更新场景UI失败:", error);
        addLogEntry("更新场景显示时出错", "error");
    }
}

// 异步更新场景
async function updateScene(sceneKey) {
    try {
        if (!validateScene(sceneKey)) {
            addLogEntry("尝试恢复到上一场景...", "warning");
            await delay(1000);
            updateSceneUI(currentScene);
            return;
        }
        
        loadingIndicator.classList.add('active');
        sceneContent.style.display = 'none';
        
        await delay(1000);
        
        const scene = gameScenes[sceneKey];
        currentScene = sceneKey;
        
        sceneTitle.textContent = scene.title || "未知场景";
        sceneImage.textContent = scene.image || "❓";
        sceneDescription.textContent = scene.description || "场景描述缺失";
        
        if (scene.consequence) {
            sceneConsequence.textContent = scene.consequence;
            sceneConsequence.className = "scene-consequence dead-end";
        } else {
            sceneConsequence.textContent = "";
            sceneConsequence.className = "scene-consequence";
        }
        
        if (scene.rewardItem && !inventory.includes(scene.rewardItem)) {
            await delay(500);
            addLogEntry(`你获得了: ${scene.rewardItem}`, "success");
            inventory.push(scene.rewardItem);
            updateInventory();
        }
        
        if (sceneKey === 'treasureChamber' || sceneKey === 'treasure') {
            await delay(800);
            treasure.classList.add('treasure-visible');
            treasureMessage.textContent = "恭喜你找到了传说中的宝藏！";
            addLogEntry("你成功找到了宝藏！游戏完成！", "success");
            resetBtn.disabled = false;
            gameActive = false;
        }
        
        renderChoiceButtons(scene.choices || []);
        
        loadingIndicator.classList.remove('active');
        sceneContent.style.display = 'block';
        
        addLogEntry(`你来到了: ${scene.title || "未知场景"}`, "info");
        
        if (scene.consequence) {
            addLogEntry(scene.consequence, "error");
        }
        
        playSceneMusic(sceneKey);
        saveGameState();
        
    } catch (error) {
        console.error("更新场景时出错:", error, "场景ID:", sceneKey);
        addLogEntry(`探索过程中出现错误: ${error.message || "未知错误"}。尝试恢复...`, "error");
        
        try {
            loadingIndicator.classList.remove('active');
            sceneContent.style.display = 'block';
            updateSceneUI(currentScene);
        } catch (recoverError) {
            console.error("恢复场景时出错:", recoverError);
            addLogEntry("错误恢复失败，请点击重新开始", "error");
        }
    }
}

// 渲染选择按钮
function renderChoiceButtons(choices) {
    try {
        choiceButtons.innerHTML = '';
        
        if (!choices || choices.length === 0) {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = "返回上一级";
            button.dataset.next = currentScene;
            button.disabled = !gameActive;
            button.addEventListener('click', async () => {
                await makeChoice({id: currentScene, text: "返回上一级", progress: 0});
            });
            choiceButtons.appendChild(button);
            return;
        }
        
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text || "未知选项";
            button.dataset.next = choice.id;
            
            if (choice.requiredItem && !inventory.includes(choice.requiredItem)) {
                button.disabled = true;
                button.title = `需要 ${choice.requiredItem} 才能执行此操作`;
            } else {
                button.disabled = !gameActive;
            }
            
            button.addEventListener('click', async () => {
                await makeChoice(choice);
            });
            
            choiceButtons.appendChild(button);
        });
    } catch (error) {
        console.error("渲染选择按钮失败:", error);
        addLogEntry("加载选项时出错", "error");
    }
}

// 更新物品栏
function updateInventory() {
    try {
        inventoryItems.innerHTML = '';
        
        if (inventory.length === 0) {
            const emptyItem = document.createElement('div');
            emptyItem.className = 'inventory-item';
            emptyItem.textContent = '暂无物品';
            inventoryItems.appendChild(emptyItem);
            return;
        }
        
        inventory.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            
            let icon = '🎁';
            if (item.includes('钥匙')) icon = '🔑';
            if (item.includes('宝石')) icon = '💎';
            if (item.includes('地图')) icon = '🗺️';
            if (item.includes('金币')) icon = '💰';
            
            itemElement.innerHTML = `${icon} ${item}`;
            inventoryItems.appendChild(itemElement);
        });
    } catch (error) {
        console.error("更新物品栏失败:", error);
        addLogEntry("更新物品时出错", "error");
    }
}

// 异步处理随机事件（已移除宝石获取）
async function handleRandomEvent() {
    try {
        const randomEvents = [
            { message: "你发现了一枚闪闪发光的金币！", type: "success", item: "金币" },
            { message: "一阵风吹过，带来了远处的奇怪声音...", type: "info" },
            { message: "你似乎听到身后有脚步声，但回头什么也没有...", type: "warning" },
            { message: "墙壁上的火把突然闪烁了几下...", type: "info" },
        ];
        
        if (Math.random() < 0.3) {
            const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
            await delay(800);
            addLogEntry(event.message, event.type);
            
            if (event.item && !inventory.includes(event.item)) {
                inventory.push(event.item);
                updateInventory();
                saveGameState();
            }
        }
    } catch (error) {
        console.error("处理随机事件失败:", error);
    }
}

// 异步做出选择
async function makeChoice(choice) {
    if (!gameActive) return;
    
    try {
        if (!choice || !choice.id) {
            addLogEntry("无效的选择", "error");
            return;
        }
        
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(button => button.disabled = true);
        
        addLogEntry(`你选择了: ${choice.text || "未知选项"}`, "info");
        
        if (choice.progress !== undefined) {
            updateProgress(gameProgress + choice.progress);
        }
        
        if (choice.id === 'placeRuby' || choice.id === 'placeEmerald' || choice.id === 'placeSapphire') {
            const gemType = choice.id === 'placeRuby' ? '红宝石' : 
                          choice.id === 'placeEmerald' ? '绿宝石' : '蓝宝石';
            
            if (inventory.includes(gemType)) {
                const index = inventory.indexOf(gemType);
                if (index > -1) {
                    inventory.splice(index, 1);
                    updateInventory();
                }
                
                if (gemType === '红宝石') placedGems.ruby = true;
                if (gemType === '绿宝石') placedGems.emerald = true;
                if (gemType === '蓝宝石') placedGems.sapphire = true;
                
                updateGemTracker();
                addLogEntry(`你成功放置了${gemType}！`, "success");
                
                const hasAllGems = placedGems.ruby && placedGems.emerald && placedGems.sapphire;
                
                if (hasAllGems) {
                    await delay(1000);
                    await updateScene('altarPuzzle');
                } else {
                    await delay(500);
                    await updateScene('ancientAltar');
                }
                
                saveGameState();
            } else {
                addLogEntry(`你没有${gemType}，无法执行此操作！`, "error");
                buttons.forEach(button => {
                    const requiredItem = gameScenes[currentScene].choices.find(
                        c => c.id === button.dataset.next
                    )?.requiredItem;
                    button.disabled = !gameActive || (requiredItem && !inventory.includes(requiredItem));
                });
            }
            return;
        }
        
        await delay(500);
        await updateScene(choice.id);
        
        await handleRandomEvent();
        
    } catch (error) {
        console.error("处理选择时出错:", error);
        addLogEntry(`做出选择时出错: ${error.message || "未知错误"}`, "error");
        
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(button => {
            const requiredItem = gameScenes[currentScene].choices.find(
                c => c.id === button.dataset.next
            )?.requiredItem;
            button.disabled = !gameActive || (requiredItem && !inventory.includes(requiredItem));
        });
    }
}

// 开始游戏
function startGame() {
    gameActive = true;
    startBtn.disabled = true;
    resetBtn.disabled = false;
    addLogEntry("游戏开始！祝你好运，探险家！", "success");
    renderChoiceButtons(gameScenes[currentScene].choices || []);
    
    playSceneMusic(currentScene);
    saveGameState();
}

// 重置游戏
function resetGame() {
    addLogEntry("游戏将重新开始...", "info");
    
    localStorage.removeItem('treasureHuntGame');
    
    setTimeout(() => {
        resetToDefault();
        initGame();
    }, 1000);
}

// 切换到全景页面
function showOverview() {
    gameContainer.style.display = 'none';
    overviewContainer.style.display = 'flex';
    playSceneMusic(null, true);
}

// 切换到游戏页面
function showGame(sceneKey = null) {
    overviewContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    
    if (sceneKey) {
        updateScene(sceneKey);
    } else {
        playSceneMusic(currentScene);
    }
}

// 绑定事件监听器
function bindEvents() {
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    backToOverviewBtn.addEventListener('click', showOverview);
    playPauseBtn.addEventListener('click', toggleMusic);
    prevMusicBtn.addEventListener('click', prevMusic);
    nextMusicBtn.addEventListener('click', nextMusic);
    volumeSlider.addEventListener('input', adjustVolume);
    
    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            const sceneKey = card.getAttribute('data-scene');
            showGame(sceneKey);
        });
    });
}

// 初始化应用
function initApp() {
    backgroundMusic.volume = volumeSlider.value;
    bindEvents();
    initGame();
    showOverview();
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);