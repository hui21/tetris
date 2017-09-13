module Uilt {
	//配置类
	import AssetsAdapter = eui.AssetsAdapter;
	export class Config {
		public static debug = true;
		public static panelLineWidth = 2;
		public static panelLineColor = 0x00ff00;
	}
	//游戏基本属性类
	export class Game {
		private Status:GameStatus;//当前的游戏状态
		private NowTimer:number = 0;//游戏时间
		private Timeer:number = 10;// 倒计时
		private Score:number = 0;//分数
		public constructor() {
		}

		/**
		 * 获取游戏状态
		 * @returns {GameStatus}
		 */
		public getGameStatus(): GameStatus{
			return this.Status;
		}

		/**
		 * 设置游戏状态
		 * @param status
		 * @returns {GameStatus}
		 */
		public setGameStatus(status:GameStatus){
			return this.Status = status;
		}

		/**
		 * 获取当前时间
		 * @returns {number}
		 */
		public getNowTime():number {
			return this.NowTimer;
		}
		/**
		 * 当前游戏时间递增
		 * @param num
		 */
		public incNowTimeer(num: number = 1){
			this.NowTimer += num;
		}

		/**
		 * 获取当前倒计时
		 * @returns {number}
		 */
		public getTime():number {
			return this.Timeer;
		}
		/**
		 * 倒计时自减
		 * @param num
		 */
		public decTimeer(num: number = 1){
			this.Timeer -= num;
		}

		/**
		 * 获取当前分数
		 * @returns {number}
		 */
		public getScore():number {
			return this.Score;
		}
		/**
		 * 当前分数自减
		 * @param num
		 */
		public decScore(num: number = 1){
			this.Score -= num;
		}

		/**
		 * 当前分数自增
		 * @param num
		 */
		public incScore(num: number = 1){
			this.Score -= num;
		}

		public static _interval:Game;
		public static get interval(): Game{
			return (this._interval || (this._interval = new Game));
		}
	}
	//场景类
	export class Scene extends egret.Sprite  {
		private maps:Array<egret.Sprite>
	}
	//工具 类
	export class Tool {
		/**
		 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
		 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
		 */
		public static createBitmapByName(name: string) {
			let result = new egret.Bitmap();
			let texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

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
		public static createLineTo(
			x:number = 0, y: number = 0, w:number, h: number,
			lineW:number = Config.panelLineWidth, lineC: number = Config.panelLineColor
		){
			var shp:egret.Shape = new egret.Shape();
			shp.graphics.lineStyle( lineW, lineC );
			shp.graphics.moveTo( x, y );
			shp.graphics.lineTo( w, h );
			shp.graphics.endFill();
			return shp;
		}

		public static createCurveTo(
			x:number = 0, y: number = 0, x1:number, y1: number, w:number, h: number,
			lineW:number = Config.panelLineWidth, lineC: number = Config.panelLineColor
		){
			var shp:egret.Shape = new egret.Shape();
			shp.graphics.lineStyle( lineW, lineC );
			shp.graphics.moveTo( x, y );
			shp.graphics.curveTo( x1, y1, w, h );
			shp.graphics.endFill();
			return shp;
		}
	}
	//舞台类
	export class Stage {
		public static _interval:Stage;
		public static get interval(): Stage{
			this.stage.width = 640
			return (this._interval || (this._interval = new Stage));
		}
		/**
		 * 加载进度界面
		 * Process interface loading
		 */
		private loadingView: LoadingUI = new LoadingUI;
		/**
		 * 获取舞台
		 */
		public static get stage(){
			return egret.MainContext.instance.stage;
		}

		/**
		 * 舞台宽度
		 */
		public static get stageW(){
			return egret.MainContext.instance.stage.stageWidth;
		}

		/**
		 * 舞台高度
		 */
		public static get stageH() {
			return egret.MainContext.instance.stage.stageHeight;
		}

		public init(){
			//注入自定义的素材解析器
			let assetAdapter = new AssetAdapter();
			egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
			egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
			//初始化Resource资源加载库
			//initiate Resource loading library
			RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
			RES.loadConfig("resource/default.res.json", "resource/");
		}

		/**
		 * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
		 * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
		 */
		private onConfigComplete(event: RES.ResourceEvent): void {
			RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

			let theme = new eui.Theme("resource/default.thm.json", Stage.stage);
			theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.loadGroup("preload");
		}

		private isThemeLoadEnd: boolean = false;
		/**
		 * 主题文件加载完成,开始预加载
		 * Loading of theme configuration file is complete, start to pre-load the
		 */
		private onThemeLoadComplete(): void {
			this.isThemeLoadEnd = true;
			Play.Game.interval.menuInit()
		}

		/**
		 * preload资源组加载完成
		 * Preload resource group is loaded
		 */
		private onResourceLoadComplete(event: RES.ResourceEvent) {
			if (event.groupName == "preload") {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
				RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
				RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
				RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
			}
		}

		/**
		 * 资源组加载出错
		 *  The resource group loading failed
		 */
		private onItemLoadError(event: RES.ResourceEvent) {
			console.warn("Url:" + event.resItem.url + " has failed to load");
		}

		/**
		 * 资源组加载出错
		 *  The resource group loading failed
		 */
		private onResourceLoadError(event: RES.ResourceEvent) {
			//TODO
			console.warn("Group:" + event.groupName + " has failed to load");
			//忽略加载失败的项目
			//Ignore the loading failed projects
			this.onResourceLoadComplete(event);
		}

		/**
		 * preload资源组加载进度
		 * Loading process of preload resource group
		 */
		private onResourceProgress(event: RES.ResourceEvent) {
			if (event.groupName == "preload") {
				this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
			}
		}
	}
	//加载UI类
	export class LoadingUI extends egret.Sprite {

		public constructor() {
			super();
			this.createView();
		}

		private textField:egret.TextField;

		private createView():void {
			this.textField = new egret.TextField();
			this.addChild(this.textField);
			this.textField.y = 300;
			this.textField.width = 480;
			this.textField.height = 100;
			this.textField.textAlign = "center";
		}

		public setProgress(current:number, total:number):void {
			this.textField.text = `Loading...${current}/${total}`;
		}
	}

	//锚点工具类（需要初始化）
	export class AnchorUtils {
		/**
		 * 设置对象锚点
		 * @param target 对象
		 * @param value 值
		 * @param type 类型，X，Y，X和Y同值
		 */
		public static setAnchor(target: egret.Sprite, value: number, type: Coordinate = Coordinate.both){
			switch (type){
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

		}

		/**
		 * 获取锚点值
		 * @param target 对象
		 * @param type 类型，X，Y，X和Y同值
		 * @returns {any}
		 */
		public static getAnchor(target: egret.Sprite, type: Coordinate = Coordinate.both): number{
			switch (type){
				case Coordinate.x:
					return target['anchorX'];
				case Coordinate.y:
					return target['anchorY'];
				case Coordinate.both:
					if(target['anchorX'] != target['anchorY']){
						return 0;
					}
					return target['anchorX']
				default:
					break;
			}

		}
	}

	export class AssetAdapter implements eui.IAssetAdapter {
		/**
		 * @language zh_CN
		 * 解析素材
		 * @param source 待解析的新素材标识符
		 * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
		 * @param thisObject callBack的 this 引用
		 */
		public getAsset(source: string, compFunc:Function, thisObject: any): void {
			function onGetRes(data: any): void {
				compFunc.call(thisObject, data, source);
			}
			if (RES.hasRes(source)) {
				let data = RES.getRes(source);
				if (data) {
					onGetRes(data);
				}
				else {
					RES.getResAsync(source, onGetRes, this);
				}
			}
			else {
				RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
			}
		}
	}
	//主题解析类
	export class ThemeAdapter implements eui.IThemeAdapter {

		/**
		 * 解析主题
		 * @param url 待解析的主题url
		 * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
		 * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
		 * @param thisObject 回调的this引用
		 */
		public getTheme(url:string,compFunc:Function,errorFunc:Function,thisObject:any):void {
			function onGetRes(e:string):void {
				compFunc.call(thisObject, e);
			}
			function onError(e:RES.ResourceEvent):void {
				if(e.resItem.url == url) {
					RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
					errorFunc.call(thisObject);
				}
			}
			RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
			RES.getResByUrl(url, onGetRes, this, RES.ResourceItem.TYPE_TEXT);
		}
	}
	//游戏状态
	export enum GameStatus{
		Load = 0,//加载资源
		Start = 1,//开始游戏
		Stop = 2,//暂停游戏
		Died = 3,//游戏结束
		Finash = 4,//通过游戏
		OneFinash = 5, //方块下落完成
	}

	//坐标
	export enum Coordinate {
		x = 1,
		y = 2,
		both = 3
	}
}