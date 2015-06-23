(function(exports) {
	
	'use strict';

	//var nengo = exports.nengo || {};

	function Nengo(params) {

		this.MONTH_DATE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		this.nengos = [];
		this.years = [];
		this.months = [];
		this.dates = [];

		this.currentNengo = 1;
		this.currentYear = 1;
		this.currentMonth = 1;
		this.currentDate = 1;

		this.initialize(params);
	}

	Nengo.prototype.initialize = function(params) {

		this.nengos = [
			{ id: 1, nengo: '明治', startDate: '18680101', endDate: '19120729'},
			{ id: 2, nengo: '大正', startDate: '19120730', endDate: '19261224'},
			{ id: 3, nengo: '昭和', startDate: '19261225', endDate: '19890108'},
			{ id: 4, nengo: '平成', startDate: '19890109', endDate: null }
		];

		var defaultDate = '20080101';
		this.currentMonth = parseInt(defaultDate.slice(4,6), 10);
		this.currentDate = parseInt(defaultDate.slice(6,8), 10);
	};

	Nengo.prototype.setNengo = function(nengo) {

		// 年号情報を取得
		var obj = this.nengos[nengo];
		if(obj.endDate === null) {

			// 現在進行中の年号が選択されたときはendDateに10年後の年末をセットする
			var today = new Date();
			obj.endDate = (today.getFullYear() + 10) + '1231';
		}

		var max = parseInt(obj.endDate.slice(0, 4), 10) - parseInt(obj.startDate.slice(0, 4), 10) + 1;

		// years配列を生成
		this.years = createArray(max);
	};

	Nengo.prototype.setMonth = function(month) {

		this.currentMonth = month;

		var max = this.MONTH_DATE[month - 1];
		this.dates = createArray(max);

	};

	Nengo.prototype.

	// 1から指定数値までの連番配列を作成する
	function createArray(max) {

		var array = []
		for(var i = 1; i <= max; i++) {
			array.push(i);
		}

		return array;
	}

	exports.Nengo = Nengo;
})(this);