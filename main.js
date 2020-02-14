var activeTabBtn;
var tabBtns = [];
window.onload = function () {
    var tabBtnsWrapper = this.document.getElementById("top_btn_wrapper");
    tabBtns = tabBtnsWrapper.getElementsByTagName("input");
    activeTabBtn = tabBtns[0];
    activeTabBtn.style.backgroundColor = "gray";
    var contentsWrappers = this.document.getElementsByClassName("contents_wrapper");
    var _loop_1 = function (i) {
        tabBtns[i].addEventListener("click", function () {
            activeTabBtn = tabBtns[i];
            for (var j = 0; j < contentsWrappers.length; j++) {
                if (i === j) {
                    contentsWrappers[j].style.display = "block";
                    tabBtns[j].style.backgroundColor = "gray";
                }
                else {
                    contentsWrappers[j].style.display = "none";
                    tabBtns[j].style.backgroundColor = "silver";
                }
            }
        });
    };
    for (var i = 0; i < tabBtns.length; i++) {
        _loop_1(i);
    }
    var calcBtn = this.document.getElementById("calc_btn");
    calcBtn.addEventListener("click", function () {
        switch (activeTabBtn) {
            case tabBtns[0]:
                calcInterpolation();
                break;
            case tabBtns[1]:
                calcAngle();
                break;
            case tabBtns[2]:
                calcRatio();
                break;
            case tabBtns[3]:
                calcTmToLl();
                break;
            case tabBtns[4]:
                calcLlToTm();
                break;
            default:
                break;
        }
    });
    var openManualDlgBtns = this.document.getElementsByClassName("open_manual_dlg_btn");
    for (var i = 0; i < openManualDlgBtns.length; i++) {
        openManualDlgBtns[i].addEventListener("click", function () {
            var manualDlgWrapper = document.getElementById("manual_dlg_wrapper");
            manualDlgWrapper.style.display = "block";
        });
    }
    var closeManualDlgBtn = this.document.getElementById("close_manual_dlg_btn");
    closeManualDlgBtn.addEventListener("click", function () {
        var manualDlgWrapper = document.getElementById("manual_dlg_wrapper");
        manualDlgWrapper.style.display = "none";
    });
};
function calcInterpolation() {
    var xInputs = [
        document.getElementById("interp_x1"),
        document.getElementById("interp_x2"),
        document.getElementById("interp_x3")
    ];
    var yInputs = [
        document.getElementById("interp_y1"),
        document.getElementById("interp_y2"),
        document.getElementById("interp_y3")
    ];
    var inputs = [];
    var emptyCntX = 0;
    var emptyCntY = 0;
    var xVals = [];
    var yVals = [];
    for (var _i = 0, xInputs_1 = xInputs; _i < xInputs_1.length; _i++) {
        var intpIn = xInputs_1[_i];
        if (0 !== intpIn.value.length) {
            xVals.push(Number(intpIn.value));
        }
        else {
            xVals.push(null);
            emptyCntX++;
        }
        inputs.push(intpIn);
    }
    for (var _a = 0, yInputs_1 = yInputs; _a < yInputs_1.length; _a++) {
        var intpIn = yInputs_1[_a];
        if (0 !== intpIn.value.length) {
            yVals.push(Number(intpIn.value));
        }
        else {
            yVals.push(null);
            emptyCntY++;
        }
        inputs.push(intpIn);
    }
    if (1 !== (emptyCntX + emptyCntY)) {
        return;
    }
    for (var i = 0; i < 2; i++) {
        if (null === xVals[i] || null == yVals[i]) {
            var bufferX = xVals[i];
            var bufferY = yVals[i];
            xVals[i] = xVals[i + 1];
            yVals[i] = yVals[i + 1];
            xVals[i + 1] = bufferX;
            yVals[i + 1] = bufferY;
        }
    }
    // 비어있는게 X라면 Y랑 바꿔서 계산하자
    if (1 === emptyCntX) {
        var buffer = xVals;
        xVals = yVals;
        yVals = buffer;
    }
    if (null === yVals[2]) {
        var ret = yVals[0] + (yVals[1] - yVals[0]) * (xVals[2] - xVals[0]) / (xVals[1] - xVals[0]);
        for (var _b = 0, inputs_1 = inputs; _b < inputs_1.length; _b++) {
            var intpIn = inputs_1[_b];
            if (0 === intpIn.value.length) {
                intpIn.value = ret.toString();
                break;
            }
        }
    }
}
function calcRatio() {
    var xInputs = [
        document.getElementById("calc_ratio_x1"),
        document.getElementById("calc_ratio_x2")
    ];
    var yInputs = [
        document.getElementById("calc_ratio_y1"),
        document.getElementById("calc_ratio_y2")
    ];
    var inputs = [];
    var emptyCntX = 0;
    var emptyCntY = 0;
    var xVals = [];
    var yVals = [];
    for (var _i = 0, xInputs_2 = xInputs; _i < xInputs_2.length; _i++) {
        var intpIn = xInputs_2[_i];
        if (0 !== intpIn.value.length) {
            xVals.push(Number(intpIn.value));
        }
        else {
            xVals.push(null);
            emptyCntX++;
        }
        inputs.push(intpIn);
    }
    for (var _a = 0, yInputs_2 = yInputs; _a < yInputs_2.length; _a++) {
        var intpIn = yInputs_2[_a];
        if (0 !== intpIn.value.length) {
            yVals.push(Number(intpIn.value));
        }
        else {
            yVals.push(null);
            emptyCntY++;
        }
        inputs.push(intpIn);
    }
    if (1 !== (emptyCntX + emptyCntY)) {
        return;
    }
    if (null === xVals[0] || null == yVals[0]) {
        var bufferX = xVals[0];
        var bufferY = yVals[0];
        xVals[0] = xVals[1];
        yVals[0] = yVals[1];
        xVals[1] = bufferX;
        yVals[1] = bufferY;
    }
    // 비어있는게 X라면 Y랑 바꿔서 계산하자
    if (1 === emptyCntX) {
        var buffer = xVals;
        xVals = yVals;
        yVals = buffer;
    }
    if (null === yVals[1]) {
        var ret = xVals[1] * yVals[0] / xVals[0];
        for (var _b = 0, inputs_2 = inputs; _b < inputs_2.length; _b++) {
            var intpIn = inputs_2[_b];
            if (0 === intpIn.value.length) {
                intpIn.value = ret.toString();
                break;
            }
        }
    }
}
function calcAngle() {
    var inStrX = document.getElementById("calc_angle_x").value;
    var inStrY = document.getElementById("calc_angle_y").value;
    if (0 === inStrX.length || 0 === inStrY.length) {
        return;
    }
    var inX = Number(inStrX);
    var inY = Number(inStrY);
    var calcAngleRet1 = document.getElementById("calc_angle_ret1");
    var calcAngleRet2 = document.getElementById("calc_angle_ret2");
    var ret1 = inY / inX * 100;
    var ret2 = Math.atan(inY / inX) * 180 / Math.PI;
    calcAngleRet1.textContent = ret1.toString();
    calcAngleRet2.textContent = atlong(ret2);
}
function atlong(x) {
    var dosu = Math.floor(x);
    var min = Math.floor((x - Math.floor(x)) * 60);
    var sec = (((x - Math.floor(x)) * 60 - Math.floor((x - Math.floor(x)) * 60)) * 60).toFixed(2);
    return dosu + "도 " + min + "분 " + sec + "초";
}
function calcTmToLl() {
    var inEllipse = document.getElementById("tm_to_ll_ellipse").value;
    var inFixTime = document.getElementById("tm_to_ll_fix_sec").checked;
    var inOrigin = document.getElementById("tm_to_ll_origin").value;
    var inOriginAdd = document.getElementById("tm_to_ll_origin_add").value;
    var inDecimalStr = document.getElementById("tm_to_ll_decimal").value;
    var inStrX = document.getElementById("tm_to_ll_x").value;
    var inStrY = document.getElementById("tm_to_ll_y").value;
    if (0 === inStrX.length || 0 === inStrY.length) {
        return;
    }
    var inX = Number(inStrX);
    var inY = Number(inStrY);
    var inDecimal = Number(inDecimalStr);
    var a = ("bassel" === inEllipse) ? 6377397.155 : 6378137; // 장반경
    var f = ("bassel" === inEllipse) ? 1 / 299.1528128 : 1 / 298.257222101; // 편평률
    var b = a * (1 - f);
    var k0 = 1;
    var delta_x = ("after_200912" === inOriginAdd) ? 600000 : (("jeju" === inOrigin) ? 550000 : 500000);
    var delta_y = 200000;
    var pi0 = 38;
    var pi0_rad = pi0 / 180 * Math.PI;
    var lambda0 = 0;
    if ("west" === inOrigin) {
        lambda0 = 125;
    }
    else if ("east" === inOrigin) {
        lambda0 = 129;
    }
    else if ("east_sea" === inOrigin) {
        lambda0 = 131;
    }
    else {
        lambda0 = 127;
    }
    var lambda0_rad = lambda0 / 180 * Math.PI;
    var e_sq = ((a * a) - (b * b)) / (a * a);
    var ep_sq = ((a * a) - (b * b)) / (b * b);
    var m0 = a * ((1 - e_sq / 4 - 3 * e_sq * e_sq / 64 - 5 * e_sq * e_sq * e_sq / 256) * pi0_rad - (3 * e_sq / 8 + 3 * e_sq * e_sq / 32 + 45 * e_sq * e_sq * e_sq / 1024) * Math.sin(2 * pi0_rad) + (15 * e_sq * e_sq / 256 + 45 * e_sq * e_sq * e_sq / 1024) * Math.sin(4 * pi0_rad) - (35 * e_sq * e_sq * e_sq / 3072) * Math.sin(6 * pi0_rad));
    var e1 = (1 - Math.sqrt(1 - e_sq)) / (1 + Math.sqrt(1 - e_sq));
    var time_fix = inFixTime ? 10.405 / 3600 : 0;
    var m = m0 + ((inX - delta_x) / k0);
    var mu1 = m / (a * (1 - e_sq / 4 - 3 * e_sq * e_sq / 64 - 5 * e_sq * e_sq * e_sq / 256));
    var pi1 = mu1 + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu1) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu1) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu1) + (1097 * e1 * e1 * e1 * e1 / 512) * Math.sin(8 * mu1);
    var r1 = (a * (1 - e_sq)) / Math.pow(1 - e_sq * Math.sin(pi1) * Math.sin(pi1), 3 / 2);
    var c1 = ep_sq * Math.cos(pi1) * Math.cos(pi1);
    var t1 = Math.tan(pi1) * Math.tan(pi1);
    var n1 = a / Math.sqrt(1 - e_sq * Math.sin(pi1) * Math.sin(pi1));
    var d = (inY - delta_y) / (n1 * k0);
    var pi = (pi1 - (n1 * Math.tan(pi1) / r1) * (d * d / 2 - d * d * d * d / 24 * (5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * ep_sq) + d * d * d * d * d * d / 720 * (61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * ep_sq - 3 * c1 * c1))) * 180 / Math.PI;
    var lambda = lambda0 + ((1 / Math.cos(pi1)) * (d - (d * d * d / 6) * (1 + 2 * t1 + c1) + (d * d * d * d * d / 120) * (5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * ep_sq + 24 * t1 * t1))) * 180 / Math.PI + time_fix;
    var longitude1 = document.getElementById("tm_to_ll_longitude_1");
    var longitude2 = document.getElementById("tm_to_ll_longitude_2");
    var latitude1 = document.getElementById("tm_to_ll_latitude_1");
    var latitude2 = document.getElementById("tm_to_ll_latitude_2");
    longitude1.textContent = lambda.toFixed(inDecimal).toString();
    longitude2.textContent = atlong(lambda);
    latitude1.textContent = pi.toFixed(inDecimal).toString();
    latitude2.textContent = atlong(pi);
}
function calcLlToTm() {
    var inEllipse = document.getElementById("ll_to_tm_ellipse").value;
    var inFixTime = document.getElementById("ll_to_tm_fix_sec").checked;
    var inOrigin = document.getElementById("ll_to_tm_origin").value;
    var inOriginAdd = document.getElementById("ll_to_tm_origin_add").value;
    var inDecimalStr = document.getElementById("ll_to_tm_decimal").value;
    var inStrLambda = document.getElementById("ll_to_tm_longitude").value;
    var inStrPi = document.getElementById("ll_to_tm_latitude").value;
    if (0 === inStrLambda.length || 0 === inStrPi.length) {
        return;
    }
    var inLambda = Number(inStrLambda);
    var inPi = Number(inStrPi);
    var inDecimal = Number(inDecimalStr);
    var a = ("bassel" === inEllipse) ? 6377397.155 : 6378137; // 장반경
    var f = ("bassel" === inEllipse) ? 1 / 299.1528128 : 1 / 298.257222101; // 편평률
    var b = a * (1 - f);
    var k0 = 1;
    var delta_x = ("after_200912" === inOriginAdd) ? 600000 : (("jeju" === inOrigin) ? 550000 : 500000);
    var delta_y = 200000;
    var pi0 = 38;
    var pi0_rad = pi0 / 180 * Math.PI;
    var lambda0 = 0;
    if ("west" === inOrigin) {
        lambda0 = 125;
    }
    else if ("east" === inOrigin) {
        lambda0 = 129;
    }
    else if ("east_sea" === inOrigin) {
        lambda0 = 131;
    }
    else {
        lambda0 = 127;
    }
    var lambda0_rad = lambda0 / 180 * Math.PI;
    var e_sq = ((a * a) - (b * b)) / (a * a);
    var ep_sq = ((a * a) - (b * b)) / (b * b);
    var m0 = a * ((1 - e_sq / 4 - 3 * e_sq * e_sq / 64 - 5 * e_sq * e_sq * e_sq / 256) * pi0_rad - (3 * e_sq / 8 + 3 * e_sq * e_sq / 32 + 45 * e_sq * e_sq * e_sq / 1024) * Math.sin(2 * pi0_rad) + (15 * e_sq * e_sq / 256 + 45 * e_sq * e_sq * e_sq / 1024) * Math.sin(4 * pi0_rad) - (35 * e_sq * e_sq * e_sq / 3072) * Math.sin(6 * pi0_rad));
    var e1 = (1 - Math.sqrt(1 - e_sq)) / (1 + Math.sqrt(1 - e_sq));
    var time_fix = inFixTime ? 10.405 / 3600 : 0;
    var pi = inPi / 180 * Math.PI;
    var lambda = (inLambda - time_fix) / 180 * Math.PI;
    var t = Math.tan(pi) * Math.tan(pi);
    var c = (e_sq / (1 - e_sq)) * Math.cos(pi) * Math.cos(pi);
    var l_a = (lambda - lambda0_rad) * Math.cos(pi);
    var n = a / Math.sqrt(1 - e_sq * Math.sin(pi) * Math.sin(pi));
    var m = a * ((1 - e_sq / 4 - 3 * e_sq * e_sq / 64 - 5 * e_sq * e_sq * e_sq / 256) * pi - (3 * e_sq / 8 + 3 * e_sq * e_sq / 32 + 45 * e_sq * e_sq * e_sq / 1024) * Math.sin(2 * pi) + (15 * e_sq * e_sq / 256 + 45 * e_sq * e_sq * e_sq / 1024) * Math.sin(4 * pi) - 35 * e_sq * e_sq * e_sq / 3072 * Math.sin(6 * pi));
    var x = delta_x + k0 * (m - m0 + n * Math.tan(pi) * (l_a * l_a / 2 + l_a * l_a * l_a * l_a / 24 * (5 - t + 9 * c + 4 * c * c) + l_a * l_a * l_a * l_a * l_a * l_a / 720 * (61 - 58 * t + t * t + 600 * c - 330 * e_sq)));
    var y = delta_y + k0 * n * (l_a + l_a * l_a * l_a / 6 * (1 - t + c) + l_a * l_a * l_a * l_a * l_a / 120 * (5 - 18 * t + t * t + 72 * c - 58 * ep_sq));
    var outX = document.getElementById("ll_to_tm_x");
    var outY = document.getElementById("ll_to_tm_y");
    outX.textContent = x.toFixed(inDecimal).toString();
    outY.textContent = y.toFixed(inDecimal).toString();
}
