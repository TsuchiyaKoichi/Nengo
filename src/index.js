(function(exports) {
	
	'use strict';

	//var nengo = exports.nengo || {};

	function Nengo(params) {

		// 各月の日数(通常年)
		this.MONTH_DATE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// パラメータ処理
		params = params || {};
		params.defaultDate = params.defaultDate || new Date(2005, 0, 1);
		params.maxEndDate = params.maxEndDate || new Date(2087, 11, 31);

		// 変数宣言

		// 各選択肢配列
		this.nengos = [];
		this.years = [];
		this.months = [];
		this.dates = [];
		// 選択中年月日
		this.currentNengo = -1;
		this.currentYear = -1;
		this.currentMonth = -1;
		this.currentDate = -1;

		// 初期化処理
		this.initialize(params);
	}

	//===============================================
	// 初期化処理
	//===============================================
	Nengo.prototype.initialize = function(params) {

		this.nengos = [
			{ id: 1, nengo: '明治', startDate: new Date(1868, 0 , 1 ), endDate: new Date(1912, 6 , 29) },
			{ id: 2, nengo: '大正', startDate: new Date(1912, 6 , 30), endDate: new Date(1926, 11, 24) },
			{ id: 3, nengo: '昭和', startDate: new Date(1926, 11, 25), endDate: new Date(1989, 0 , 8 ) },
			{ id: 4, nengo: '平成', startDate: new Date(1989, 0 , 9 ), endDate: params.maxEndDate }
		];

		// 初期選択
		var nengoYear = this.calcNengoYear(params.defaultDate);
		this.setNengo(nengoYear.nengo);
		this.setYear(nengoYear.year);
		this.setMonth(params.defaultDate.getMonth() + 1);
		this.setDate(params.defaultDate.getDate());
	};

	//===============================================
	// 年号をセットする
	//===============================================
	Nengo.prototype.setNengo = function(nengoId) {

		this.currentNengo = nengoId;
		this.reloadYears();
	};

	Nengo.prototype.reloadYears = function() {
		
		// 年号情報を取得
		var nengoInfo = this.nengos[this.currentNengo - 1];

		// years配列を更新
		var end = nengoInfo.endDate.getFullYear() - nengoInfo.startDate.getFullYear() + 1;
		this.years = range(1, end);
	};

	//===============================================
	// 年をセットする
	//===============================================
	Nengo.prototype.setYear = function(year) {

		this.currentYear = year;
		this.reloadMonths();
	};

	Nengo.prototype.reloadMonths = function() {

		var start = 1;
		var end = 12;

		// 年号の変わり目のとき
		var currentADYear = this.getADYear(this.currentNengo, this.currentYear);
		var nengoInfo = this.nengos[this.currentNengo - 1];
		if(currentADYear === nengoInfo.startDate.getFullYear()) {
			start = nengoInfo.startDate.getMonth() + 1;
			if(this.currentMonth === start) {
				this.reloadDates();
			}
		} else if(currentADYear === nengoInfo.endDate.getFullYear()) {
			end = nengoInfo.endDate.getMonth() + 1
			if(this.currentMonth === end) {
				this.reloadDates();
			}
		}

		this.months = range(start, end);

		this.reloadDates();
	};

	//===============================================
	// 月をセットする
	//===============================================
	Nengo.prototype.setMonth = function(month) {

		this.currentMonth = month;
		this.reloadDates();
	};

	Nengo.prototype.reloadDates = function() {

		var start = 1;
		var end = this.MONTH_DATE[this.currentMonth - 1];

		var currentADYear = this.getADYear(this.currentNengo, this.currentYear);

		// うるう年の2月のとき
		if(this.currentMonth === 2 && this.isLeapYear(currentADYear)) {
			end = 29;
		}

		// 年号の変わり目のとき
		var nengoInfo = this.nengos[this.currentNengo - 1];
		if(currentADYear === nengoInfo.startDate.getFullYear() && this.currentMonth === nengoInfo.startDate.getMonth() + 1) {
			start = nengoInfo.startDate.getDate();
		} else if(currentADYear === nengoInfo.endDate.getFullYear() && this.currentMonth === nengoInfo.endDate.getMonth() + 1) {
			end = nengoInfo.endDate.getDate();
		}

		this.dates = range(start, end);
	}

	//===============================================
	// 日をセットする
	//===============================================
	Nengo.prototype.setDate = function(date) {

		this.currentDate = date;
	};

	//===============================================
	// 指定日付から年号の年を取得する
	//===============================================
	Nengo.prototype.calcNengoYear = function(date) {

		// 対象となる年号オブジェクトを取得
		var nengo = this.nengos[3];
		for(var i = 0; i < this.nengos.length; i++) {

			var obj = this.nengos[i];
			if(obj.startDate <= date && obj.endDate >= date) {
				nengo = obj;
			}
		}

		// 年号と年をセット
		var nengoYear = {};
		nengoYear.nengo = nengo.id;
		nengoYear.year = date.getFullYear() - nengo.startDate.getFullYear() + 1;

		return nengoYear;
	};

	Nengo.prototype.getADYear = function(nengoId, year) {

		return this.nengos[nengoId - 1].startDate.getFullYear() + year - 1;
	};

	Nengo.prototype.isLeapYear = function(year) {

		if(year % 400 === 0) {

			return true;

		} else if(year % 100 === 0) {
			
			return false;

		} else if(year % 4 === 0) {

			return true;
		}

		return false;
	};


	//===============================================
	// startからendまでの数値配列を返す
	//===============================================
	function range(start, end) {

		var array = [];
		for(var i = start; i <= end; i++) {
			array.push(i);
		}

		return array;
	}

	exports.Nengo = Nengo;
})(this);