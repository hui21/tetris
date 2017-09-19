/**
 * Created by feizhugame on 2017/9/6.
 */
module Play {
    import Stage = Uilt.Stage;
    import UniltGame = Uilt.Game;
    import GameStatus = Uilt.GameStatus;
    import Tool = Uilt.Tool;
    //游戏开始菜单页面和基础游戏信息
    export class Game extends eui.Component {
        private Score: number = 0;//分数
        private Level: number = 1;//关卡
        public menuTween: egret.tween.TweenGroup;//菜单动画
        public startBtn: eui.BitmapLabel;//点击按钮
        public static _interval:Game;
        public static get interval(): Game{
            return (this._interval || (this._interval = new Game));
        }

        /**
         * 初始化
         * @returns {Game}
         * @constructor
         */
        public static Init(): Game{
            let game = Game.interval;
            Stage.interval.init();
            return game;
        }

        /**
         * 菜单初始化
         */
        public menuInit(): void {
            Stage.stage.addChild(grid.interval)
            Stage.stage.addChild(cudeData.interval)
            Stage.stage.addChild(panel.interval)
            cudeData.interval.createRandOneCude()

            UniltGame.interval.setGameStatus(GameStatus.Start)
            /*this.skinName = "menu";
            this.menuTween.addEventListener('complete', () => {
                this.menuTween.play(1)
            }, this)
            this.menuTween.play()
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnClickEvent, this)*/
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
        /**
         * 是否结束游戏
         * @returns {boolean}
         */
        private static isOver() {
            let gridMap = grid.interval;
            for(let i = 0; i < grid.gridItemRows; i++){
                if(!gridMap.gridMaps[i].isEmpty) return true;
            }
            return false;
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

            this.timeGroup.x = this.width / 2
            this.timeGroup.y = grid.gridSize / 2
            this.timeGroup.anchorOffsetX = this.timeGroup.x / 2
            this.scoreGroup.x = this.width
            this.scoreGroup.y = grid.gridSize / 2
            this.scoreGroup.anchorOffsetX = this.scoreGroup.x / 4

            this.addChild(this.timeGroup)
            this.addChild(this.scoreGroup)

            this.timerTitleText.text = "Timer: "
            this.timerText.text = "0"
            this.timerText.x = this.timerTitleText.x + 100
            this.timerText.textAlign = "center"
            this.timeGroup.addChild(this.timerTitleText)
            this.timeGroup.addChild(this.timerText)

            this.scoreTitleText.text = "Score: "
            this.scoreText.text = "0"
            this.scoreText.x = this.scoreTitleText.x + 100
            this.scoreText.textAlign = "center"
            this.scoreGroup.addChild(this.scoreTitleText)
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
            this.x = (Stage.stageW - grid.gridItemCols * grid.gridSize) / 2
            this.width = grid.gridItemCols * grid.gridSize
            this.height = Stage.stageH - grid.gridSize*1.8
            this['anchorX'] = 1
            this['anchorY'] = 1
            this.initGrid()
        }

        //格子总列数
        public static get gridItemCols(): number {
            return 10;
        }
        //格子总行数
        public static get gridItemRows(): number {
            return 17
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
            for (let y = 0; y < grid.gridItemRows; y++) {
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
            this.posY = y + grid.topRow
            this.x = cudeData.posTo(x)
            this.y = cudeData.posTo(y) + grid.topRow * grid.gridSize

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
    //方块数据
    export class cudeData extends egret.Sprite {
        public cudes: Array<cude> = [] //方块集合
        public nowCude: Array<cude> = [] //当前正在前进的方块
        public nowCudeType: cudeType //当前正在前进的方块类型
        public nowSpeed:number = 1000 //当前速度
        private speedTimer: egret.Timer //速度时间对象
        private gameTimer: egret.Timer //游戏时间对象
        public static _interval: cudeData;
        public static get interval(): cudeData {
            return (this._interval || (this._interval = new cudeData));
        }
        public constructor(){
            super()
            this.y = grid.interval.y
            this.x = grid.interval.x
            this.width = grid.interval.width
            this.height = grid.interval.height
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

        /**
         * 速度回调函数
         * @returns {boolean}
         */
        public speedTimerFunc(): void {
            this.KeyDown()
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
                    this.nowCude[i].posY == (grid.gridItemRows -2) ||
                    this.isHaveCude(this.nowCude[i])
                ){
                    status = false;
                    break;
                }
            }
            return status
        }

        /**
         * 该位置是否有方块
         * @param posX
         * @param posY
         * @returns {boolean}
         */
        private isHaveCude(cude: cude): boolean {
            let status: boolean = false;
            for (let i = 0; i < this.cudes.length; i++){
                if((this.cudes[i].posY == (cude.posY +1)) && (cude.posY > 0) && (this.cudes[i].posX == cude.posX)){
                    status = true;
                    break;
                }
            }
            return status;
        }
        //上移动
        private KeyUp(){
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            if(this.nowCudeType === cudeType.Type1) return false;
            let canRotate: boolean = true,
                newPosXy: Array<cudePosXY> = []
            for(let i = 0; i < this.nowCude.length; i++){
                let newXy = this.rotatePoint(this.nowCude[1], this.nowCude[i])
                if(
                    newXy.posX < 0 || newXy.posX > (grid.gridItemCols -1) ||
                    newXy.posY < 0 || newXy.posY > (grid.gridItemRows - 1)
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

        //下移动
        private KeyDown(){
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            if(this.canDown()){
                let canMove: boolean = true,
                    newPosXy: Array<cudePosXY> = []
                for(let i = 0; i < this.nowCude.length; i++){
                    let newXy = new cudePosXY(0,0, this.nowCude[i].posX, this.nowCude[i].posY+1)
                    if(newXy.posY > grid.gridItemRows){
                        canMove = false
                        break;
                    }
                    newPosXy.push(newXy)
                }
                if(canMove) this.pos(newPosXy)
            }else{
                for(let i = 0; i < this.nowCude.length; i++){
                    if(this.nowCude[i].posY == 1){
                        UniltGame.interval.setGameStatus(GameStatus.Died)
                        console.log("game over")
                    }
                    this.cudes.push(this.nowCude[i])
                }
                this.remove()
                cudeData.interval.createRandOneCude()
            }
        }
        //左移动
        private KeyLeft(){
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            let canMove: boolean = true,
                newPosXy: Array<cudePosXY> = []
            for(let i = 0; i < this.nowCude.length; i++){
                if(!canMove) break;
                let newXy = new cudePosXY(0,0, this.nowCude[i].posX -1, this.nowCude[i].posY,)
                if(newXy.posX < 0 || newXy.posY == grid.gridItemRows){
                    canMove = false
                    break;
                }
                for(let k = 0; k < this.cudes.length; k++){
                    if(
                        this.cudes[k] !== undefined &&
                        this.cudes[k].posX == (this.nowCude[i].posX -1) &&
                        this.cudes[k].posY == (this.nowCude[i].posY)
                    ){
                        canMove = false
                        break;
                    }
                }
                newPosXy.push(newXy)
            }
            if(canMove) this.pos(newPosXy)
        }
        //右移动
        private KeyRight(){
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return;
            let canMove: boolean = true,
                newPosXy: Array<cudePosXY> = []
            for(let i = 0; i < this.nowCude.length; i++){
                if(!canMove) break;
                let newXy = new cudePosXY(0,0, this.nowCude[i].posX + 1, this.nowCude[i].posY)
                if(newXy.posX > (grid.gridItemCols - 1) || newXy.posY == grid.gridItemRows){
                    canMove = false
                    break;
                }
                for(let k = 0; k < this.cudes.length; k++){
                    if(
                        this.cudes[k] !== undefined &&
                        this.cudes[k].posX == (this.nowCude[i].posX +1) &&
                        this.cudes[k].posY == (this.nowCude[i].posY)
                    ){
                        canMove = false
                        break;
                    }
                }
                newPosXy.push(newXy)
            }
            if(canMove) this.pos(newPosXy)
        }

        //暂停/开始游戏切换
        private KeySpace(){
            if(UniltGame.interval.getGameStatus() === GameStatus.Start){
                UniltGame.interval.setGameStatus(GameStatus.Stop)
            }else if(UniltGame.interval.getGameStatus() === GameStatus.Stop){
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
            for (let i = 0; i < this.cudes.length; i++){
                if(this.cudes[i].posX == x && this.cudes[i].posY == y) return true;
            }
            return false;
        }

        /**
         * 消除
         */
        private remove(): boolean {
            let moveArr: Array<cude> = [],
                removeArr: Array<cude> = []
            for (let y = grid.gridItemRows; y > 0; y--){
                let status: boolean = true
                for(let x = 0; x < grid.gridItemCols; x++){
                    if(!this.isPosXy(x, y)){
                        status = false;
                    }
                }
                if(status){
                    for (let i = 0; i < this.cudes.length; i++){
                        if(this.cudes[i].posY == y){
                            this.removeChild(this.cudes[i])
                            removeArr.push(this.cudes[i])
                            panel.interval.score = this.cudes[i].sorce
                        }else if(this.cudes[i].posY < y){
                            moveArr.push(this.cudes[i])
                        }
                    }
                }
            }
            panel.interval.score = Math.floor(removeArr.length / 10) //多行奖励分数
            for (let i = 0; i < removeArr.length; i++){
                for (let j = 0; j < moveArr.length; j++){
                    if(removeArr[i].hashCode == moveArr[j].hashCode){
                        moveArr.splice(j,1)
                    }
                }
                for (let k = 0; k < this.cudes.length; k++){
                    if(this.cudes[k].hashCode == removeArr[i].hashCode){
                        this.cudes.splice(k,1)
                    }
                }
            }
            for(let i = 0; i < moveArr.length; i++){
                console.log(i, moveArr[i].posY)
                let newPosY: number = this.findCudeY(moveArr[i], moveArr)
                if(newPosY <= (grid.gridItemRows - 2)){
                    let newY: number = cudeData.posTo(newPosY)
                    moveArr[i].posY = newPosY
                    moveArr[i].y = newY
                }
            }
            return true;
        }

        //刷新
        private refresh(): void {
            let newPosXy: Array<cudePosXY> = []
            for(let i = 0; i < this.cudes.length; i++){
                let newPosY:number = this.cudes[i].posY+this.findCudeY(this.cudes[i])
                if(!this.isPosXy(this.cudes[i].posX, newPosY) && newPosY <= (grid.gridItemRows - 2)){
                    let newY: number = cudeData.posTo(newPosY)
                    this.cudes[i].posY = newPosY
                    this.cudes[i].y = newY
                    //this.refresh()
                }
            }
        }

        private findCudeY(target: cude, moveArr: Array<cude>): number{
            for(let i = 0; i < moveArr.length; i++){
                console.log(moveArr[i].posY)
                if(
                    target.posX == moveArr[i].posX &&
                    target.hashCode !== moveArr[i].hashCode &&
                    target.posY < moveArr[i].posY
                ){
                    let moveGridCount: number = moveArr[i].posY - target.posY
                    return target.posY+Math.abs(moveGridCount)
                }
            }
            /*for(let i = 0; i < this.cudes.length; i++){
                if(
                    target.posX == this.cudes[i].posX &&
                    target.hashCode !== this.cudes[i].hashCode &&
                    target.posY < this.cudes[i].posY
                ){
                    let moveGridCount: number = this.cudes[i].posY - target.posY
                    return target.posY+Math.abs(moveGridCount)
                }
            }*/
            return (grid.gridItemRows-2)
        }


        /**
         * 设置移动后的位置
         * @param newPosXy
         */
        private pos(newPosXy: Array<cudePosXY>){
            for(let i = 0; i < this.nowCude.length; i++){
                this.nowCude[i].x = cudeData.posTo(newPosXy[i].posX)
                this.nowCude[i].y = cudeData.posTo(newPosXy[i].posY)
                this.nowCude[i].posX = newPosXy[i].posX
                this.nowCude[i].posY = newPosXy[i].posY
            }
        }

        /**
         * 原始值转结果值
         * @param value
         * @returns {number}
         */
        public static posTo(value: number){
            return value * grid.gridSize + 1
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
        public cudesEffect(type: cudeType): Array<cude> {
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
        public rotatePoint(cude1, cude2){
            let y: number = (cude2.x-cude1.x+cude1.y),
                x: number = (-cude2.y+cude1.x+cude1.y),
                posx: number = (-cude2.posY+cude1.posX+cude1.posY),
                posy: number = (cude2.posX-cude1.posX+cude1.posY)
            //console.log(posy, posx)
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