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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.menuMap = new egret.Sprite(); //菜单对象
            _this.ScoreMap = new egret.Sprite(); //分数对象
            _this.LeveMap = new egret.Sprite(); //关卡对象
            return _this;
        }
        Object.defineProperty(Game, "interval", {
            get: function () {
                return (this._interval || (this._interval = new Game));
            },
            enumerable: true,
            configurable: true
        });
        Game.Init = function () {
            var game = Game.interval;
            Stage.interval.init();
            return game;
        };
        Game.prototype.menuInit = function () {
            this.skinName = "menu";
            this.menuTween.play(0);
        };
        return Game;
    }(eui.Component));
    Play.Game = Game;
    __reflect(Game.prototype, "Play.Game");
})(Play || (Play = {}));
