var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Uilt;
(function (Uilt) {
    //配置类
    var Config = (function () {
        function Config() {
        }
        return Config;
    }());
    Config.debug = true;
    Config.panelLineWidth = 2;
    Config.panelLineColor = 0x00ff00;
    Uilt.Config = Config;
    __reflect(Config.prototype, "Uilt.Config");
    //游戏基本属性类
    var Game = (function () {
        function Game() {
            this.NowTimer = 0; //游戏时间
            this.Timeer = 10; // 倒计时
            this.Score = 0; //分数
        }
        /**
         * 获取游戏状态
         * @returns {GameStatus}
         */
        Game.prototype.getGameStatus = function () {
            return this.Status;
        };
        /**
         * 设置游戏状态
         * @param status
         * @returns {GameStatus}
         */
        Game.prototype.setGameStatus = function (status) {
            return this.Status = status;
        };
        /**
         * 获取当前时间
         * @returns {number}
         */
        Game.prototype.getNowTime = function () {
            return this.NowTimer;
        };
        /**
         * 当前游戏时间递增
         * @param num
         */
        Game.prototype.incNowTimeer = function (num) {
            if (num === void 0) { num = 1; }
            this.NowTimer += num;
        };
        /**
         * 获取当前倒计时
         * @returns {number}
         */
        Game.prototype.getTime = function () {
            return this.Timeer;
        };
        /**
         * 倒计时自减
         * @param num
         */
        Game.prototype.decTimeer = function (num) {
            if (num === void 0) { num = 1; }
            this.Timeer -= num;
        };
        /**
         * 获取当前分数
         * @returns {number}
         */
        Game.prototype.getScore = function () {
            return this.Score;
        };
        /**
         * 当前分数自减
         * @param num
         */
        Game.prototype.decScore = function (num) {
            if (num === void 0) { num = 1; }
            this.Score -= num;
        };
        /**
         * 当前分数自增
         * @param num
         */
        Game.prototype.incScore = function (num) {
            if (num === void 0) { num = 1; }
            this.Score -= num;
        };
        return Game;
    }());
    Uilt.Game = Game;
    __reflect(Game.prototype, "Uilt.Game");
    //场景类
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Scene;
    }(egret.Sprite));
    Uilt.Scene = Scene;
    __reflect(Scene.prototype, "Uilt.Scene");
    //工具 类
    var Tool = (function () {
        function Tool() {
        }
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        Tool.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        /**
         * 绘制直线
         * @param x X坐标
         * @param y Y坐标
         * @param w 宽度
         * @param h 高度
         * @param lineW
         * @param lineC
         * @returns {egret.Shape}
         */
        Tool.createLineTo = function (x, y, w, h, lineW, lineC) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (lineW === void 0) { lineW = Config.panelLineWidth; }
            if (lineC === void 0) { lineC = Config.panelLineColor; }
            var shp = new egret.Shape();
            shp.graphics.lineStyle(lineW, lineC);
            shp.graphics.moveTo(x, y);
            shp.graphics.lineTo(w, h);
            shp.graphics.endFill();
            return shp;
        };
        Tool.createCurveTo = function (x, y, x1, y1, w, h, lineW, lineC) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (lineW === void 0) { lineW = Config.panelLineWidth; }
            if (lineC === void 0) { lineC = Config.panelLineColor; }
            var shp = new egret.Shape();
            shp.graphics.lineStyle(lineW, lineC);
            shp.graphics.moveTo(x, y);
            shp.graphics.curveTo(x1, y1, w, h);
            shp.graphics.endFill();
            return shp;
        };
        return Tool;
    }());
    Uilt.Tool = Tool;
    __reflect(Tool.prototype, "Uilt.Tool");
    //舞台类
    var Stage = (function () {
        function Stage() {
        }
        Object.defineProperty(Stage, "stage", {
            /**
             * 获取舞台
             */
            get: function () {
                return egret.MainContext.instance.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage, "stageW", {
            /**
             * 舞台宽度
             */
            get: function () {
                return egret.MainContext.instance.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage, "stageH", {
            /**
             * 舞台高度
             */
            get: function () {
                return egret.MainContext.instance.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        Stage.prototype.init = function () {
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
        };
        Stage.prototype.onConfigComplete = function (event) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup("preload");
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        Stage.prototype.onResourceLoadComplete = function (event) {
            if (event.groupName == "preload") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        Stage.prototype.onItemLoadError = function (event) {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        Stage.prototype.onResourceLoadError = function (event) {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        };
        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        Stage.prototype.onResourceProgress = function (event) {
            if (event.groupName == "preload") {
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        };
        return Stage;
    }());
    Uilt.Stage = Stage;
    __reflect(Stage.prototype, "Uilt.Stage");
    //加载UI类
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            var _this = _super.call(this) || this;
            _this.createView();
            return _this;
        }
        LoadingUI.prototype.createView = function () {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = 300;
            this.textField.width = 480;
            this.textField.height = 100;
            this.textField.textAlign = "center";
        };
        LoadingUI.prototype.setProgress = function (current, total) {
            this.textField.text = "Loading..." + current + "/" + total;
        };
        return LoadingUI;
    }(egret.Sprite));
    Uilt.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "Uilt.LoadingUI");
    //锚点工具类（需要初始化）
    var AnchorUtils = (function () {
        function AnchorUtils() {
        }
        /**
         * 设置对象锚点
         * @param target 对象
         * @param value 值
         * @param type 类型，X，Y，X和Y同值
         */
        AnchorUtils.setAnchor = function (target, value, type) {
            if (type === void 0) { type = Coordinate.both; }
            switch (type) {
                case Coordinate.x:
                    target['anchorX'] = value;
                    break;
                case Coordinate.y:
                    target['anchorY'] = value;
                    break;
                case Coordinate.both:
                    target['anchorX'] = target['anchorY'] = value;
                    break;
                default:
                    break;
            }
        };
        /**
         * 获取锚点值
         * @param target 对象
         * @param type 类型，X，Y，X和Y同值
         * @returns {any}
         */
        AnchorUtils.getAnchor = function (target, type) {
            if (type === void 0) { type = Coordinate.both; }
            switch (type) {
                case Coordinate.x:
                    return target['anchorX'];
                case Coordinate.y:
                    return target['anchorY'];
                case Coordinate.both:
                    if (target['anchorX'] != target['anchorY']) {
                        return 0;
                    }
                    return target['anchorX'];
                default:
                    break;
            }
        };
        return AnchorUtils;
    }());
    Uilt.AnchorUtils = AnchorUtils;
    __reflect(AnchorUtils.prototype, "Uilt.AnchorUtils");
    //游戏状态
    var GameStatus;
    (function (GameStatus) {
        GameStatus[GameStatus["Load"] = 0] = "Load";
        GameStatus[GameStatus["Start"] = 1] = "Start";
        GameStatus[GameStatus["Stop"] = 2] = "Stop";
        GameStatus[GameStatus["Died"] = 3] = "Died";
        GameStatus[GameStatus["Finash"] = 4] = "Finash";
    })(GameStatus = Uilt.GameStatus || (Uilt.GameStatus = {}));
    //坐标
    var Coordinate;
    (function (Coordinate) {
        Coordinate[Coordinate["x"] = 1] = "x";
        Coordinate[Coordinate["y"] = 2] = "y";
        Coordinate[Coordinate["both"] = 3] = "both";
    })(Coordinate = Uilt.Coordinate || (Uilt.Coordinate = {}));
})(Uilt || (Uilt = {}));