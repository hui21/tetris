module Uilt {
	export class Game {
		private Status:GameStatus;//当前的游戏状态
		private NowTimer:number = 0;//游戏时间
		private Timeer:number = 10;// 倒计时
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
		 * 当前游戏时间递增
		 */
		public incNowTimeer(){
			++this.NowTimer;
		}

		public dec
	}
	export enum GameStatus{
		Load = 0,//加载资源
		Start = 1,//开始游戏
		Stop = 2,//暂停游戏
		Died = 3,//游戏结束
		Finash = 4,//通过游戏
	}
}