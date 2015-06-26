(function(){

	// 年号クラスインスタンス生成
	var nengo = new Nengo();

	describe('年号クラスインスタンス生成', function() {

		it('nengoはオブジェクトである', function() {
			expect(nengo).to.be.an('Object');
		});

		describe('初期化処理(パラメータなし)', function() {

			it('平成のendDateは「平成99年12月31日」となっている', function() {
				expect(nengo.nengos[3].endDate.toDateString()).to.equal(new Date(2087, 11, 31).toDateString());
			});

			it('初期選択は「平成17年1月1日」となる', function() {
				expect(nengo.currentNengo).to.equal(4);
				expect(nengo.currentYear).to.equal(17);
				expect(nengo.currentMonth).to.equal(1);
				expect(nengo.currentDate).to.equal(1);
			});

			it('nengosに年号情報がセットされる', function() {
				expect(nengo.nengos).to.have.length(4);
			});

			it('yearsに選択肢リストがセットされている', function() {
				expect(nengo.years).to.not.be.empty;
			});

			it('monthsに選択肢リストがセットされている', function() {
				expect(nengo.months).to.not.be.empty;
			});

			it('datesに選択肢リストがセットされている', function() {
				expect(nengo.dates).to.not.be.empty;
			});
		});

		describe('初期化処理(パラメータあり)', function() {

			var testNengo = new Nengo({ defaultDate: new Date(1868, 0, 1), maxEndDate: new Date() });

			it('初期選択は「明治1年1月1日」となる', function() {
				expect(testNengo.currentNengo).to.equal(1);
				expect(testNengo.currentYear).to.equal(1);
				expect(testNengo.currentMonth).to.equal(1);
				expect(testNengo.currentDate).to.equal(1);
			});

			it('平成のendDateは今日の日付となっている', function() {
				expect(testNengo.nengos[3].endDate.toDateString()).to.equal(new Date().toDateString());
			});
		});
	});

	describe('年号を変更する setNengo()', function() {

		it('明治をセットするとyearsは1から45の配列になる', function() {
			nengo.setNengo(1);
			expect(nengo.years).to.have.length(45);
		});

		it('大正をセットするとyearsは1から15の配列になる', function() {
			nengo.setNengo(2);
			expect(nengo.years).to.have.length(15);
		});

		it('昭和をセットするとyearsは1から64の配列になる', function() {
			nengo.setNengo(3);
			expect(nengo.years).to.have.length(64);
		});

		it('平成をセットするとyearsは1から37の配列になる', function() {
			nengo.setNengo(4);
			expect(nengo.years).to.have.length(99);
		});
	});

	describe('年を変更する setYear()', function() {

		describe('年号の変わり目の確認', function() {

			it('平成1年は1月～12月までである', function() {
				nengo.setNengo(4);
				nengo.setYear(1);
				expect(nengo.months).to.have.length(12);
			})

			it('昭和64年は1月だけである', function() {
				nengo.setNengo(3);
				nengo.setYear(64);
				expect(nengo.months).to.have.length(1);
			});

			it('昭和1年は12月だけである', function() {
				nengo.setNengo(3);
				nengo.setYear(1);
				expect(nengo.months).to.have.length(1);
			});

			it('大正15年は1月～12月までである', function() {
				nengo.setNengo(2);
				nengo.setYear(15);
				expect(nengo.months).to.have.length(12);
			});

			it('大正1年は7月～12月までである', function() {
				nengo.setNengo(2);
				nengo.setYear(1);
				expect(nengo.months).to.have.length(6);
			});

			it('明治45年は1月～7月までである', function() {
				nengo.setNengo(1);
				nengo.setYear(45);
				expect(nengo.months).to.have.length(7);
			});

			it('明治1年は1月～12月までである', function() {
				nengo.setNengo(1);
				nengo.setYear(1);
				expect(nengo.months).to.have.length(12);
			});
		});

		describe('年号の変わり目の年に変更された時、選択中の月が変わり目の月だったとき', function() {

			it('「平成2年1月」選択中から「平成1年」に変更したとき', function() {
				nengo.setNengo(4);
				nengo.setYear(2);
				nengo.setMonth(1);
				nengo.setYear(1);
				expect(nengo.dates).to.have.length(23);
				expect(nengo.dates[0]).to.equal(9);
			});

			it('「昭和63年1月」選択中から「昭和64年」に変更したとき', function() {
				nengo.setNengo(3);
				nengo.setYear(63);
				nengo.setMonth(1);
				nengo.setYear(64);
				expect(nengo.dates).to.have.length(8);
				expect(nengo.dates[nengo.dates.length - 1]).to.equal(8);
			});

			it('「大正10年7月」選択中から「大正1年」に変更したとき', function() {
				nengo.setNengo(2);
				nengo.setYear(10);
				nengo.setMonth(7);
				nengo.setYear(1);
				expect(nengo.dates).to.have.length(2);
				expect(nengo.dates[0]).to.equal(30);
			});
		});

		describe('年号の変わり目月を選択中に、年が変更されたとき', function() {

			it('「昭和1年12月」選択中から「昭和10年」に変更したとき', function() {
				nengo.setNengo(3);
				nengo.setYear(1);
				nengo.setMonth(12);
				nengo.setYear(10);
				expect(nengo.dates).to.have.length(31);
			});
		});

		describe('うるう年の2月を選択中に、年が変更されたとき', function() {
			it('保留');
		});
	});

	describe('月を変更する setMonth()', function() {

		describe('通常月の確認', function() {

			before(function() {
				nengo.setNengo(4);
				nengo.setYear(27);
			});

			it('1月、3月、5月、7月、8月、10月、12月は31日まで', function() {
				nengo.setMonth(1);
				expect(nengo.dates).to.have.length(31);
				nengo.setMonth(3);
				expect(nengo.dates).to.have.length(31);
				nengo.setMonth(5);
				expect(nengo.dates).to.have.length(31);
				nengo.setMonth(7);
				expect(nengo.dates).to.have.length(31);
				nengo.setMonth(8);
				expect(nengo.dates).to.have.length(31);
				nengo.setMonth(10);
				expect(nengo.dates).to.have.length(31);
				nengo.setMonth(12);
				expect(nengo.dates).to.have.length(31);
			});

			it('4月、6月、9月、11月は30日まで', function() {
				nengo.setMonth(4);
				expect(nengo.dates).to.have.length(30);
				nengo.setMonth(6);
				expect(nengo.dates).to.have.length(30);
				nengo.setMonth(9);
				expect(nengo.dates).to.have.length(30);
				nengo.setMonth(11);
				expect(nengo.dates).to.have.length(30);
			});
		});

		describe('2月の確認(閏年の確認)', function() {

			before(function() {
				nengo.setNengo(4);
			});

			it('平成27年(2015年)2月は28日まで', function() {
				nengo.setYear(27);
				nengo.setMonth(2);
				expect(nengo.dates).to.have.length(28);
			});

			it('平成28年(2016年)2月は29日まで', function() {
				nengo.setYear(28);
				nengo.setMonth(2);
				expect(nengo.dates).to.have.length(29);
			});
		});

		describe('年号の変わり目の月の確認', function() {

			it('平成1年の1月は9日～31日', function() {
				nengo.setYear(1);
				nengo.setMonth(1);
				expect(nengo.dates).to.have.length(23);
				expect(nengo.dates[0]).to.equal(9);
			});

			it('昭和64年の1月は1日～8日', function() {
				nengo.setNengo(3);
				nengo.setYear(64);
				nengo.setMonth(1);
				expect(nengo.dates).to.have.length(8);
				expect(nengo.dates[nengo.dates.length - 1]).to.equal(8);
			});

			it('昭和1年の12月は25日～31日', function() {
				nengo.setNengo(3);
				nengo.setYear(1);
				nengo.setMonth(12);
				expect(nengo.dates).to.have.length(7);
				expect(nengo.dates[0]).to.equal(25);
			});

			it('大正15年の12月は1日～24日', function() {
				nengo.setNengo(2);
				nengo.setYear(15);
				nengo.setMonth(12);
				expect(nengo.dates).to.have.length(24);
				expect(nengo.dates[nengo.dates.length - 1]).to.equal(24);
			});

			it('大正1年の7月は30日～31日', function() {
				nengo.setNengo(2);
				nengo.setYear(1);
				nengo.setMonth(7);
				expect(nengo.dates).to.have.length(2);
				expect(nengo.dates[0]).to.equal(30);
			});

			it('明治45年の7月は1日～29日', function() {
				nengo.setNengo(1);
				nengo.setYear(45);
				nengo.setMonth(7);
				expect(nengo.dates).to.have.length(29);
				expect(nengo.dates[nengo.dates.length - 1]).to.equal(29);
			});

			it('明治1年の1月は1日～31日', function() {
				nengo.setNengo(1);
				nengo.setYear(1);
				nengo.setMonth(1);
				expect(nengo.dates).to.have.length(31);
				expect(nengo.dates[0]).to.equal(1);
			});
		});
	});

	describe('西暦の取得式 getADYear()', function() {

		it('平成27年は2015年である', function() {
			expect(nengo.getADYear(4, 27)).to.equal(2015);
		});

		it('昭和1年は1925年である', function() {
			expect(nengo.getADYear(3, 1)).to.equal(1926);
		});

		it('大正5年は1916年である', function() {
			expect(nengo.getADYear(2, 5)).to.equal(1916);
		});

		it('明治45年は1911年である', function() {
			expect(nengo.getADYear(1, 45)).to.equal(1912);
		});
	});

	describe('閏年の判定式 isLeapYear()', function() {

		it('2015年は閏年ではない', function() {
			expect(nengo.isLeapYear(2015)).to.be.false;
		});

		it('2016年は閏年である', function() {
			expect(nengo.isLeapYear(2016)).to.be.true;
		});

		it('1900年は閏年ではない', function() {
			expect(nengo.isLeapYear(1900)).to.be.false;
		});

		it('2000年は閏年である', function() {
			expect(nengo.isLeapYear(2000)).to.be.true;
		});
	});
})();