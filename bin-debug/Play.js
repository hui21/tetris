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
            this.timeGroup.anchorOffsetX = (this.timeGroup.x + this.timeGroup.width) / 2;
            this.scoreGroup.x = this.width;
            this.scoreGroup.y = grid.gridSize / 2;
            this.scoreGroup.anchorOffsetX = (this.scoreGroup.x + this.scoreGroup.width) / 2;
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
                return 16;
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
            for (var y = 0; y <= grid.gridItemRows; y++) {
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
            _this.posY = y;
            _this.x = cudeData.posTo(x);
            _this.y = cudeData.posTo(y);
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
        /**
         * 检测是否是本身
         * @param hashCode
         * @returns {boolean}
         */
        cude.prototype.isSelf = function (hashCode) {
            return this.hashCode === hashCode;
        };
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
            _this.nowSpeed = 400; //当前速度
            _this.isMove = true; //当前方块组是否在移动
            _this.canMove = true; //是否可以移动
            _this.moveNewPosXy = []; //移动时新的位置数组
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
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            if (this.isMove) {
                if (this.canDown()) {
                    this.resetCanMoveAndMoveNewPosXy();
                    for (var i = 0; i < this.nowCude.length; i++) {
                        var newY = this.nowCude[i].posY + 1; //检测碰撞，获取新的坐标值
                        //是否超出格子
                        if (this.isOverGrid(newY, KeyCode.KeyDown)) {
                            this.canMove = false;
                            break;
                        }
                        var newXy = new cudePosXY(0, 0, this.nowCude[i].posX, newY);
                        this.moveNewPosXy.push(newXy);
                    }
                    this.pos(this.moveNewPosXy);
                }
                else {
                    this.isMove = false;
                    for (var i = 0; i < this.nowCude.length; i++) {
                        this.cudes.push(this.nowCude[i]);
                    }
                    if (!this.canDown())
                        this.remove(); //消除
                }
            }
            else {
                cudeData.interval.createRandOneCude(); //创建一个类型方块组
                this.isMove = true;
            }
        };
        /**
         * 将当前的方块组添加到视图方块组中
         */
        cudeData.prototype.nowCudeToCudes = function () {
            for (var i = 0; i < this.nowCude.length; i++) {
                //添加方块对象到视图方块组
                this.cudes.push(this.nowCude[i]);
            }
        };
        /**
         * 游戏是否结束
         * @returns {boolean}
         */
        cudeData.prototype.isGameOVer = function () {
            for (var i = 0; i < this.nowCude.length; i++) {
                if (this.nowCude[i].posY == 0) {
                    UniltGame.interval.setGameStatus(GameStatus.Died);
                    return true;
                }
            }
            return false;
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
                if (this.isOverGrid(this.nowCude[i].posY + 1, KeyCode.KeyDown) ||
                    this.isPosXy(this.nowCude[i].posX, this.nowCude[i].posY + 1)) {
                    status = false;
                    break;
                }
            }
            return status;
        };
        /**
         * 重设对象属性
         */
        cudeData.prototype.resetCanMoveAndMoveNewPosXy = function () {
            this.canMove = true;
            this.moveNewPosXy = [];
        };
        /**
         * 旋转/变形
         * @returns {boolean}
         * @constructor
         */
        cudeData.prototype.KeyUp = function () {
            //如果游戏状态不为开始/运行状态则直接返回
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            if (this.nowCudeType === cudeType.Type1)
                return;
            var canRotate = true, newPosXy = [];
            for (var i = 0; i < this.nowCude.length; i++) {
                var newXy = this.rotatePoint(this.nowCude[1], this.nowCude[i]);
                if (newXy.posY < 0 ||
                    this.isOverGrid(newXy.posX) ||
                    this.isOverGrid(newXy.posX, KeyCode.KeyRight) ||
                    this.isOverGrid(newXy.posY, KeyCode.KeyDown)) {
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
        /**
         * 下移动
         * @constructor
         */
        cudeData.prototype.KeyDown = function () {
            //如果游戏状态不为开始/运行状态则直接返回
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            //检测是否可以下落
            if (this.canDown()) {
                var nowCudeYDiff = null;
                for (var i = 0; i < this.nowCude.length; i++) {
                    var diff = this.downDiff(this.nowCude[i]);
                    if (nowCudeYDiff === null) {
                        nowCudeYDiff = diff;
                    }
                    else if (nowCudeYDiff > diff) {
                        nowCudeYDiff = diff;
                    }
                }
                for (var i = 0; i < this.nowCude.length; i++) {
                    var y = nowCudeYDiff + this.nowCude[i].posY;
                    this.nowCude[i].y = cudeData.posTo(y);
                    this.nowCude[i].posY = y;
                }
            }
        };
        /**
         * 获取掉落差值
         * @param map
         * @returns {number}
         */
        cudeData.prototype.downDiff = function (map) {
            if (this.cudes.length < 1) {
                return grid.gridItemRows - 1 - map.posY;
            }
            var newCudes = this.ArrSortAsc(this.cudes);
            for (var i = 0; i < newCudes.length; i++) {
                if (newCudes[i].posX === map.posX) {
                    return newCudes[i].posY - map.posY - 1;
                }
            }
            return grid.gridItemRows - 1 - map.posY;
        };
        /**
         * 左移动
         * @constructor
         */
        cudeData.prototype.KeyLeft = function () {
            //如果游戏状态不为开始/运行状态则直接返回
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            this.resetCanMoveAndMoveNewPosXy();
            for (var i = 0; i < this.nowCude.length; i++) {
                if (!this.canMove)
                    break; //如果已经标记为不能移动则直接跳出循环
                var newX = this.nowCude[i].posX - 1; //右移
                //是否超出格子、新位置是否有方块数据
                if (this.isOverGrid(newX, KeyCode.KeyLeft) || this.isPosXy(newX, this.nowCude[i].posY)) {
                    this.canMove = false;
                    break;
                }
                // 添加新数据到移动数组中
                var newXy = new cudePosXY(0, 0, newX, this.nowCude[i].posY);
                this.moveNewPosXy.push(newXy);
            }
            //如果可以移动则调用位移方法
            this.pos(this.moveNewPosXy);
        };
        /**
         * 右移
         * @constructor
         */
        cudeData.prototype.KeyRight = function () {
            //如果游戏状态不为开始/运行状态则直接返回
            if (UniltGame.interval.getGameStatus() !== GameStatus.Start)
                return;
            this.resetCanMoveAndMoveNewPosXy();
            for (var i = 0; i < this.nowCude.length; i++) {
                if (!this.canMove)
                    break; //如果已经标记为不能移动则直接跳出循环
                var newX = this.nowCude[i].posX + 1; //右移
                //是否超出格子、新位置是否有方块数据
                if (this.isOverGrid(newX, KeyCode.KeyRight) || this.isPosXy(newX, this.nowCude[i].posY)) {
                    this.canMove = false;
                    break;
                }
                // 添加新数据到移动数组中
                var newXy = new cudePosXY(0, 0, newX, this.nowCude[i].posY);
                this.moveNewPosXy.push(newXy);
            }
            //如果可以移动则调用位移方法
            this.pos(this.moveNewPosXy);
        };
        /**
         * 是否超出格子
         * @param posVal 第几个格子
         * @param type 类型
         * @returns {boolean}
         */
        cudeData.prototype.isOverGrid = function (posVal, type) {
            if (type === void 0) { type = KeyCode.KeyDown; }
            switch (type) {
                case KeyCode.KeyDown:
                    return posVal === grid.gridItemRows;
                case KeyCode.KeyLeft:
                    return posVal === -1;
                case KeyCode.KeyRight:
                    return posVal === grid.gridItemCols;
                default:
                    return posVal === grid.gridItemRows;
            }
        };
        /**
         * 暂停/开始游戏切换
         * @constructor
         */
        cudeData.prototype.KeySpace = function () {
            //如果游戏的状态为开始/运行的状态，则暂停
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
            //检测该位置是否有方块
            for (var i = 0; i < this.cudes.length; i++) {
                if (this.cudes[i].posX === x && this.cudes[i].posY === y)
                    return true;
            }
            return false;
        };
        /**
         * 检测是否可以消除
         * @param y
         * @returns {boolean}
         */
        cudeData.prototype.canRemove = function (y) {
            var status = true;
            for (var x = 0; x < grid.gridItemCols; x++) {
                //如果该位置没有方块数据，则返回false
                if (!this.isPosXy(x, y)) {
                    status = false;
                    break;
                }
            }
            return status;
        };
        /**
         * 消除
         */
        cudeData.prototype.remove = function () {
            var removeArr = [], //需要消去的数据
            moveArr = []; //需要位移的数据
            //从底部开始扫描消去
            for (var y = grid.gridItemRows; y > 0; y--) {
                //检测是否可以消去此行
                if (this.canRemove(y)) {
                    for (var i = 0; i < this.cudes.length; i++) {
                        //选择等于此行的数据
                        if (this.cudes[i].posY == y) {
                            this.removeChild(this.cudes[i]); //从视图上移除对象
                            removeArr.push(this.cudes[i]); //把移除对象添加到数组中
                            panel.interval.score = this.cudes[i].sorce; //添加分数
                        }
                        else if (y > this.cudes[i].posY) {
                            moveArr.push(this.cudes[i]);
                        }
                    }
                }
            }
            panel.interval.score = Math.floor(removeArr.length / 10); //多行奖励分数
            //消除的数据
            for (var i = 0; i < removeArr.length; i++) {
                //如果之前标记需要移动的数据已被移除则删除moveArr的相关数据
                for (var k = 0; k < moveArr.length; k++) {
                    if (moveArr[k].hashCode == removeArr[i].hashCode) {
                        moveArr.splice(k, 1);
                    }
                }
                //删除方块数组重需要消去的数据
                for (var k = 0; k < this.cudes.length; k++) {
                    if (this.cudes[k].hashCode == removeArr[i].hashCode) {
                        this.cudes.splice(k, 1);
                    }
                }
            }
            //移动
            moveArr = this.ArrSortDesc(moveArr); //对需要移动的数据进行Y轴倒叙
            for (var i = 0; i < moveArr.length; i++) {
                var newY = this.moveCudePosYCount(moveArr[i]); //检测碰撞，获取新的坐标值
                moveArr[i].y = cudeData.posTo(newY);
                moveArr[i].posY = newY;
                //如果新行可以消除则调用消除方法
                if (this.canRemove(moveArr[i].y))
                    this.remove();
            }
            return true;
        };
        /**
         * 需要移动的位移
         * @param move
         * @returns {number}
         */
        cudeData.prototype.moveCudePosYCount = function (move) {
            var newCudes = this.ArrSortAsc(this.cudes);
            for (var i = 0; i < newCudes.length; i++) {
                //筛选大于move对象的posY值并X值相同的
                if (newCudes[i].posY > move.posY && newCudes[i].posX === move.posX) {
                    return move.posY + Math.abs(newCudes[i].posY - move.posY) - 1;
                }
            }
            return grid.gridItemRows - 1; //如果都为空则直接位移到底部
        };
        /**
         * 数组冒泡升序排序
         * @param cudes
         * @returns {Array<cude>}
         */
        cudeData.prototype.ArrSortAsc = function (cudes) {
            for (var i = 1; i < cudes.length; i++) {
                for (var j = 0; j < cudes.length - i; j++) {
                    if (cudes[j].posY > cudes[j + 1].posY) {
                        var temp = cudes[j];
                        cudes[j] = cudes[j + 1];
                        cudes[j + 1] = temp;
                    }
                }
            }
            return cudes;
        };
        /**
         * 数组倒叙排序
         * @param cudes
         * @returns {Array<cude>}
         * @constructor
         */
        cudeData.prototype.ArrSortDesc = function (cudes) {
            for (var i = 1; i < cudes.length; i++) {
                for (var j = 0; j < cudes.length - i; j++) {
                    if (cudes[j].posY < cudes[j + 1].posY) {
                        var temp = cudes[j];
                        cudes[j] = cudes[j + 1];
                        cudes[j + 1] = temp;
                    }
                }
            }
            return cudes;
        };
        /**
         * 设置移动后的位置
         * @param newPosXy
         */
        cudeData.prototype.pos = function (newPosXy) {
            if (!this.canMove)
                return; //如果不能移动则返回
            for (var i = 0; i < this.nowCude.length; i++) {
                //大佬，这里交给你了
                var newX = cudeData.posTo(newPosXy[i].posX), newY = cudeData.posTo(newPosXy[i].posY);
                /*this.nowCude[i].posX = newPosXy[i].posX
                this.nowCude[i].posY = newPosXy[i].posY*/
                egret.Tween.removeTweens(this.nowCude[i]);
                egret.Tween.get(this.nowCude[i]).to({
                    x: newX,
                    y: newY
                }, 50, egret.Ease.bounceInOut).set({
                    posX: newPosXy[i].posX,
                    posY: newPosXy[i].posY
                });
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
