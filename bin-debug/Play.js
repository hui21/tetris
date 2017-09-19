var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by feizhugame on 2017/9/6.
 */
var Play;
(function (Play) {
    var Stage = Uilt.Stage;
    var UniltGame = Uilt.Game;
    var GameStatus = Uilt.GameStatus;
    //游戏开始菜单页面和基础游戏信息
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Score = 0; //分数
            _this.Level = 1; //关卡
            return _this;
        }
        Object.defineProperty(Game, "interval", {
            get: function () {
                return (this._interval || (this._interval = new Game));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         * @returns {Game}
         * @constructor
         */
        Game.Init = function () {
            var game = Game.interval;
            Stage.interval.init();
            return game;
        };
        /**
         * 菜单初始化
         */
        Game.prototype.menuInit = function () {
            Stage.stage.addChild(grid.interval);
            Stage.stage.addChild(cudeData.interval);
            Stage.stage.addChild(panel.interval);
            cudeData.interval.createRandOneCude();
            UniltGame.interval.setGameStatus(GameStatus.Start);
            /*this.skinName = "menu";
            this.menuTween.addEventListener('complete', () => {
                this.menuTween.play(1)
            }, this)
            this.menuTween.play()
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnClickEvent, this)*/
        };
        /**
         * 开始游戏按钮监听事件
         */
        Game.prototype.startBtnClickEvent = function () {
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnClickEvent, this);
            Stage.stage.removeChildren();
            /*Stage.stage.addChild(grid.interval)
            Stage.stage.addChild(cudeData.interval)
            cudeData.interval.createRandOneCude();*/
        };
        /**
         * 是否结束游戏
         * @returns {boolean}
         */
        Game.isOver = function () {
            var gridMap = grid.interval;
            for (var i = 0; i < grid.gridItemRows; i++) {
                if (!gridMap.gridMaps[i].isEmpty)
                    return true;
            }
            return false;
        };
        return Game;
    }(eui.Component));
    Play.Game = Game;
    __reflect(Game.prototype, "Play.Game");
    //面板
    var panel = (function (_super) {
        __extends(panel, _super);
        function panel() {
            var _this = _super.call(this) || this;
            _this.timerTitleText = new egret.TextField; //时间标题
            _this.timerText = new egret.TextField; //时间
            _this.scoreTitleText = new egret.TextField; //分数标题
            _this.scoreText = new egret.TextField; //分数
            _this.timeGroup = new egret.Sprite; //时间组
            _this.scoreGroup = new egret.Sprite; //分数组
            _this.init();
            return _this;
        }
        Object.defineProperty(panel, "interval", {
            get: function () {
                return (this._interval || (this._interval = new panel));
            },
            enumerable: true,
            configurable: true
        });
        //初始化面板
        panel.prototype.init = function () {
            this.width = Stage.stageW;
            this.height = grid.topRow * grid.gridSize;
            this.timeGroup.x = this.width / 2;
            this.timeGroup.y = grid.gridSize / 2;
            this.timeGroup.anchorOffsetX = this.timeGroup.x / 2;
            this.scoreGroup.x = this.width;
            this.scoreGroup.y = grid.gridSize / 2;
            this.scoreGroup.anchorOffsetX = this.scoreGroup.x / 4;
            this.addChild(this.timeGroup);
            this.addChild(this.scoreGroup);
            this.timerTitleText.text = "Timer: ";
            this.timerText.text = "0";
            this.timerText.x = this.timerTitleText.x + 100;
            this.timerText.textAlign = "center";
            this.timeGroup.addChild(this.timerTitleText);
            this.timeGroup.addChild(this.timerText);
            this.scoreTitleText.text = "Score: ";
            this.scoreText.text = "0";
            this.scoreText.x = this.scoreTitleText.x + 100;
            this.scoreText.textAlign = "center";
            this.scoreGroup.addChild(this.scoreTitleText);
            this.scoreGroup.addChild(this.scoreText);
        };
        Object.defineProperty(panel.prototype, "score", {
            //设置分数
            set: function (val) {
                UniltGame.interval.incScore(val);
                this.scoreText.text = String(UniltGame.interval.getScore());
            },
            enumerable: true,
            configurable: true
        });
        //设置时间
        panel.prototype.time = function () {
            UniltGame.interval.incNowTimeer();
            this.timerText.text = String(UniltGame.interval.getNowTime());
        };
        return panel;
    }(egret.Sprite));
    Play.panel = panel;
    __reflect(panel.prototype, "Play.panel");
    //格子容器对象
    var grid = (function (_super) {
        __extends(grid, _super);
        function grid() {
            var _this = _super.call(this) || this;
            //画格子
            _this.gridMaps = [];
            _this.x = (Stage.stageW - grid.gridItemCols * grid.gridSize) / 2;
            _this.width = grid.gridItemCols * grid.gridSize;
            _this.height = Stage.stageH - grid.gridSize * 1.8;
            _this['anchorX'] = 1;
            _this['anchorY'] = 1;
            _this.initGrid();
            return _this;
        }
        Object.defineProperty(grid, "interval", {
            get: function () {
                return (this._interval || (this._interval = new grid));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(grid, "gridSize", {
            /**
             * 获取格子大小
             */
            get: function () {
                return 63;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(grid, "gridItemCols", {
            //格子总列数
            get: function () {
                return 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(grid, "gridItemRows", {
            //格子总行数
            get: function () {
                return 17;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(grid, "topRow", {
            //距离顶部
            get: function () {
                return 2;
            },
            enumerable: true,
            configurable: true
        });
        grid.prototype.initGrid = function () {
            this.y = grid.gridSize * grid.topRow;
            for (var x = 0; x <= grid.gridItemCols; x++) {
                var gridItemX = new gridLine((x * grid.gridSize), 0, 0, this.height);
                this.addChild(gridItemX);
                this.gridMaps.push(new gridMap(x, 0)); //添加位置到数组中
            }
            for (var y = 0; y < grid.gridItemRows; y++) {
                var gridItemY = new gridLine(0, (y * grid.gridSize), this.width, 0);
                this.addChild(gridItemY);
                this.gridMaps.push(new gridMap(0, y)); //添加位置到数组中
            }
        };
        return grid;
    }(egret.Sprite));
    Play.grid = grid;
    __reflect(grid.prototype, "Play.grid");
    //格子对象
    var gridMap = (function () {
        /**
         * 对象
         * @param x X位置
         * @param y Y位置
         * @param isEmpty 是否为空
         */
        function gridMap(x, y, isEmpty) {
            if (isEmpty === void 0) { isEmpty = true; }
            this.x = x;
            this.y = y;
            this.isEmpty = isEmpty;
        }
        return gridMap;
    }());
    Play.gridMap = gridMap;
    __reflect(gridMap.prototype, "Play.gridMap");
    //方块类型枚举
    var cudeType;
    (function (cudeType) {
        cudeType[cudeType["Type1"] = 1] = "Type1";
        cudeType[cudeType["Type2"] = 2] = "Type2";
        cudeType[cudeType["Type3"] = 3] = "Type3";
        cudeType[cudeType["Type4"] = 4] = "Type4";
        cudeType[cudeType["Type5"] = 5] = "Type5";
        cudeType[cudeType["end"] = 6] = "end";
    })(cudeType = Play.cudeType || (Play.cudeType = {}));
    //方块
    var cude = (function (_super) {
        __extends(cude, _super);
        function cude(x, y, w, h) {
            var _this = _super.call(this) || this;
            _this.color = 0xa01311;
            _this.sorce = 1; //分数
            _this.posX = x;
            _this.posY = y + grid.topRow;
            _this.x = cudeData.posTo(x);
            _this.y = cudeData.posTo(y) + grid.topRow * grid.gridSize;
            _this.graphics.beginFill(_this.color);
            _this.graphics.drawRoundRect(0, 0, w, h, 10, 10);
            _this.graphics.endFill();
            return _this;
        }
        Object.defineProperty(cude, "cudeSize", {
            /**
             * 获取方块大小
             * @returns {number}
             */
            get: function () {
                return 62;
            },
            enumerable: true,
            configurable: true
        });
        return cude;
    }(egret.Sprite));
    Play.cude = cude;
    __reflect(cude.prototype, "Play.cude");
    //按键事件枚举
    var KeyCode;
    (function (KeyCode) {
        KeyCode[KeyCode["KeyLeft"] = 37] = "KeyLeft";
        KeyCode[KeyCode["KeyUp"] = 38] = "KeyUp";
        KeyCode[KeyCode["KeyRight"] = 39] = "KeyRight";
        KeyCode[KeyCode["KeyDown"] = 40] = "KeyDown";
        KeyCode[KeyCode["KeySpace"] = 13] = "KeySpace";
    })(KeyCode = Play.KeyCode || (Play.KeyCode = {}));
    //方块位置数据
    var cudePosXY = (function () {
        function cudePosXY(x, y, posX, posY) {
            this.x = x;
            this.y = y;
            this.posX = posX;
            this.posY = posY;
        }
        return cudePosXY;
    }());
    Play.cudePosXY = cudePosXY;
    __reflect(cudePosXY.prototype, "Play.cudePosXY");
    //方块数据
    var cudeData = (function (_super) {
        __extends(cudeData, _super);
        function cudeData() {
            var _this = _super.call(this) || this;
            _this.cudes = []; //方块集合
            _this.nowCude = []; //当前正在前进的方块
            _this.nowSpeed = 1000; //当前速度
            _this.y = grid.interval.y;
            _this.x = grid.interval.x;
            _this.width = grid.interval.width;
            _this.height = grid.interval.height;
            //按键事件侦听
            window.addEventListener('keydown', function (e) {
                switch (e.keyCode) {
                    case KeyCode.KeyLeft:
                        _this.KeyLeft();
                        break;
                    case KeyCode.KeyUp:
                        _this.KeyUp();
                        break;
                    case KeyCode.KeyRight:
                        _this.KeyRight();
                        break;
                    case KeyCode.KeyDown:
                        _this.KeyDown();
                        break;
                    case KeyCode.KeySpace:
                        _this.KeySpace();
                        break;
                    default:
                        break;
                }
            }, false);
            //速度时间
            _this.speedTimer = new egret.Timer(_this.nowSpeed, 0);
            _this.speedTimer.addEventListener(egret.TimerEvent.TIMER, _this.speedTimerFunc, _this);
            _this.speedTimer.start();
            //游戏时间
            _this.gameTimer = new egret.Timer(1000, 0);
            _this.gameTimer.addEventListener(egret.TimerEvent.TIMER, _this.gameTimerFunc, _this);
            _this.gameTimer.start();
            return _this;
        }
        Object.defineProperty(cudeData, "interval", {
            get: function () {
                return (this._interval || (this._interval = new cudeData));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 速度回调函数
         * @returns {boolean}
         */
        cudeData.prototype.speedTimerFunc = function () {
            this.KeyDown();
        };
        /**
         * 时间回调
         */
        cudeData.prototype.gameTimerFunc = function () {
            if (UniltGame.interval.getGameStatus() === GameStatus.Start) {
                panel.interval.time();
                this.speedTimer.delay = this.nowSpeed - (UniltGame.interval.getNowTime() / 10); //定时器间隔随时间变化
            }
        };
        /**
         * 是否能下落
         * @returns {boolean}
         */
        cudeData.prototype.canDown = function () {
            var status = true;
            for (var i = 0; i < this.nowCude.length; i++) {
                if (this.nowCude[i].posY == (grid.gridItemRows - 2) ||
                    this.isHaveCude(this.nowCude[i])) {
                    status = false;
                    break;
                }
            }
            return status;
        };
        /**
         * 该位置是否有方块
         * @param posX
         * @param posY
         * @returns {boolean}
         */
        cudeData.prototype.isHaveCude = function (cude) {
            var status = false;
            for (var i = 0; i < this.cudes.length; i++) {
                if ((this.cudes[i].posY == (cude.posY + 1)) && (cude.posY > 0) && (this.cudes[i].posX == cude.posX)) {
                    status = true;
                    break;
                }
            }
            return status;
        };
        //上移动
        cudeData.prototype.KeyUp = function () {
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            if (this.nowCudeType === cudeType.Type1)
                return false;
            var canRotate = true, newPosXy = [];
            for (var i = 0; i < this.nowCude.length; i++) {
                var newXy = this.rotatePoint(this.nowCude[1], this.nowCude[i]);
                if (newXy.posX < 0 || newXy.posX > (grid.gridItemCols - 1) ||
                    newXy.posY < 0 || newXy.posY > (grid.gridItemRows - 1)) {
                    canRotate = false;
                    break;
                }
                newPosXy.push(newXy);
            }
            if (canRotate) {
                for (var i = 0; i < this.nowCude.length; i++) {
                    this.nowCude[i].x = newPosXy[i].x;
                    this.nowCude[i].y = newPosXy[i].y;
                    this.nowCude[i].posX = newPosXy[i].posX;
                    this.nowCude[i].posY = newPosXy[i].posY;
                }
            }
        };
        //下移动
        cudeData.prototype.KeyDown = function () {
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            if (this.canDown()) {
                var canMove = true, newPosXy = [];
                for (var i = 0; i < this.nowCude.length; i++) {
                    var newXy = new cudePosXY(0, 0, this.nowCude[i].posX, this.nowCude[i].posY + 1);
                    if (newXy.posY > grid.gridItemRows) {
                        canMove = false;
                        break;
                    }
                    newPosXy.push(newXy);
                }
                if (canMove)
                    this.pos(newPosXy);
            }
            else {
                for (var i = 0; i < this.nowCude.length; i++) {
                    if (this.nowCude[i].posY == 1) {
                        UniltGame.interval.setGameStatus(GameStatus.Died);
                        console.log("game over");
                    }
                    this.cudes.push(this.nowCude[i]);
                }
                this.remove();
                cudeData.interval.createRandOneCude();
            }
        };
        //左移动
        cudeData.prototype.KeyLeft = function () {
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            var canMove = true, newPosXy = [];
            for (var i = 0; i < this.nowCude.length; i++) {
                if (!canMove)
                    break;
                var newXy = new cudePosXY(0, 0, this.nowCude[i].posX - 1, this.nowCude[i].posY);
                if (newXy.posX < 0 || newXy.posY == grid.gridItemRows) {
                    canMove = false;
                    break;
                }
                for (var k = 0; k < this.cudes.length; k++) {
                    if (this.cudes[k] !== undefined &&
                        this.cudes[k].posX == (this.nowCude[i].posX - 1) &&
                        this.cudes[k].posY == (this.nowCude[i].posY)) {
                        canMove = false;
                        break;
                    }
                }
                newPosXy.push(newXy);
            }
            if (canMove)
                this.pos(newPosXy);
        };
        //右移动
        cudeData.prototype.KeyRight = function () {
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            var canMove = true, newPosXy = [];
            for (var i = 0; i < this.nowCude.length; i++) {
                if (!canMove)
                    break;
                var newXy = new cudePosXY(0, 0, this.nowCude[i].posX + 1, this.nowCude[i].posY);
                if (newXy.posX > (grid.gridItemCols - 1) || newXy.posY == grid.gridItemRows) {
                    canMove = false;
                    break;
                }
                for (var k = 0; k < this.cudes.length; k++) {
                    if (this.cudes[k] !== undefined &&
                        this.cudes[k].posX == (this.nowCude[i].posX + 1) &&
                        this.cudes[k].posY == (this.nowCude[i].posY)) {
                        canMove = false;
                        break;
                    }
                }
                newPosXy.push(newXy);
            }
            if (canMove)
                this.pos(newPosXy);
        };
        //暂停/开始游戏切换
        cudeData.prototype.KeySpace = function () {
            if (UniltGame.interval.getGameStatus() === GameStatus.Start) {
                UniltGame.interval.setGameStatus(GameStatus.Stop);
            }
            else if (UniltGame.interval.getGameStatus() === GameStatus.Stop) {
                UniltGame.interval.setGameStatus(GameStatus.Start);
            }
        };
        /**
         * 查找位置
         * @param x
         * @param y
         * @returns {boolean}
         */
        cudeData.prototype.isPosXy = function (x, y) {
            for (var i = 0; i < this.cudes.length; i++) {
                if (this.cudes[i].posX == x && this.cudes[i].posY == y)
                    return true;
            }
            return false;
        };
        /**
         * 消除
         */
        cudeData.prototype.remove = function () {
            var moveArr = [], removeArr = [];
            for (var y = grid.gridItemRows; y > 0; y--) {
                var status_1 = true;
                for (var x = 0; x < grid.gridItemCols; x++) {
                    if (!this.isPosXy(x, y)) {
                        status_1 = false;
                    }
                }
                if (status_1) {
                    for (var i = 0; i < this.cudes.length; i++) {
                        if (this.cudes[i].posY == y) {
                            this.removeChild(this.cudes[i]);
                            removeArr.push(this.cudes[i]);
                            panel.interval.score = this.cudes[i].sorce;
                        }
                        else if (this.cudes[i].posY < y) {
                            moveArr.push(this.cudes[i]);
                        }
                    }
                }
            }
            panel.interval.score = Math.floor(removeArr.length / 10); //多行奖励分数
            for (var i = 0; i < removeArr.length; i++) {
                for (var j = 0; j < moveArr.length; j++) {
                    if (removeArr[i].hashCode == moveArr[j].hashCode) {
                        moveArr.splice(j, 1);
                    }
                }
                for (var k = 0; k < this.cudes.length; k++) {
                    if (this.cudes[k].hashCode == removeArr[i].hashCode) {
                        this.cudes.splice(k, 1);
                    }
                }
            }
            for (var i = 0; i < moveArr.length; i++) {
                console.log(i, moveArr[i].posY);
                var newPosY = this.findCudeY(moveArr[i], moveArr);
                if (newPosY <= (grid.gridItemRows - 2)) {
                    var newY = cudeData.posTo(newPosY);
                    moveArr[i].posY = newPosY;
                    moveArr[i].y = newY;
                }
            }
            return true;
        };
        //刷新
        cudeData.prototype.refresh = function () {
            var newPosXy = [];
            for (var i = 0; i < this.cudes.length; i++) {
                var newPosY = this.cudes[i].posY + this.findCudeY(this.cudes[i]);
                if (!this.isPosXy(this.cudes[i].posX, newPosY) && newPosY <= (grid.gridItemRows - 2)) {
                    var newY = cudeData.posTo(newPosY);
                    this.cudes[i].posY = newPosY;
                    this.cudes[i].y = newY;
                }
            }
        };
        cudeData.prototype.findCudeY = function (target, moveArr) {
            for (var i = 0; i < moveArr.length; i++) {
                console.log(moveArr[i].posY);
                if (target.posX == moveArr[i].posX &&
                    target.hashCode !== moveArr[i].hashCode &&
                    target.posY < moveArr[i].posY) {
                    var moveGridCount = moveArr[i].posY - target.posY;
                    return target.posY + Math.abs(moveGridCount);
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
            return (grid.gridItemRows - 2);
        };
        /**
         * 设置移动后的位置
         * @param newPosXy
         */
        cudeData.prototype.pos = function (newPosXy) {
            for (var i = 0; i < this.nowCude.length; i++) {
                this.nowCude[i].x = cudeData.posTo(newPosXy[i].posX);
                this.nowCude[i].y = cudeData.posTo(newPosXy[i].posY);
                this.nowCude[i].posX = newPosXy[i].posX;
                this.nowCude[i].posY = newPosXy[i].posY;
            }
        };
        /**
         * 原始值转结果值
         * @param value
         * @returns {number}
         */
        cudeData.posTo = function (value) {
            return value * grid.gridSize + 1;
        };
        /**
         * 创建随机类型的方块组
         */
        cudeData.prototype.createRandOneCude = function () {
            this.nowCudeType = Math.round(Math.random() * cudeType.end);
            this.nowCude = this.cudesEffect(this.nowCudeType);
            for (var i = 0; i < this.nowCude.length; i++) {
                this.addChild(this.nowCude[i]);
            }
        };
        /**
         * 效果方块
         * @param type
         * @param posX
         * @returns {Array<cude>}
         */
        cudeData.prototype.cudesEffect = function (type) {
            var maps = [], maxX = Math.floor(grid.gridItemCols / 2), //最大X轴位置
            minX = maxX - 1; //最小X轴的位置
            switch (type) {
                case cudeType.Type1:
                    for (var x = minX; x <= maxX; x++) {
                        for (var y = 1; y >= 0; y--) {
                            maps.push(new cude(x, -y, cude.cudeSize, cude.cudeSize));
                        }
                    }
                    break;
                case cudeType.Type2:
                    for (var y = 2; y >= 0; y--) {
                        for (var x = minX; x <= maxX; x++) {
                            if (y < 2 && x > minX)
                                continue;
                            maps.push(new cude(x, -y, cude.cudeSize, cude.cudeSize));
                        }
                    }
                    break;
                case cudeType.Type3:
                    for (var y = 2; y >= 0; y--) {
                        for (var x = minX; x <= maxX; x++) {
                            if ((y < 1 && x > minX) || (y > 1 && x < maxX))
                                continue;
                            maps.push(new cude(x, -y, cude.cudeSize, cude.cudeSize));
                        }
                    }
                    break;
                case cudeType.Type4:
                    for (var y = 1; y >= 0; y--) {
                        maps.push(new cude(minX, -y, cude.cudeSize, cude.cudeSize));
                        if (y > 0)
                            continue;
                        maps.push(new cude((minX - 1), -y, cude.cudeSize, cude.cudeSize));
                        maps.push(new cude(maxX, -y, cude.cudeSize, cude.cudeSize));
                    }
                    break;
                case cudeType.Type5:
                    for (var y = 3; y >= 0; y--) {
                        maps.push(new cude(minX, y, cude.cudeSize, cude.cudeSize));
                    }
                    break;
                default:
                    for (var x = minX; x <= maxX; x++) {
                        for (var y = 1; y >= 0; y--) {
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize));
                        }
                    }
                    break;
            }
            return maps;
        };
        /**
         * cude2以cude1为中心旋转
         * @param cude1
         * @param cude2
         * @returns {Play.cudePosXY}
         */
        cudeData.prototype.rotatePoint = function (cude1, cude2) {
            var y = (cude2.x - cude1.x + cude1.y), x = (-cude2.y + cude1.x + cude1.y), posx = (-cude2.posY + cude1.posX + cude1.posY), posy = (cude2.posX - cude1.posX + cude1.posY);
            //console.log(posy, posx)
            return new cudePosXY(x, y, posx, posy);
        };
        return cudeData;
    }(egret.Sprite));
    Play.cudeData = cudeData;
    __reflect(cudeData.prototype, "Play.cudeData");
    //格子线条对象
    var gridLine = (function (_super) {
        __extends(gridLine, _super);
        function gridLine(x, y, x1, y1) {
            var _this = _super.call(this) || this;
            _this.x = x;
            _this.y = y;
            _this.graphics.lineStyle(_this.LineWidth, _this.LineColor);
            _this.graphics.moveTo(0, 0);
            _this.graphics.lineTo(x1, y1);
            _this.graphics.endFill();
            return _this;
        }
        Object.defineProperty(gridLine.prototype, "LineColor", {
            /**
             * 线条颜色
             * @returns {number}
             * @constructor
             */
            get: function () {
                return 0xe0e0e0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(gridLine.prototype, "LineWidth", {
            /**
             * 线条大小
             * @returns {number}
             * @constructor
             */
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        return gridLine;
    }(egret.Shape));
    Play.gridLine = gridLine;
    __reflect(gridLine.prototype, "Play.gridLine");
})(Play || (Play = {}));
