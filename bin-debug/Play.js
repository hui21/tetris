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
    var Tool = Uilt.Tool;
    var AnchorUtils = Uilt.AnchorUtils;
    //游戏开始菜单页面和基础游戏信息
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            _this.Score = 0; //分数
            _this.Level = 1; //关卡
            _this.Init();
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
        Game.prototype.Init = function () {
            AnchorUtils.init(); // 初始化锚点类
            var menu = new Menu();
            Stage.stage.addChild(menu);
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
        return Game;
    }(egret.Sprite));
    Play.Game = Game;
    __reflect(Game.prototype, "Play.Game");
    //菜单
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = _super.call(this) || this;
            _this.group = new egret.Sprite(); //菜单组
            _this.gameName = new egret.Sprite(); //游戏名字
            _this.btnColor = 0xe0690c; //按钮默认颜色
            _this.btnRound = 10; //默认圆角大小
            _this.btnHeight = 60; //按钮默认高度
            _this.btnWidth = 200; //按钮默认宽度
            _this.fontColor = 0xffffff; //字体颜色
            _this.init();
            return _this;
        }
        /**
         * 初始化
         */
        Menu.prototype.init = function () {
            Stage.stage.addChild(grid.interval);
            Stage.stage.addChild(panel.interval);
            //面板
            this.groupDraw();
            this.gameNameDraw();
            this.addChild(this.gameName);
            this.addChild(this.group);
            var btnX = (this.group.width - this.btnWidth) / 2;
            this.startBtn = Tool.drawBtn(btnX, 0, this.btnWidth, this.btnHeight, this.btnRound, "开始游戏", this.btnColor, this.fontColor);
            this.explainBtn = Tool.drawBtn(btnX, (this.btnHeight + 20) * 1, this.btnWidth, this.btnHeight, this.btnRound, "操作介绍", this.btnColor, this.fontColor);
            this.settingBtn = Tool.drawBtn(btnX, (this.btnHeight + 20) * 2, this.btnWidth, this.btnHeight, this.btnRound, "游戏设置", this.btnColor, this.fontColor);
            this.aboutBtn = Tool.drawBtn(btnX, (this.btnHeight + 20) * 3, this.btnWidth, this.btnHeight, this.btnRound, "关于游戏", this.btnColor, this.fontColor);
            this.group.addChild(this.startBtn);
            this.group.addChild(this.aboutBtn);
            this.group.addChild(this.explainBtn);
            this.group.addChild(this.settingBtn);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnFunc, this);
            this.explainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.explainBtnFunc, this);
        };
        /**
         * 绘制游戏名称
         */
        Menu.prototype.gameNameDraw = function () {
            var nameText = new egret.TextField();
            this.gameName.width = Stage.stageW;
            this.gameName.y = -80;
            this.gameName.addChild(nameText);
            nameText.text = "俄罗斯方块";
            nameText.width = this.gameName.width;
            nameText.textAlign = "center";
            nameText.x = (Stage.stageW - this.gameName.width) / 2;
            nameText.textColor = this.btnColor;
            nameText.fontFamily = "楷体";
            nameText.size = 80;
            egret.Tween.get(this.gameName).to({
                y: 350
            }, 600, egret.Ease.backInOut).call(function (target) {
                egret.Tween.removeTweens(target);
            }, this, [this.gameName]);
        };
        /**
         * 绘制菜单组
         */
        Menu.prototype.groupDraw = function () {
            this.group.width = 400;
            this.group.height = 300;
            this.group.alpha = 0;
            this.group.x = (Stage.stageW - this.group.width) / 2;
            this.group.y = (Stage.stageH - this.group.height) / 1.5;
            //this.group.graphics.beginFill(0x3bb4f2)
            this.group.graphics.drawRoundRect(0, 0, this.group.width, this.group.height, 10, 10);
            this.group.graphics.endFill();
            this.groupIn();
        };
        /**
         * 开始游戏按钮点击事件
         */
        Menu.prototype.startBtnFunc = function () {
            Stage.stage.removeChild(this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnFunc, this);
            Stage.stage.addChild(cudeData.interval);
            cudeData.interval.createRandOneCude();
            UniltGame.interval.setGameStatus(GameStatus.Start);
        };
        Menu.prototype.explainBtnFunc = function () {
            var group = new egret.Sprite, textMap = new egret.TextField, closeBtn;
            group.width = 500;
            group.height = 400;
            group.x = (Stage.stageW - group.width) / 2;
            group.y = (Stage.stageH - group.height) / 1.6;
            group.graphics.beginFill(0x3bb4f2);
            group.graphics.drawRoundRect(0, 0, group.width, group.height, 10, 10);
            group.graphics.endFill();
            this.addChild(group);
            textMap.width = group.width;
            textMap.height = group.height;
            textMap.lineSpacing = 20;
            textMap.text = "\r\n说明：\r\n" +
                "       键盘：上键旋转，下键快速下落，左右键左右移动\r\n" +
                "       触屏：向上滑旋转，下滑快速下落，左右滑左右移动";
            textMap.textColor = 0xffffff;
            group.addChild(textMap);
            closeBtn = Tool.drawBtn(150, group.height - 70, this.btnWidth, this.btnHeight, this.btnRound, "关闭", this.btnColor, this.fontColor);
            group.addChild(closeBtn);
        };
        /**
         * 菜单淡出
         */
        Menu.prototype.groupOut = function () {
            egret.Tween.get(this.group).to({
                alpha: 0
            }, 2000, egret.Ease.backInOut)
                .call(function (target) {
                egret.Tween.removeTweens(target);
            }, this, [this.group]);
        };
        /**
         * 菜单淡现
         */
        Menu.prototype.groupIn = function () {
            egret.Tween.get(this.group).to({
                alpha: 1
            }, 2000, egret.Ease.backInOut)
                .call(function (target) {
                egret.Tween.removeTweens(target);
            }, this, [this.group]);
        };
        return Menu;
    }(egret.Sprite));
    Play.Menu = Menu;
    __reflect(Menu.prototype, "Play.Menu");
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
            this.timeGroup.x = 0;
            this.timeGroup.width = this.width / 2;
            this.timeGroup.height = grid.topRow * grid.gridSize;
            this.scoreGroup.x = this.width / 2;
            this.scoreGroup.width = this.width / 2;
            this.scoreGroup.height = grid.topRow * grid.gridSize;
            this.addChild(this.timeGroup);
            this.addChild(this.scoreGroup);
            this.timerTitleText.width = this.timeGroup.width;
            this.timerTitleText.text = "Timer: ";
            this.timerTitleText.textAlign = "center";
            this.timeGroup.addChild(this.timerTitleText);
            this.timerText.y = grid.gridSize;
            this.timerText.text = "0";
            this.timerText.width = this.timerTitleText.width;
            this.timerText.textAlign = "center";
            this.timeGroup.addChild(this.timerText);
            this.scoreTitleText.text = "Score: ";
            this.scoreTitleText.width = this.scoreGroup.width;
            this.scoreTitleText.textAlign = "center";
            this.scoreGroup.addChild(this.scoreTitleText);
            this.scoreText.y = grid.gridSize;
            this.scoreText.text = "0";
            this.scoreText.width = this.scoreTitleText.width;
            this.scoreText.textAlign = "center";
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
        //重置数据
        panel.prototype.restart = function () {
            this.timerText.text = "0";
            this.scoreText.text = "0";
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
            _this.width = grid.gridItemCols * grid.gridSize;
            _this.height = Stage.stageH - grid.gridSize * 1.8;
            _this.x = (Stage.stageW - grid.gridItemCols * grid.gridSize) / 2;
            AnchorUtils.setAnchor(_this, 0);
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
        cudeType[cudeType["Type0"] = 0] = "Type0";
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
            AnchorUtils.setAnchor(_this, 0.5);
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
    //游戏结束面板
    var gameOver = (function (_super) {
        __extends(gameOver, _super);
        function gameOver() {
            var _this = _super.call(this) || this;
            _this.maskMap = new egret.Shape(); //遮罩
            _this.group = new egret.Sprite(); //组件
            _this.width = Stage.stageW;
            _this.height = Stage.stageH;
            _this.init();
            return _this;
        }
        //初始化
        gameOver.prototype.init = function () {
            this.x = 0;
            this.y = 0;
            this.maskMap.graphics.beginFill(0x000);
            this.maskMap.graphics.drawRect(0, 0, this.width, this.height);
            this.maskMap.graphics.endFill();
            this.maskMap.alpha = 0.6;
            this.addChild(this.maskMap);
            //面板
            this.group.width = 400;
            this.group.height = 400;
            this.group.alpha = 0;
            this.group.x = (Stage.stageW - this.group.width) / 2;
            this.group.y = (Stage.stageH - this.group.height) / 2;
            this.group.graphics.beginFill(0x3bb4f2);
            this.group.graphics.drawRoundRect(0, 0, this.group.width, this.group.height, 10, 10);
            this.group.graphics.endFill();
            this.addChild(this.group);
            //重新开始按钮
            this.restartBtn = Tool.drawBtn(100, this.group.height - 170, 200, 60, 10, "重新开始", 0xe0690c, 0xffffff);
            this.group.addChild(this.restartBtn);
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartFunc, this);
            this.backMenuBtn = Tool.drawBtn(100, this.group.height - 90, 200, 60, 10, "返回彩单", 0xe0690c, 0xffffff);
            this.group.addChild(this.backMenuBtn);
            this.backMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backMenuBtnFunc, this);
            //分数
            var scoreTitleText = new egret.TextField();
            scoreTitleText.y = 60;
            scoreTitleText.width = this.group.width / 2;
            scoreTitleText.text = "分数";
            scoreTitleText.textAlign = "center";
            var scoreText = new egret.TextField();
            scoreText.width = this.group.width / 2;
            scoreText.y = scoreTitleText.y + 60;
            scoreText.textAlign = "center";
            scoreText.text = String(UniltGame.interval.getScore());
            this.group.addChild(scoreTitleText);
            this.group.addChild(scoreText);
            //时间
            var timeTitleText = new egret.TextField();
            timeTitleText.x = this.group.width / 2;
            timeTitleText.y = 60;
            timeTitleText.width = this.group.width / 2;
            timeTitleText.text = "用时";
            timeTitleText.textAlign = "center";
            var timeText = new egret.TextField();
            timeText.x = this.group.width / 2;
            timeText.y = timeTitleText.y + 60;
            timeText.width = this.group.width / 2;
            timeText.textAlign = "center";
            timeText.text = String(UniltGame.interval.getNowTime());
            this.group.addChild(timeTitleText);
            this.group.addChild(timeText);
            //显示、抖动效果
            egret.Tween.get(this.group).to({
                alpha: 1
            }, 1000, egret.Ease.circOut).wait(600).to({
                x: this.group.x - 10
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x + 10
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x
            }, 50, egret.Ease.backInOut).call(function (group) {
                egret.Tween.removeTweens(group);
            }, this, [this.group]);
        };
        //重新开始按钮点击事件
        gameOver.prototype.restartFunc = function (e) {
            this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartFunc, this);
            Stage.stage.removeChild(this);
            //重置数据
            panel.interval.restart();
            UniltGame.interval.restart();
            Stage.stage.removeChild(cudeData.interval);
            cudeData._interval = null;
            Stage.stage.addChild(cudeData.interval);
            cudeData.interval.createRandOneCude();
        };
        //返回主彩单按钮
        gameOver.prototype.backMenuBtnFunc = function (e) {
            this.backMenuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backMenuBtnFunc, this);
            Stage.stage.removeChild(this);
            //重置数据
            panel.interval.restart();
            Stage.stage.removeChild(cudeData.interval);
            cudeData._interval = null;
            var menu = new Menu();
            Stage.stage.addChild(menu);
        };
        return gameOver;
    }(egret.Sprite));
    Play.gameOver = gameOver;
    __reflect(gameOver.prototype, "Play.gameOver");
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
            _this.isTouch = false; //是否在滑动
            _this.touchX = 0; //开始滑动的点X值
            _this.touchY = 0; //开始滑动点的Y值
            _this.y = grid.interval.y;
            _this.x = grid.interval.x;
            _this.width = grid.interval.width;
            _this.height = grid.interval.height;
            _this.graphics.beginFill(0x000000, 0);
            _this.graphics.drawRoundRect(0, 0, _this.width, _this.height, 10, 10);
            _this.graphics.endFill();
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEnd, _this);
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
         * 触屏开始
         * @param e
         */
        cudeData.prototype.touchBegin = function (e) {
            this.isTouch = true;
            this.touchX = e.localX;
            this.touchY = e.localY;
        };
        /**
         * 触屏结束
         * @param e
         */
        cudeData.prototype.touchEnd = function (e) {
            var xDiff = (e.localX - this.touchX), yDiff = (e.localY - this.touchY);
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 100) {
                    this.KeyRight();
                }
                else if (xDiff < -100) {
                    this.KeyLeft();
                }
            }
            else {
                if (yDiff > 100) {
                    this.KeyDown();
                }
                else if (yDiff < -100) {
                    this.KeyUp();
                }
            }
            this.touchY = 0;
            this.touchX = 0;
            this.isTouch = false;
        };
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
                if (this.isGameOVer()) {
                    this.speedTimer.stop();
                    this.gameTimer.stop();
                    var gameOverMap = new gameOver();
                    Stage.stage.addChild(gameOverMap);
                }
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
            var cudes = this.ArrSortAsc(this.cudes);
            if (cudes[0].posY <= 0) {
                Uilt.Game.interval.setGameStatus(GameStatus.Died);
                return true;
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
            if (this.nowCudeType === cudeType.Type1 || this.nowCudeType === cudeType.Type0)
                return;
            var canRotate = true, newPosXy = [];
            for (var i = 0; i < this.nowCude.length; i++) {
                var newXy = this.rotatePoint(this.nowCude[2], this.nowCude[i]);
                if (this.isOverGrid(newXy.posX, KeyCode.KeyLeft) ||
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
            var _this = this;
            var removeArr = [], //需要消去的数据
            moveArr = [], //需要位移的数据
            score = 0; //添加的分数
            //从底部开始扫描消去
            for (var y = grid.gridItemRows; y > 0; y--) {
                //检测是否可以消去此行
                if (this.canRemove(y)) {
                    for (var i = 0; i < this.cudes.length; i++) {
                        //选择等于此行的数据
                        if (this.cudes[i].posY == y) {
                            egret.Tween.removeTweens(this.cudes[i]);
                            var tw = egret.Tween.get(this.cudes[i]);
                            tw.to({
                                scaleY: 0,
                                alpha: 0
                            }, 500, egret.Ease.backInOut).call(function (target) {
                                _this.removeChild(target);
                            }, this, [this.cudes[i]]);
                            removeArr.push(this.cudes[i]); //把移除对象添加到数组中
                            score += this.cudes[i].sorce; //添加分数
                        }
                        else if (y > this.cudes[i].posY) {
                            if (!this.inArray(this.cudes[i], moveArr))
                                moveArr.push(this.cudes[i]);
                        }
                    }
                }
            }
            if (removeArr.length < 1)
                return false;
            panel.interval.score = Math.floor(score + (removeArr.length / 10)); //多行奖励分数
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
            var newmoveArr = this.ArrSortDesc(moveArr); //对需要移动的数据进行Y轴倒叙
            for (var i = 0; i < newmoveArr.length; i++) {
                egret.Tween.removeTweens(newmoveArr[i]);
                var newY = this.moveCudePosYCount(newmoveArr[i]), //检测碰撞，获取新的坐标值
                tw = egret.Tween.get(newmoveArr[i]);
                moveArr[i].posY = newY;
                tw.to({
                    y: cudeData.posTo(newY)
                }, 100).call(function (target, y) {
                    //如果新行可以消除则调用消除方法
                    if (_this.canRemove(y))
                        _this.remove();
                }, this, [moveArr[i], newY]);
            }
            return true;
        };
        /**
         * 检测是否在数据数组中
         * @param target 被检测对象
         * @param targets 数组
         * @returns {boolean}
         */
        cudeData.prototype.inArray = function (target, targets) {
            for (var i = 0; i < targets.length; i++) {
                if (target.hashCode === targets[i].hashCode)
                    return true;
            }
            return false;
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
                var newX = cudeData.posTo(newPosXy[i].posX), newY = cudeData.posTo(newPosXy[i].posY);
                egret.Tween.removeTweens(this.nowCude[i]);
                /*this.nowCude[i].posX = newPosXy[i].posX
                this.nowCude[i].posY = newPosXy[i].posY*/
                egret.Tween.get(this.nowCude[i]).to({
                    x: newX,
                    y: newY
                }, 15, egret.Ease.sineIn).set({
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
            return value * grid.gridSize + 1 + grid.gridSize / 2;
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
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize));
                        }
                    }
                    break;
                case cudeType.Type2:
                    for (var y = 2; y >= 0; y--) {
                        for (var x = minX; x <= maxX; x++) {
                            if (y < 2 && x > minX)
                                continue;
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize));
                        }
                    }
                    break;
                case cudeType.Type3:
                    for (var y = 2; y >= 0; y--) {
                        for (var x = minX; x <= maxX; x++) {
                            if ((y < 1 && x > minX) || (y > 1 && x < maxX))
                                continue;
                            maps.push(new cude(x, y, cude.cudeSize, cude.cudeSize));
                        }
                    }
                    break;
                case cudeType.Type4:
                    for (var y = 0; y < 2; y++) {
                        if (y < 1) {
                            maps.push(new cude(minX, y, cude.cudeSize, cude.cudeSize));
                        }
                        else {
                            maps.push(new cude((minX - 1), y, cude.cudeSize, cude.cudeSize));
                            maps.push(new cude(minX, y, cude.cudeSize, cude.cudeSize));
                            maps.push(new cude(maxX, y, cude.cudeSize, cude.cudeSize));
                        }
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
