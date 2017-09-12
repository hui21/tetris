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
            cudeData.interval.createRandOneCude();
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
            return 63.9;
        }
        public constructor() {
            super()
            this.initGrid()
            this.width = Stage.stageW
            this.height = Stage.stageH
            this['anchorX'] = 1
            this['anchorY'] = 1
        }
        public static gridItemCols = 10//列
        public static gridItemRows = 17//行
        //画格子
        public gridMaps: Array<gridMap> = [];
        public initGrid(): void {
            for(var x = 0; x <= grid.gridItemCols; x++){
                let gridItemX = new gridLine((x * grid.gridSize), 0, (x * grid.gridSize), Stage.stageH)
                this.addChild(gridItemX)
                for (let y = 1; y <= grid.gridItemRows; y++) {
                    let gridItemY = new gridLine(0, (y * grid.gridSize), ((x+1) * grid.gridSize), (y * grid.gridSize))
                    this.addChild(gridItemY)
                    this.gridMaps.push(new gridMap(x, y))//添加位置到数组中
                }
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
        public constructor(x, y, w, h){
            super();
            this.posX = x
            this.posY = -y
            this.x = cudeData.posTo(x)
            this.y = - cudeData.posTo(y)

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
        private timer: egret.Timer //时间对象
        public static _interval: cudeData;
        public static get interval(): cudeData {
            return (this._interval || (this._interval = new cudeData));
        }
        public constructor(){
            super()
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
            this.timer = new egret.Timer(this.nowSpeed, 0);
            //注册事件侦听器
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
            //开始计时
            this.timer.start();
        }
        public timerFunc(): boolean {
            if(UniltGame.interval.getGameStatus() !== GameStatus.Start) return false;
            this.KeyDown()
            return true;
        }

        public timerComFunc(): void {
            console.log("timerComplate")
        }

        /**
         * 是否能下落
         * @returns {boolean}
         */
        private canDown(): boolean {
            let status: boolean = true;
            for(let i = 0; i < this.nowCude.length; i++){
                if(
                    this.nowCude[i].posY == grid.gridItemRows ||
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
            if(this.canDown()){
                let canMove: boolean = true,
                    newPosXy: Array<cudePosXY> = []
                for(let i = 0; i < this.nowCude.length; i++){
                    let newXy = new cudePosXY(0,0, this.nowCude[i].posX, this.nowCude[i].posY+1,)
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
                    }
                    this.cudes.push(this.nowCude[i])
                }
                this.remove()
                cudeData.interval.createRandOneCude()
            }
        }
        //左移动
        private KeyLeft(){
            let canMove: boolean = true,
                newPosXy: Array<cudePosXY> = []
            for(let i = 0; i < this.nowCude.length; i++){
                let newXy = new cudePosXY(0,0, this.nowCude[i].posX -1, this.nowCude[i].posY,)
                if(newXy.posX < 0 || newXy.posY == grid.gridItemRows){
                    canMove = false
                    break;
                }
                newPosXy.push(newXy)
            }
            if(canMove) this.pos(newPosXy)
        }
        //右移动
        private KeyRight(){
            let canMove: boolean = true,
                newPosXy: Array<cudePosXY> = []
            for(let i = 0; i < this.nowCude.length; i++){
                let newXy = new cudePosXY(0,0, this.nowCude[i].posX + 1, this.nowCude[i].posY,)
                if(newXy.posX > (grid.gridItemCols - 1) || newXy.posY == grid.gridItemRows){
                    canMove = false
                    break;
                }
                newPosXy.push(newXy)
            }
            if(canMove) this.pos(newPosXy)
        }

        private KeySpace(){
            console.log('space');
            UniltGame.interval.setGameStatus(GameStatus.Stop)
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
        private remove(): void {
            let status:boolean = false
            for(let x = 0; x < grid.gridItemCols; x++){
                let col: boolean = false,
                    removeY: number = 0
                for (let y = grid.gridItemRows; y < 0; y--){
                    if(this.isPosXy(x, y)){
                        col = true;
                        removeY = y;
                        break;
                    }
                }
                if(col){
                    for (let i = 0; i < this.cudes.length; i++){
                        if(this.cudes[i].posX == x && this.cudes[i].posY == removeY){
                            this.removeChild(this.cudes[i])
                            this.cudes.splice(i, 1)
                        }
                    }
                }
            }
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
                        for (let y = 0; y < 2; y++){
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize))
                        }
                    }
                    break;
                case cudeType.Type2://L字
                    for (let y = 0; y <= 2; y++){
                        for(let x = minX; x <= maxX; x++){
                            if(y < 2 && x > minX) continue;
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize))
                        }
                    }
                    break;
                case cudeType.Type3://转字
                    for (let y = 0; y <= 2; y++){
                        for(let x = minX; x <= maxX; x++){
                            if((y < 1 && x > minX) || (y > 1 && x < maxX)) continue;
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize))
                        }
                    }
                    break;
                case cudeType.Type4://上字
                    for (let y = 0; y <= 1; y++){
                        maps.push(new cude(minX, y, cude.cudeSize, cude.cudeSize))
                        if(y < 1 ) continue;
                        maps.push(new cude((minX-1), y, cude.cudeSize, cude.cudeSize))
                        maps.push(new cude(maxX, y, cude.cudeSize, cude.cudeSize))
                    }
                    break;
                case cudeType.Type5://I字
                    for (let y = 0; y <= 3; y++){
                        maps.push(new cude(minX, y, cude.cudeSize, cude.cudeSize))
                    }
                    break;
                default://默认为田字
                    for(let x = minX; x <= maxX; x++){
                        for (let y = 0; y < 2; y++){
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
            this.graphics.lineStyle(this.LineWidth, this.LineColor)
            this.graphics.moveTo(x, y)
            this.graphics.lineTo(x1, y1)
            this.graphics.endFill()
            return this
        }
    }
}