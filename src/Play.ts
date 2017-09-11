import Tool = Uilt.Tool;
/**
 * Created by feizhugame on 2017/9/6.
 */
module Play {
    import Stage = Uilt.Stage;
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
            return 64;
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
        public static gridItemRows = 18//行
        //画格子
        public gridMaps: Array<gridMap> = [];
        public initGrid(): void {
            for(var x = 0; x < grid.gridItemCols; x++){
                let gridItemX = new gridLine((x * grid.gridSize), 0, (x * grid.gridSize), Stage.stageH)
                this.addChild(gridItemX)
                for (let y = 1; y < grid.gridItemRows; y++) {
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
    //方块类型
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
        public constructor(x, y, w, h, color){
            super();
            this.graphics.beginFill(color);
            this.graphics.drawRoundRect( x, y, w, h, 10, 10);
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
    export class cudeData extends egret.Sprite {
        public cudes: Array<cude> = []
        public static _interval: cudeData;
        public static get interval(): cudeData {
            return (this._interval || (this._interval = new cudeData));
        }
        public createRandOneCude(): void{
            let rand = Math.round(Math.random() * (grid.gridItemCols -1 )),
                cudetype = Math.round(Math.random() * cudeType.end),
                effectCude = this.cudesEffect(1, rand)
            for(let i =0; i < effectCude.length; i++){
                this.cudes.push(effectCude[i])
                this.addChild(effectCude[i])
            }
        }

        /**
         * 效果方块
         * @param type
         * @param posX
         * @returns {Array<cude>}
         */
        public cudesEffect(type: cudeType, posX): Array<cude> {
            let maps: Array<cude> = []
            switch (type){
                case cudeType.Type1:
                    maps.push(new cude((posX * grid.gridSize + 1), 0, cude.cudeSize, cude.cudeSize, 0xff0000))
                    let posXType1: number;
                    if(posX >= (grid.gridItemCols / 2)){
                        posXType1 = posX - 1;
                    }else{
                        posXType1 = posX + 1;
                    }
                    maps.push(new cude((posXType1 * grid.gridSize + 1), 0, cude.cudeSize, cude.cudeSize, 0xff0000))
                    break;
                default:
                    let posXs = posX * grid.gridSize;
                    maps.push(new cude(posXs, 0, cude.cudeSize, cude.cudeSize, 0xff0000))
                    break;
            }
            return maps;
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