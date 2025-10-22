// 音乐配置 
export const sceneMusic = {
    start: { url: "/music/tushuquan.mp3", name: "古老图书馆音乐" },
    mainHall: { url: "/music/hall.mp3", name: "中央大厅音乐" },
    eastShelves: { url: "/music/shujiaqu.mp3", name: "书架区音乐" },
    westStudy: { url: "/music/yanjiushi.mp3", name: "研究室音乐" },
    basement: { url: "/music/dixiashi.mp3", name: "地下室音乐" },
    templeEntrance: { url: "/music/shenmiao.mp3", name: "神庙音乐" },
    default: { url: "/music/maoxian.mp3", name: "冒险音乐" }
};

// 完整的游戏场景数据
export const gameScenes = {
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

// 场景父子关系映射
export const sceneParentMap = {
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