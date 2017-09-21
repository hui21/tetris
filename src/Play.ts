/**
 * Created by feizhugame on 2017/9/6.
 */
module Play {
    import Stage = Uilt.Stage;
    import UniltGame = Uilt.Game;
    import GameStatus = Uilt.GameStatus;
    import Tool = Uilt.Tool;
    import AnchorUtils = Uilt.AnchorUtils;
    //游戏开始菜单页面和基础游戏信息
    export class Game extends egret.Sprite {
        private Score: number = 0;//分数
        private Level: number = 1;//关卡
        public menuTween: egret.tween.TweenGroup;//菜单动画
        public startBtn: eui.BitmapLabel;//点击按钮
        public static _interval:Game;
        public static get interval(): Game{
            return (this._interval || (this._interval = new Game));
        }

        public constructor() {
            super()
            this.Init()
        }

        /**
         * 初始化
         * @returns {Game}
         * @constructor
         */
        public Init(): void{
            AnchorUtils.init() // 初始化锚点类
            let menu: Menu = new Menu()
            Stage.stage.addChild(menu)
        }

        /**
         * 开始游戏按钮监听事件
         */
        private startBtnClickEvent(): void {
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnClickEvent, this)
            Stage.stage.removeChildren()
            /*Stage.stage.addChild(grid.interval)
            Stage.stage.addChild(cudeData.interval)
            cudeData.interval.createRandOneCude();*/
        }

    }
    //菜单
    export class Menu extends egret.Sprite {
        public group: egret.Sprite = new egret.Sprite() //菜单组
        public gameName: egret.Sprite = new egret.Sprite() //游戏名字
        public startBtn: egret.Sprite //开始游戏按钮
        public aboutBtn: egret.Sprite //关于游戏按钮
        public explainBtn: egret.Sprite //操作介绍按钮
        public settingBtn: egret.Sprite //设置按钮
        private btnColor: number = 0xe0690c //按钮默认颜色
        private btnRound: number = 10 //默认圆角大小
        private btnHeight: number = 60 //按钮默认高度
        private btnWidth: number = 200 //按钮默认宽度
        private fontColor: number = 0xffffff //字体颜色
        public constructor(){
            super()
            this.init()
        }
        public init(): void {
            Stage.stage.addChild(grid.interval)
            Stage.stage.addChild(panel.interval)
            //面板
            this.groupDraw()
            this.gameNameDraw()
            this.addChild(this.gameName)
            this.addChild(this.group)
            let btnX: number = (this.group.width - this.btnWidth)/2
            this.startBtn = this.drawBtn(btnX, 0, "开始游戏")
            this.explainBtn = this.drawBtn(btnX, (this.btnHeight+20)*1, "操作介绍")
            this.settingBtn = this.drawBtn(btnX, (this.btnHeight+20)*2, "游戏设置")
            this.aboutBtn = this.drawBtn(btnX, (this.btnHeight+20)*3, "关于游戏")
            this.group.addChild(this.startBtn)
            this.group.addChild(this.aboutBtn)
            this.group.addChild(this.explainBtn)
            this.group.addChild(this.settingBtn)
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnFunc, this)
        }

        /**
         * 绘制游戏名称
         */
        private gameNameDraw(): void {
            let nameText: egret.TextField = new egret.TextField()
            this.gameName.width = Stage.stageW
            this.gameName.y = -80
            this.gameName.addChild(nameText)
            nameText.text = "俄罗斯方块"
            nameText.width = this.gameName.width
            nameText.textAlign = "center"
            nameText.x = (Stage.stageW - this.gameName.width)/2
            nameText.textColor = this.btnColor
            nameText.fontFamily = "楷体"
            nameText.size = 80
            egret.Tween.get(this.gameName).to({
                y: 350
            }, 600, egret.Ease.backInOut).call((target) => {
                egret.Tween.removeTweens(target)
            }, this, [this.gameName])
        }

        /**
         * 绘制菜单组
         */
        private groupDraw(): void {
            this.group.width = 400
            this.group.height = 300
            this.group.alpha = 0
            this.group.x = (Stage.stageW-this.group.width)/2
            this.group.y = (Stage.stageH-this.group.height)/1.5
            //this.group.graphics.beginFill(0x3bb4f2)
            this.group.graphics.drawRoundRect( 0, 0, this.group.width, this.group.height, 10, 10)
            this.group.graphics.endFill()
            egret.Tween.get(this.group).to({
                alpha: 1
            }, 2000, egret.Ease.backInOut).call((target) => {
                egret.Tween.removeTweens(target)
            }, this, [this.group])

        }

        private startBtnFunc(): void {
            Stage.stage.removeChild(this)
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnFunc, this)
            Stage.stage.addChild(cudeData.interval)
            cudeData.interval.createRandOneCude()

            UniltGame.interval.setGameStatus(GameStatus.Start)
        }

        /**
         * 画按钮
         * @param x X值
         * @param y Y值
         * @returns {egret.Sprite}
         */
        private drawBtn(x:number, y: number, textField: string): egret.Sprite {
            let btn: egret.Sprite = new egret.Sprite(),
                text: egret.TextField = new egret.TextField()
            btn.addChild(text)
            btn.x = x
            btn.y = y
            btn.graphics.beginFill(this.btnColor)
            btn.graphics.drawRoundRect( 0, 0, this.btnWidth, this.btnHeight, this.btnRound, this.btnRound);
            btn.graphics.endFill();
            btn.touchEnabled = true

            text.y = 15
            text.width = this.btnWidth
            text.height = this.btnHeight
            text.text = textField
            text.textAlign = "center"
            text.textColor = this.fontColor
            return btn
        }
    }
    //面板
    export class panel extends egret.Sprite {
        private timerTitleText: egret.TextField = new egret.TextField //时间标题
        private timerText: egret.TextField = new egret.TextField //时间
        private scoreTitleText: egret.TextField = new egret.TextField //分数标题
        private scoreText: egret.TextField = new egret.TextField //分数
        private timeGroup: egret.Sprite = new egret.Sprite //时间组
        private scoreGroup: egret.Sprite = new egret.Sprite //分数组
        public constructor(){
            super()
            this.init()
        }
        public static _interval:panel;
        public static get interval(): panel{
            return (this._interval || (this._interval = new panel))
        }
        //初始化面板
        private init(): void {
            this.width = Stage.stageW
            this.height = grid.topRow * grid.gridSize

            this.timeGroup.x = 0
            this.timeGroup.width = this.width / 2
            this.timeGroup.height = grid.topRow * grid.gridSize

            this.scoreGroup.x = this.width/2
            this.scoreGroup.width = this.width/2
            this.scoreGroup.height = grid.topRow * grid.gridSize

            this.addChild(this.timeGroup)
            this.addChild(this.scoreGroup)

            this.timerTitleText.width = this.timeGroup.width
            this.timerTitleText.text = "Timer: "
            this.timerTitleText.textAlign = "center"
            this.timeGroup.addChild(this.timerTitleText)

            this.timerText.y = grid.gridSize
            this.timerText.text = "0"
            this.timerText.width = this.timerTitleText.width
            this.timerText.textAlign = "center"
            this.timeGroup.addChild(this.timerText)

            this.scoreTitleText.text = "Score: "
            this.scoreTitleText.width = this.scoreGroup.width
            this.scoreTitleText.textAlign = "center"
            this.scoreGroup.addChild(this.scoreTitleText)

            this.scoreText.y = grid.gridSize
            this.scoreText.text = "0"
            this.scoreText.width = this.scoreTitleText.width
            this.scoreText.textAlign = "center"
            this.scoreGroup.addChild(this.scoreText)
        }
        //设置分数
        public set score(val: number) {
            UniltGame.interval.incScore(val)
            this.scoreText.text = String(UniltGame.interval.getScore())
        }
        //设置时间
        public time() {
            UniltGame.interval.incNowTimeer()
            this.timerText.text = String(UniltGame.interval.getNowTime())
        }

        //重置数据
        public restart(): void {
            this.timerText.text = "0"
            this.scoreText.text = "0"
        }
    }
    //格子容器对象
    export class grid extends egret.Sprite {

        public static _interval:grid;
        public static get interval(): grid{
            return (this._interval || (this._interval = new grid));
        }

        /**
         * 获取格子大小
         */
        public static get gridSize(): number {
            return 63;
        }
        public constructor() {
            super()
            this.width = grid.gridItemCols * grid.gridSize
            this.height = Stage.stageH - grid.gridSize*1.8
            this.x = (Stage.stageW - grid.gridItemCols * grid.gridSize) / 2
            AnchorUtils.setAnchor(this, 0)
            this.initGrid()
        }

        //格子总列数
        public static get gridItemCols(): number {
            return 10;
        }
        //格子总行数
        public static get gridItemRows(): number {
            return 16
        }
        //距离顶部
        public static get topRow(): number {
            return 2
        }
        //画格子
        public gridMaps: Array<gridMap> = [];
        public initGrid(): void {
            this.y = grid.gridSize * grid.topRow
            for(let x = 0; x <= grid.gridItemCols; x++){
                let gridItemX = new gridLine((x * grid.gridSize), 0, 0, this.height)
                this.addChild(gridItemX)
                this.gridMaps.push(new gridMap(x, 0))//添加位置到数组中
            }
            for (let y = 0; y <= grid.gridItemRows; y++) {
                let gridItemY = new gridLine(0, (y * grid.gridSize), this.width, 0)
                this.addChild(gridItemY)
                this.gridMaps.push(new gridMap(0, y))//添加位置到数组中
            }
        }
    }
    //格子对象
    export class gridMap {
        public x;//X轴
        public y;//Y轴
        public isEmpty;//是否为空
        /**
         * 对象
         * @param x X位置
         * @param y Y位置
         * @param isEmpty 是否为空
         */
        public constructor(x, y,  isEmpty:boolean = true){
            this.x = x;
            this.y = y;
            this.isEmpty = isEmpty;
        }
    }
    //方块类型枚举
    export enum cudeType {
        Type0 = 0,
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
        Type5 = 5,
        end
    }
    //方块
    export class cude extends egret.Sprite {
        public x:number
        public y:number
        public color: number = 0xa01311
        public posY:number//原始Y坐标
        public posX:number//原始X坐标
        public sorce: number = 1 //分数
        public constructor(x, y, w, h){
            super();
            this.posX = x
            this.posY = y
            this.x = cudeData.posTo(x)
            this.y = cudeData.posTo(y)
            AnchorUtils.setAnchor(this, 0.5)

            this.graphics.beginFill(this.color);
            this.graphics.drawRoundRect( 0, 0, w, h, 10, 10);
            this.graphics.endFill();
        }

        /**
         * 获取方块大小
         * @returns {number}
         */
        public static get cudeSize(): number {
            return 62;
        }

        /**
         * 检测是否是本身
         * @param hashCode
         * @returns {boolean}
         */
        public isSelf(hashCode: number): boolean {
            return this.hashCode === hashCode
        }
    }

    //按键事件枚举
    export enum KeyCode {
        KeyLeft = 37,//←
        KeyUp = 38,//↑
        KeyRight = 39,//→
        KeyDown = 40,//↓
        KeySpace = 13,//空格暂停
    }
    //方块位置数据
    export class cudePosXY {
        public x;//X坐标
        public y;//Y坐标
        public posX;//原始X坐标
        public posY;//原始Y坐标
        public constructor(x, y, posX, posY){
            this.x = x
            this.y = y
            this.posX = posX
            this.posY = posY
        }
    }

    //游戏结束面板
    export class gameOver extends egret.Sprite {
        public maskMap: egret.Shape = new egret.Shape() //遮罩
        public group: egret.Sprite = new egret.Sprite() //组件
        public restartBtn: egret.Sprite = new egret.Sprite() //重新开始按钮
        public constructor(){
            super()
            this.width = Stage.stageW
            this.height = Stage.stageH
            this.init()
        }

        //初始化
        private init(): void {
            this.x = 0
            this.y = 0
            this.maskMap.graphics.beginFill( 0x000 )
            this.maskMap.graphics.drawRect( 0,0,this.width,this.height)
            this.maskMap.graphics.endFill()
            this.maskMap.alpha = 0.6
            this.addChild( this.maskMap )

            //面板
            this.group.width = 400
            this.group.height = 300
            this.group.alpha = 0
            this.group.x = (Stage.stageW-this.group.width)/2
            this.group.y = (Stage.stageH-this.group.height)/2
            this.group.graphics.beginFill(0x3bb4f2)
            this.group.graphics.drawRoundRect( 0, 0, this.group.width, this.group.height, 10, 10)
            this.group.graphics.endFill()
            this.addChild(this.group)

            //重新开始按钮
            this.restartBtn.graphics.beginFill(0xe0690c)
            this.restartBtn.graphics.drawRoundRect( 100, this.group.height-90, 200, 60, 10, 10);
            this.restartBtn.graphics.endFill();
            this.group.addChild(this.restartBtn)
            this.restartBtn.touchEnabled = true
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartFunc, this)

            //重新开始文字
            let restartText: egret.TextField = new egret.TextField()
            restartText.x = 100
            restartText.y = this.group.height-77
            restartText.width = 200
            restartText.height = 60
            restartText.text = "重新开始"
            restartText.textAlign = "center"
            restartText.textColor = 0xffffff
            this.group.addChild(restartText)

            //分数
            let scoreTitleText: egret.TextField = new egret.TextField()
            scoreTitleText.y = 60
            scoreTitleText.width = this.group.width/2
            scoreTitleText.text = "分数"
            scoreTitleText.textAlign = "center"
            let scoreText: egret.TextField = new egret.TextField()
            scoreText.width = this.group.width/2
            scoreText.y = scoreTitleText.y+60
            scoreText.textAlign = "center"
            scoreText.text = String(UniltGame.interval.getScore())
            this.group.addChild(scoreTitleText)
            this.group.addChild(scoreText)

            //时间
            let timeTitleText: egret.TextField = new egret.TextField()
            timeTitleText.x = this.group.width/2
            timeTitleText.y = 60
            timeTitleText.width = this.group.width/2
            timeTitleText.text = "用时"
            timeTitleText.textAlign = "center"
            let timeText: egret.TextField = new egret.TextField()
            timeText.x = this.group.width/2
            timeText.y = timeTitleText.y+60
            timeText.width = this.group.width/2
            timeText.textAlign = "center"
            timeText.text = String(UniltGame.interval.getNowTime())
            this.group.addChild(timeTitleText)
            this.group.addChild(timeText)

            //显示、抖动效果
            egret.Tween.get(this.group).to({
                alpha: 1
            }, 1000, egret.Ease.circOut).wait(600).to({
                x: this.group.x-10
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x+10
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x
            }, 50, egret.Ease.backInOut).call((group)=>{
                egret.Tween.removeTweens(group)
            }, this, [this.group])
        }

        //重新开始按钮点击事件
        private restartFunc(e: egret.Event){
            this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartFunc, this)
            Stage.stage.removeChild(this)
            //重置数据
            panel.interval.restart()
            cudeData.interval.cudes = []
            cudeData.interval.nowCude = []
            cudeData.interval.removeChildren()
            cudeData.interval.nowSpeed = 400
            cudeData.interval.speedTimer.reset()
            cudeData.interval.speedTimer.start()
            cudeData.interval.gameTimer.reset()
            cudeData.interval.gameTimer.start()
            UniltGame.interval.restart()
            cudeData.interval.createRandOneCude()
        }
    }
    //方块数据
    export class cudeData extends egret.Sprite {
        public cudes: Array<cude> = [] //方块集合
        public nowCude: Array<cude> = [] //当前正在前进的方块
        public nowCudeType: cudeType //当前正在前进的方块类型
        public nowSpeed:number = 400 //当前速度
        public speedTimer: egret.Timer //速度时间对象
        public gameTimer: egret.Timer //游戏时间对象
        private isMove: boolean = true //当前方块组是否在移动
        private canMove: boolean = true //是否可以移动
        private moveNewPosXy: Array<cudePosXY> = [] //移动时新的位置数组
        public static _interval: cudeData;
        public static get interval(): cudeData {
            return (this._interval || (this._interval = new cudeData));
        }
        /*private isTouch: boolean = false //是否在滑动
        private touchX: number = 0 //开始滑动的点X值
        private touchY: number = 0 //开始滑动点的Y值*/
        public constructor(){
            super()
            this.y = grid.interval.y
            this.x = grid.interval.x
            this.width = grid.interval.width
            this.height = grid.interval.height
            this.touchEnabled = true
            /*this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);*/
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                console.log(123456)
            },this);
            //按键事件侦听
            window.addEventListener('keydown', (e) => {
                switch (e.keyCode){
                    case KeyCode.KeyLeft:
                        this.KeyLeft();
                        break;
                    case KeyCode.KeyUp:
                        this.KeyUp();
                        break;
                    case KeyCode.KeyRight:
                        this.KeyRight();
                        break;
                    case KeyCode.KeyDown:
                        this.KeyDown();
                        break;
                    case KeyCode.KeySpace:
                        this.KeySpace();
                        break;
                    default:
                        break;
                }
            }, false)
            //速度时间
            this.speedTimer = new egret.Timer(this.nowSpeed, 0);
            this.speedTimer.addEventListener(egret.TimerEvent.TIMER,this.speedTimerFunc,this);
            this.speedTimer.start();

            //游戏时间
            this.gameTimer = new egret.Timer(1000, 0);
            this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.gameTimerFunc,this);
            this.gameTimer.start();
        }
        /*private touchBegin(e: egret.TouchEvent): void {
            console.log(123)
            this.isTouch = true
            this.touchX = e.localX
            this.touchY = e.localY
        }
        private touchEnd(e: egret.TouchEvent): void {
            let xDiff: number = (e.localX-this.touchX),
                yDiff: number = (e.localY-this.touchY)
            console.log(xDiff, yDiff)
            if(Math.abs(xDiff) > Math.abs(yDiff)){
                if(xDiff > 100){
                    this.KeyRight()
                }else if(xDiff < -100){
                    this.KeyLeft()
                }
            }else{
                if(yDiff > 100){
                    this.KeyDown()
                }else if(yDiff < -100){
                    this.KeyUp()
                }
            }
            this.touchY = 0
            this.touchX = 0
            this.isTouch = false
        }*/

        /**
         * 速度回调函数
         * @returns {boolean}
         */
        public speedTimerFunc(): void {
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            if(this.isMove){
                if(this.canDown()){
                    this.resetCanMoveAndMoveNewPosXy()
                    for(let i = 0; i < this.nowCude.length; i++){
                        let newY: number = this.nowCude[i].posY+1 //检测碰撞，获取新的坐标值
                        //是否超出格子
                        if(this.isOverGrid(newY, KeyCode.KeyDown)){
                            this.canMove = false
                            break;
                        }
                        let newXy = new cudePosXY(0,0, this.nowCude[i].posX, newY)
                        this.moveNewPosXy.push(newXy)
                    }
                    this.pos(this.moveNewPosXy)
                }else{
                    this.isMove = false
                    for(let i = 0; i < this.nowCude.length; i++){
                        this.cudes.push(this.nowCude[i])
                    }
                    if(!this.canDown()) this.remove() //消除
                }
            }else{
                console.log("not move")
                if(this.isGameOVer()){
                    this.speedTimer.stop()
                    this.gameTimer.stop()
                    let gameOverMap: gameOver = new gameOver()
                    Stage.stage.addChild(gameOverMap)
                }
                cudeData.interval.createRandOneCude() //创建一个类型方块组
                this.isMove = true
            }
        }

        /**
         * 将当前的方块组添加到视图方块组中
         */
        private nowCudeToCudes(): void {
            for(let i = 0; i < this.nowCude.length; i++){
                //添加方块对象到视图方块组
                this.cudes.push(this.nowCude[i])
            }
        }
        /**
         * 游戏是否结束
         * @returns {boolean}
         */
        private isGameOVer(): boolean {
            let cudes: Array<cude> = this.ArrSortAsc(this.cudes)
            if(cudes[0].posY <= 0){
                Uilt.Game.interval.setGameStatus(GameStatus.Died)
                return true
            }
            return false
        }

        /**
         * 时间回调
         */
        public gameTimerFunc(): void {
            if(UniltGame.interval.getGameStatus() === GameStatus.Start){
                panel.interval.time()
                this.speedTimer.delay = this.nowSpeed - (UniltGame.interval.getNowTime()/10) //定时器间隔随时间变化
            }
        }

        /**
         * 是否能下落
         * @returns {boolean}
         */
        private canDown(): boolean {
            let status: boolean = true;
            for(let i = 0; i < this.nowCude.length; i++){
                if(
                    this.isOverGrid(this.nowCude[i].posY+1, KeyCode.KeyDown) ||
                    this.isPosXy(this.nowCude[i].posX, this.nowCude[i].posY+1)
                ){
                    status = false;
                    break;
                }
            }
            return status
        }

        /**
         * 重设对象属性
         */
        private resetCanMoveAndMoveNewPosXy(): void {
            this.canMove = true
            this.moveNewPosXy = []
        }

        /**
         * 旋转/变形
         * @returns {boolean}
         * @constructor
         */
        private KeyUp(): void{
            //如果游戏状态不为开始/运行状态则直接返回
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            if(this.nowCudeType === cudeType.Type1 || this.nowCudeType === cudeType.Type0) return;
            let canRotate: boolean = true,
                newPosXy: Array<cudePosXY> = []
            for(let i = 0; i < this.nowCude.length; i++){
                let newXy = this.rotatePoint(this.nowCude[2], this.nowCude[i])
                if(this.isOverGrid(newXy.posX, KeyCode.KeyLeft) ||
                    this.isOverGrid(newXy.posX, KeyCode.KeyRight) ||
                    this.isOverGrid(newXy.posY, KeyCode.KeyDown)
                ){
                    canRotate = false
                    break;
                }
                newPosXy.push(newXy)
            }
            if(canRotate){
                for(let i = 0; i < this.nowCude.length; i++){
                    this.nowCude[i].x = newPosXy[i].x
                    this.nowCude[i].y = newPosXy[i].y
                    this.nowCude[i].posX = newPosXy[i].posX
                    this.nowCude[i].posY = newPosXy[i].posY
                }
            }
        }

        /**
         * 下移动
         * @constructor
         */
        private KeyDown(): void {
            //如果游戏状态不为开始/运行状态则直接返回
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            //检测是否可以下落
            if(this.canDown()){
                let nowCudeYDiff: number = null
                for (let i = 0; i < this.nowCude.length; i++){
                    let diff: number = this.downDiff(this.nowCude[i])
                    if(nowCudeYDiff === null){
                        nowCudeYDiff = diff
                    }else if(nowCudeYDiff > diff){
                        nowCudeYDiff = diff
                    }
                }

                for (let i = 0; i < this.nowCude.length; i++){
                    let y: number = nowCudeYDiff+this.nowCude[i].posY
                    this.nowCude[i].y = cudeData.posTo(y)
                    this.nowCude[i].posY = y
                }
            }
        }

        /**
         * 获取掉落差值
         * @param map
         * @returns {number}
         */
        private downDiff(map: cude): number {
            if(this.cudes.length < 1){
                return grid.gridItemRows-1-map.posY
            }
            let newCudes: Array<cude> = this.ArrSortAsc(this.cudes)
            for (let i = 0; i < newCudes.length; i++){
                if(newCudes[i].posX === map.posX){
                    return newCudes[i].posY-map.posY-1
                }
            }
            return grid.gridItemRows-1-map.posY
        }

        /**
         * 左移动
         * @constructor
         */
        private KeyLeft(): void{
            //如果游戏状态不为开始/运行状态则直接返回
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            this.resetCanMoveAndMoveNewPosXy()
            for(let i = 0; i < this.nowCude.length; i++){
                if(!this.canMove) break //如果已经标记为不能移动则直接跳出循环
                let newX: number = this.nowCude[i].posX-1 //右移

                //是否超出格子、新位置是否有方块数据
                if(this.isOverGrid(newX, KeyCode.KeyLeft) || this.isPosXy(newX, this.nowCude[i].posY)){
                    this.canMove = false
                    break
                }
                // 添加新数据到移动数组中
                let newXy = new cudePosXY(0,0, newX, this.nowCude[i].posY)
                this.moveNewPosXy.push(newXy)
            }
            //如果可以移动则调用位移方法
            this.pos(this.moveNewPosXy)
        }

        /**
         * 右移
         * @constructor
         */
        private KeyRight(): void {
            //如果游戏状态不为开始/运行状态则直接返回
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            this.resetCanMoveAndMoveNewPosXy()
            for(let i = 0; i < this.nowCude.length; i++){
                if(!this.canMove) break //如果已经标记为不能移动则直接跳出循环
                let newX: number = this.nowCude[i].posX+1 //右移

                //是否超出格子、新位置是否有方块数据
                if(this.isOverGrid(newX, KeyCode.KeyRight) || this.isPosXy(newX, this.nowCude[i].posY)){
                    this.canMove = false
                    break
                }
                // 添加新数据到移动数组中
                let newXy = new cudePosXY(0,0, newX, this.nowCude[i].posY)
                this.moveNewPosXy.push(newXy)
            }
            //如果可以移动则调用位移方法
            this.pos(this.moveNewPosXy)
        }

        /**
         * 是否超出格子
         * @param posVal 第几个格子
         * @param type 类型
         * @returns {boolean}
         */
        private isOverGrid(posVal: number, type: KeyCode = KeyCode.KeyDown): boolean {
            switch (type){
                case KeyCode.KeyDown: //下落
                    return posVal === grid.gridItemRows
                case KeyCode.KeyLeft: //左移
                    return posVal === -1
                case KeyCode.KeyRight: // 右移
                    return posVal === grid.gridItemCols
                default: //默认为下落
                    return posVal === grid.gridItemRows
            }
        }

        /**
         * 暂停/开始游戏切换
         * @constructor
         */
        private KeySpace(){
            //如果游戏的状态为开始/运行的状态，则暂停
            if(UniltGame.interval.getGameStatus() === GameStatus.Start){
                UniltGame.interval.setGameStatus(GameStatus.Stop)
            }
            //如果游戏的状态为暂时则切换到开始/运行的状态
            else if(UniltGame.interval.getGameStatus() === GameStatus.Stop){
                UniltGame.interval.setGameStatus(GameStatus.Start)
            }
        }

        /**
         * 查找位置
         * @param x
         * @param y
         * @returns {boolean}
         */
        private isPosXy(x: number, y: number): boolean{
            //检测该位置是否有方块
            for (let i = 0; i < this.cudes.length; i++){
                if(this.cudes[i].posX === x && this.cudes[i].posY === y) return true;
            }
            return false;
        }

        /**
         * 检测是否可以消除
         * @param y
         * @returns {boolean}
         */
        private canRemove(y: number): boolean {
            let status: boolean = true
            for(let x = 0; x < grid.gridItemCols; x++){
                //如果该位置没有方块数据，则返回false
                if(!this.isPosXy(x, y)){
                    status = false;
                    break;
                }
            }
            return status;
        }
        /**
         * 消除
         */
        private remove(): boolean {
            let removeArr: Array<cude> = [], //需要消去的数据
                moveArr: Array<cude> = [], //需要位移的数据
                score: number = 0 //添加的分数
            //从底部开始扫描消去
            for (let y = grid.gridItemRows; y > 0; y--){
                //检测是否可以消去此行
                if(this.canRemove(y)){
                    for (let i = 0; i < this.cudes.length; i++){
                        //选择等于此行的数据
                        if(this.cudes[i].posY == y){
                            egret.Tween.removeTweens(this.cudes[i])
                            let tw: egret.Tween = egret.Tween.get(this.cudes[i])
                            tw.to({
                                scaleY: 0,
                                alpha: 0
                            }, 500, egret.Ease.backInOut).call((target)=>{
                                this.removeChild(target)
                            }, this, [this.cudes[i]])
                            removeArr.push(this.cudes[i]) //把移除对象添加到数组中
                            score += this.cudes[i].sorce //添加分数
                        }else if(y > this.cudes[i].posY){ //小于此行的数据标记为需要移动的数据
                            if(!this.inArray(this.cudes[i], moveArr)) moveArr.push(this.cudes[i])
                        }
                    }
                }
            }
            if(removeArr.length < 1) return false;
            panel.interval.score = Math.floor(score + (removeArr.length / 10)) //多行奖励分数
            //消除的数据
            for (let i = 0; i < removeArr.length; i++){
                //如果之前标记需要移动的数据已被移除则删除moveArr的相关数据
                for (let k = 0; k < moveArr.length; k++){
                    if(moveArr[k].hashCode == removeArr[i].hashCode){
                        moveArr.splice(k,1)
                    }
                }
                //删除方块数组重需要消去的数据
                for (let k = 0; k < this.cudes.length; k++){
                    if(this.cudes[k].hashCode == removeArr[i].hashCode){
                        this.cudes.splice(k,1)
                    }
                }
            }
            //移动
            let newmoveArr = this.ArrSortDesc(moveArr) //对需要移动的数据进行Y轴倒叙
            for (let i = 0; i < newmoveArr.length; i++){
                egret.Tween.removeTweens(newmoveArr[i])
                let newY: number = this.moveCudePosYCount(newmoveArr[i]), //检测碰撞，获取新的坐标值
                    tw: egret.Tween = egret.Tween.get(newmoveArr[i])
                moveArr[i].posY = newY
                tw.to({
                    y: cudeData.posTo(newY)
                }, 100).call((target: cude, y: number)=>{
                    //如果新行可以消除则调用消除方法
                    if(this.canRemove(y)) this.remove()
                }, this, [moveArr[i], newY])
            }
            return true;
        }

        /**
         * 检测是否在数据数组中
         * @param target 被检测对象
         * @param targets 数组
         * @returns {boolean}
         */
        private inArray(target: cude, targets: Array<cude>){
            for (let i = 0; i < targets.length; i++){
                if(target.hashCode === targets[i].hashCode) return true
            }
            return false
        }

        /**
         * 需要移动的位移
         * @param move
         * @returns {number}
         */
        private moveCudePosYCount(move: cude){
            let newCudes: Array<cude> = this.ArrSortAsc(this.cudes)
            for (let i = 0; i < newCudes.length; i++){
                //筛选大于move对象的posY值并X值相同的
                if(newCudes[i].posY > move.posY && newCudes[i].posX === move.posX){
                    return move.posY+Math.abs(newCudes[i].posY-move.posY)-1;
                }
            }
            return grid.gridItemRows - 1;//如果都为空则直接位移到底部
        }

        /**
         * 数组冒泡升序排序
         * @param cudes
         * @returns {Array<cude>}
         */
        private ArrSortAsc(cudes: Array<cude>): Array<cude> {
            for (let i = 1; i < cudes.length; i++){
                for (let j = 0; j < cudes.length-i; j++){
                    if(cudes[j].posY > cudes[j+1].posY){
                        let temp = cudes[j]
                        cudes[j] = cudes[j+1]
                        cudes[j+1] = temp
                    }
                }
            }
            return cudes;
        }

        /**
         * 数组倒叙排序
         * @param cudes
         * @returns {Array<cude>}
         * @constructor
         */
        private ArrSortDesc(cudes: Array<cude>): Array<cude> {
            for (let i = 1; i < cudes.length; i++){
                for (let j = 0; j < cudes.length-i; j++){
                    if(cudes[j].posY < cudes[j+1].posY){
                        let temp = cudes[j]
                        cudes[j] = cudes[j+1]
                        cudes[j+1] = temp
                    }
                }
            }
            return cudes;
        }

        /**
         * 设置移动后的位置
         * @param newPosXy
         */
        private pos(newPosXy: Array<cudePosXY>): void {
            if(!this.canMove) return; //如果不能移动则返回
            for(let i = 0; i < this.nowCude.length; i++){
                let newX: number = cudeData.posTo(newPosXy[i].posX),
                    newY: number = cudeData.posTo(newPosXy[i].posY)
                egret.Tween.removeTweens(this.nowCude[i])
                /*this.nowCude[i].posX = newPosXy[i].posX
                this.nowCude[i].posY = newPosXy[i].posY*/
                egret.Tween.get(this.nowCude[i]).to({
                    x: newX,
                    y: newY
                }, 15, egret.Ease.sineIn).set({
                    posX: newPosXy[i].posX,
                    posY: newPosXy[i].posY
                })
            }
        }

        /**
         * 原始值转结果值
         * @param value
         * @returns {number}
         */
        public static posTo(value: number){
            return value * grid.gridSize + 1+grid.gridSize/2
        }
        /**
         * 创建随机类型的方块组
         */
        public createRandOneCude(): void{
            this.nowCudeType = Math.round(Math.random() * cudeType.end)
            this.nowCude = this.cudesEffect(this.nowCudeType)
            for(let i =0; i < this.nowCude.length; i++){
                this.addChild(this.nowCude[i])
            }
        }

        /**
         * 效果方块
         * @param type
         * @param posX
         * @returns {Array<cude>}
         */
        private cudesEffect(type: cudeType): Array<cude> {
            let maps: Array<cude> = [],
                maxX = Math.floor(grid.gridItemCols / 2),//最大X轴位置
                minX = maxX - 1 //最小X轴的位置
            switch (type){
                case cudeType.Type1://田字
                    for(let x = minX; x <= maxX; x++){
                        for (let y = 1; y >= 0; y--){
                            maps.push(new cude(x, -y, cude.cudeSize, cude.cudeSize))
                        }
                    }
                    break;
                case cudeType.Type2://L字
                    for (let y = 2; y >= 0; y--){
                        for(let x = minX; x <= maxX; x++){
                            if(y < 2 && x > minX) continue;
                            maps.push(new cude(x, -y, cude.cudeSize, cude.cudeSize))
                        }
                    }
                    break;
                case cudeType.Type3://转字
                    for (let y = 2; y >= 0; y--){
                        for(let x = minX; x <= maxX; x++){
                            if((y < 1 && x > minX) || (y > 1 && x < maxX)) continue;
                            maps.push(new cude(x, -y, cude.cudeSize, cude.cudeSize))
                        }
                    }
                    break;
                case cudeType.Type4://上字
                    for (let y = 1; y >= 0; y--){
                        maps.push(new cude(minX, -y, cude.cudeSize, cude.cudeSize))
                        if(y > 0 ) continue;
                        maps.push(new cude((minX-1), -y, cude.cudeSize, cude.cudeSize))
                        maps.push(new cude(maxX, -y, cude.cudeSize, cude.cudeSize))
                    }
                    break;
                case cudeType.Type5://I字
                    for (let y = 3; y >= 0; y--){
                        maps.push(new cude(minX, y, cude.cudeSize, cude.cudeSize))
                    }
                    break;
                default://默认为田字
                    for(let x = minX; x <= maxX; x++){
                        for (let y = 1; y >= 0; y--){
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize))
                        }
                    }
                    break;
            }
            return maps;
        }

        /**
         * cude2以cude1为中心旋转
         * @param cude1
         * @param cude2
         * @returns {Play.cudePosXY}
         */
        private rotatePoint(cude1: cude, cude2: cude): cudePosXY {
            let y: number = (cude2.x-cude1.x+cude1.y),
                x: number = (-cude2.y+cude1.x+cude1.y),
                posx: number = (-cude2.posY+cude1.posX+cude1.posY),
                posy: number = (cude2.posX-cude1.posX+cude1.posY)
            return new cudePosXY(x, y, posx, posy)
        }

    }
    //格子线条对象
    export class gridLine extends egret.Shape{
        /**
         * 线条颜色
         * @returns {number}
         * @constructor
         */
        public get LineColor(): number {
            return 0xe0e0e0
        }

        /**
         * 线条大小
         * @returns {number}
         * @constructor
         */
        public get LineWidth(): number {
            return 1
        }
        public constructor(x, y, x1, y1){
            super()
            this.x = x
            this.y = y
            this.graphics.lineStyle(this.LineWidth, this.LineColor)
            this.graphics.moveTo(0, 0)
            this.graphics.lineTo(x1, y1)
            this.graphics.endFill()
            return this
        }
    }
}