var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tool = Uilt.Tool;
/**
 * Created by feizhugame on 2017/9/6.
 */
var Play;
(function (Play) {
    var Stage = Uilt.Stage;
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
            cudeData.interval.createRandOneCude();
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
    //格子容器对象
    var grid = (function (_super) {
        __extends(grid, _super);
        function grid() {
            var _this = _super.call(this) || this;
            //画格子
            _this.gridMaps = [];
            _this.initGrid();
            _this.width = Stage.stageW;
            _this.height = Stage.stageH;
            _this['anchorX'] = 1;
            _this['anchorY'] = 1;
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
                return 64;
            },
            enumerable: true,
            configurable: true
        });
        grid.prototype.initGrid = function () {
            for (var x = 0; x < grid.gridItemCols; x++) {
                var gridItemX = new gridLine((x * grid.gridSize), 0, (x * grid.gridSize), Stage.stageH);
                this.addChild(gridItemX);
                for (var y = 1; y < grid.gridItemRows; y++) {
                    var gridItemY = new gridLine(0, (y * grid.gridSize), ((x + 1) * grid.gridSize), (y * grid.gridSize));
                    this.addChild(gridItemY);
                    this.gridMaps.push(new gridMap(x, y)); //添加位置到数组中
                }
            }
        };
        return grid;
    }(egret.Sprite));
    grid.gridItemCols = 10; //列
    grid.gridItemRows = 18; //行
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
    //方块类型
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
        function cude(x, y, w, h, color) {
            var _this = _super.call(this) || this;
            _this.graphics.beginFill(color);
            _this.graphics.drawRoundRect(x, y, w, h, 10, 10);
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
    var cudeData = (function (_super) {
        __extends(cudeData, _super);
        function cudeData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cudes = [];
            return _this;
        }
        Object.defineProperty(cudeData, "interval", {
            get: function () {
                return (this._interval || (this._interval = new cudeData));
            },
            enumerable: true,
            configurable: true
        });
        cudeData.prototype.createRandOneCude = function () {
            var rand = Math.round(Math.random() * (grid.gridItemCols - 1)), cudetype = Math.round(Math.random() * cudeType.end), effectCude = this.cudesEffect(1, rand);
            for (var i = 0; i < effectCude.length; i++) {
                this.cudes.push(effectCude[i]);
                this.addChild(effectCude[i]);
            }
        };
        /**
         * 效果方块
         * @param type
         * @param posX
         * @returns {Array<cude>}
         */
        cudeData.prototype.cudesEffect = function (type, posX) {
            var maps = [];
            switch (type) {
                case cudeType.Type1:
                    maps.push(new cude((posX * grid.gridSize + 1), 0, cude.cudeSize, cude.cudeSize, 0xff0000));
                    var posXType1 = void 0;
                    if (posX >= (grid.gridItemCols / 2)) {
                        posXType1 = posX - 1;
                    }
                    else {
                        posXType1 = posX + 1;
                    }
                    maps.push(new cude((posXType1 * grid.gridSize + 1), 0, cude.cudeSize, cude.cudeSize, 0xff0000));
                    break;
                default:
                    var posXs = posX * grid.gridSize;
                    maps.push(new cude(posXs, 0, cude.cudeSize, cude.cudeSize, 0xff0000));
                    break;
            }
            return maps;
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
            _this.graphics.lineStyle(_this.LineWidth, _this.LineColor);
            _this.graphics.moveTo(x, y);
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
