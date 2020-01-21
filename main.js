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
                calcRatio();
                break;
            case tabBtns[2]:
                calcAngle();
                break;
            default:
                break;
        }
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
    var data = Math.round(x * 10000);
    var dosu = Math.floor(x);
    var min_decimal = data % 10000 * 60 / 10000;
    var min = Math.floor(min_decimal);
    var sec = Math.floor(min_decimal * 10000 % 10000 * 60 / 10000);
    return dosu + "도 " + min + "분 " + sec + "초";
}
