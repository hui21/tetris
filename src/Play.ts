import Tool = Uilt.Tool;
/**
 * Created by feizhugame on 2017/9/6.
 */
module Play {
    import Stage = Uilt.Stage;
    export class Game extends eui.Component {
        private menuMap: egret.Sprite = new egret.Sprite();//菜单对象
        private ScoreMap: egret.Sprite = new egret.Sprite();//分数对象
        private LeveMap: egret.Sprite = new egret.Sprite();//关卡对象
        public menuTween: egret.tween.TweenGroup;
        public static _interval:Game;
        public static get interval(): Game{
            return (this._interval || (this._interval = new Game));
        }

        public static Init(): Game{
            let game = Game.interval;
            Stage.interval.init();
            return game;
        }

        public menuInit(){
            this.skinName = "menu";
            this.menuTween.play(0)
        }
    }
}