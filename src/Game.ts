import Tool = Uilt.Tool;
/**
 * Created by feizhugame on 2017/9/6.
 */
class Game extends egret.Sprite {
    private menuMap: egret.Sprite = new egret.Sprite();//菜单对象
    private ScoreMap: egret.Sprite = new egret.Sprite();//分数对象
    private LeveMap: egret.Sprite = new egret.Sprite();//关卡对象
    public static _interval:Game;
    public static get interval(): Game{
        return (this._interval || (this._interval = new Game));
    }

    public static Init(): Game{
        let game = Game.interval;
        game.menuMap = new egret.Sprite();
        return game;
    }

    public menuInit(){
        let startBtn:egret.Sprite = new egret.Sprite(),
            explainBtn: egret.Sprite = new egret.Sprite();
    }
}