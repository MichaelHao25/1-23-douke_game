var dds = new Array(0, 1, 2, 3, 4, 5, 11, 17, 23, 29, 28, 27, 26, 25, 24, 18, 12, 6);
var all = $("#contentDraw>.lottery");

var ss = function(v) {
	$(all).removeClass("active").css({
		width: "146px",
		height: "103px"
	});
	unbindClickEvt();
	StartGame();
	result = ['1,1'];
};

bindClickEvt()

function bindClickEvt() {
	$("#g_go1").bind("click", function() {
		ss()
	}).css("cursor", "pointer");
	$("#g_go10").bind("click", function() {
		ss()
	}).css("cursor", "pointer");
	$("#f_go").bind("click", function() {
		ss()
	}).css("cursor", "pointer");

	$("#f_go").bind("mouseover", function() {
		$(this).find("img").attr("src", "img/btn_bg7.jpg");
	}).bind("mouseout", function() {
		$(this).find("img").attr("src", "img/btn_bg6.jpg");
	})

	$("#g_go1").bind("mouseover", function() {
		$(this).find("img").attr("src", "img/btn_bg2.jpg");
	}).bind("mouseout", function() {
		$(this).find("img").attr("src", "img/btn_bg1a.jpg");
	});

	$("#g_go10").bind("mouseover", function() {
		$(this).find("img").attr("src", "img/btn_bg2.jpg");
	}).bind("mouseout", function() {
		$(this).find("img").attr("src", "img/btn_bg1b.jpg");
	})
}

function unbindClickEvt() {
	$("#g_go1").unbind("click").css("cursor", "default");
	$("#g_go10").unbind("click").css("cursor", "default");
	$("#f_go").unbind("click").css("cursor", "default");
}

var Interv, __step = 0;

function SMove() {
	var s = $("#_PrizesAll li").size() - 1;
	$("#_PrizesAll li").eq(__step).hide(100);
	__step = __step + 1 > s ? 0 : __step + 1;
	$("#_PrizesAll li").eq(__step).show(100);
}

function CheckAllPrizes() {
	if ($("#_PrizesAll li").size() > 1) {
		if (Interv != null)
			clearInterval(Interv);
		Interv = setInterval(SMove, 2500);
	}
}

var Time, result, _step = 0;
var pTime;
var cycle, Speed = 180,
	flag, num, lastnum = 0,
	countSpeed = 0;

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}

function StartGame() {
	clearInterval(pTime);
	clearInterval(Time);
	cycle = 0;
	num = lastnum;
	countSpeed = 0;
	flag = false;
	_step = parseInt(Math.random() * 6 + 3);
	Time = setInterval(Star, Speed);
}

function pStar() {
	$(all.eq(dds[num])).fadeOut().fadeIn();
}

function Star() {
	//加速
	if (++countSpeed < 6 && cycle <= 1) {
		clearInterval(Time);
		if (countSpeed < 6) Speed -= 30;
		Time = setInterval(Star, Speed);
	} else if (result != undefined && cycle > 3) {
		var firstone = result[0].split(",");
		var e = firstone[0];
		var _Num = dds.indexOf(parseInt(e));
		var fNum = (_Num - _step < 0) ? (dds.length - (_step - _Num)) : (_Num - _step);
		var fCycle = (_Num - _step < 0) ? 4 : 5;

		if (cycle % fCycle == 0 && num == fNum) { //减速
			clearInterval(Time);
			Time = setInterval(Star, 180);
		} else if (cycle % 5 == 0) {
			if (e == dds[num]) {
				lastnum = num;
				$(all.eq(dds[num - 1 < 0 ? dds.length - 1 : num - 1])).removeClass("active").css({
					width: "146px",
					height: "103px"
				});
				$(all.eq(dds[num])).addClass("active").css({
					width: "140px",
					height: "97px"
				});
				clearInterval(Time);
				pTime = setInterval(pStar, 1000);
				Speed = 180;
				return;
			}
		}
	}

	$(all.eq(dds[num - 1 < 0 ? dds.length - 1 : num - 1])).removeClass("active").css({
		width: "146px",
		height: "103px"
	});
	$(all.eq(dds[num])).addClass("active").css({
		width: "140px",
		height: "97px"
	});

	num++;

	if (num >= dds.length) {
		cycle++;
		num = 0;
	}
}



$('*[data-js-tabs]').children().on('click', function() {
	var tabs_obj = $(this).parent().attr('data-js-tabs');
	$(tabs_obj).children().eq($(this).index()).show().siblings().hide();
	$(this).addClass('active').siblings().removeClass('active');
});
$.each($('*[data-js-tabs]'), function(index, el) {
	var arg = window.location.search;
	if (arg != '') {
		arg = arg.split('?')[1].split('=')[1];
		console.log(arg);
		$(el).children().eq(arg - 1).trigger('click');

	} else {
		$(el).children().first().addClass('active');
		$($(el).attr('data-js-tabs')).children().eq(0).show().siblings().hide();;
	}
});
