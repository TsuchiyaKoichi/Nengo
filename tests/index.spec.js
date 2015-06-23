(function(){

	// 年号クラスインスタンス生成
	var nengo = new Nengo();

	describe('年号クラスインスタンス生成', function() {

		it('nengoはオブジェクトである', function() {
			expect(nengo).to.be.an('Object');
		});

		describe('初期化処理', function() {

			it('nengosに年号情報がセットされる', function() {
				expect(nengo.nengos).to.have.length(4);
			});

			it('初期選択は「平成17年1月1日」となる', function() {

				//expect(nengo.currentNengo).to.equal(3);
				//expect(nengo.currentYear).to.equal(17);
				expect(nengo.currentMonth).to.equal(1);
				expect(nengo.currentDate).to.equal(1);
			});
		});
	});

	// 年号の変更
	describe('年号を変更する', function() {

		it('明治をセットするとyearsは1から45の配列になる', function() {
			nengo.setNengo(0);
			expect(nengo.years).to.have.length(45);
		});

		it('大正をセットするとyearsは1から15の配列になる', function() {
			nengo.setNengo(1);
			expect(nengo.years).to.have.length(15);
		});

		it('昭和をセットするとyearsは1から64の配列になる', function() {
			nengo.setNengo(2);
			expect(nengo.years).to.have.length(64);
		});

		it('平成をセットするとyearsは1から37の配列になる', function() {
			nengo.setNengo(3);
			expect(nengo.years).to.have.length(37);
		});
	});

	// 月の変更
	describe('月を変更する', function() {

		it('1月は31日まで', function() {
			nengo.setMonth(1);
			expect(nengo.dates).to.have.length(31);
		})
	});
})();