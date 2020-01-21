let activeTabBtn: HTMLInputElement;
let tabBtns: any = [];

window.onload = function() {
	const tabBtnsWrapper: HTMLDivElement = <HTMLDivElement>this.document.getElementById("top_btn_wrapper");
	tabBtns = tabBtnsWrapper.getElementsByTagName("input");
	activeTabBtn = tabBtns[0];
	activeTabBtn.style.backgroundColor = "gray";

	const contentsWrappers: any = this.document.getElementsByClassName("contents_wrapper");

	for ( let i=0 ; i<tabBtns.length ; i++ ) {
		tabBtns[i].addEventListener("click", function () {
			activeTabBtn = tabBtns[i];

			for ( let j=0 ; j<contentsWrappers.length ; j++ ) {
				if ( i === j ) {
					contentsWrappers[j].style.display = "block";
					tabBtns[j].style.backgroundColor = "gray";
				}
				else {
					contentsWrappers[j].style.display = "none";
					tabBtns[j].style.backgroundColor = "silver";
				}
			}
		});
	}

	const calcBtn: HTMLInputElement = <HTMLInputElement>this.document.getElementById("calc_btn");

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
}

function calcInterpolation() {
	const xInputs: HTMLInputElement[] = [
		<HTMLInputElement>document.getElementById("interp_x1"),
		<HTMLInputElement>document.getElementById("interp_x2"),
		<HTMLInputElement>document.getElementById("interp_x3")
	]

	const yInputs: HTMLInputElement[] = [
		<HTMLInputElement>document.getElementById("interp_y1"),
		<HTMLInputElement>document.getElementById("interp_y2"),
		<HTMLInputElement>document.getElementById("interp_y3")
	]

	let inputs: HTMLInputElement[] = [];
	let emptyCntX: number = 0;
	let emptyCntY: number = 0;
	let xVals: any[] = [];
	let yVals: any[] = [];

	for ( let intpIn of xInputs ) {
		if ( 0 !== intpIn.value.length ) {
			xVals.push(Number(intpIn.value));
		}
		else {
			xVals.push(null);
			emptyCntX++;
		}

		inputs.push(intpIn);
	}

	for ( let intpIn of yInputs ) {
		if ( 0 !== intpIn.value.length ) {
			yVals.push(Number(intpIn.value));
		}
		else {
			yVals.push(null);
			emptyCntY++;
		}

		inputs.push(intpIn);
	}

	if ( 1 !== (emptyCntX + emptyCntY) ) {
		return;
	}
	
	for ( let i=0 ; i<2 ; i++ ) {
		if ( null === xVals[i] || null == yVals[i] ) {
			let bufferX: any = xVals[i];
			let bufferY: any = yVals[i];
			xVals[i] = xVals[i+1];
			yVals[i] = yVals[i+1];
			xVals[i+1] = bufferX;
			yVals[i+1] = bufferY;
		}
	}

	// 비어있는게 X라면 Y랑 바꿔서 계산하자
	if ( 1 === emptyCntX ) {
		let buffer = xVals;
		xVals = yVals;
		yVals = buffer;
	}

	if ( null === yVals[2] ) {
		const ret: number = yVals[0] + (yVals[1] - yVals[0]) * (xVals[2] - xVals[0]) / (xVals[1] - xVals[0]);

		for ( let intpIn of inputs ) {
			if ( 0 === intpIn.value.length ) {
				intpIn.value = ret.toString();
				break;
			}
		}
	}
}

function calcRatio() {
	const xInputs: HTMLInputElement[] = [
		<HTMLInputElement>document.getElementById("calc_ratio_x1"),
		<HTMLInputElement>document.getElementById("calc_ratio_x2")
	]

	const yInputs: HTMLInputElement[] = [
		<HTMLInputElement>document.getElementById("calc_ratio_y1"),
		<HTMLInputElement>document.getElementById("calc_ratio_y2")
	]

	let inputs: HTMLInputElement[] = [];
	let emptyCntX: number = 0;
	let emptyCntY: number = 0;
	let xVals: any[] = [];
	let yVals: any[] = [];

	for ( let intpIn of xInputs ) {
		if ( 0 !== intpIn.value.length ) {
			xVals.push(Number(intpIn.value));
		}
		else {
			xVals.push(null);
			emptyCntX++;
		}

		inputs.push(intpIn);
	}

	for ( let intpIn of yInputs ) {
		if ( 0 !== intpIn.value.length ) {
			yVals.push(Number(intpIn.value));
		}
		else {
			yVals.push(null);
			emptyCntY++;
		}

		inputs.push(intpIn);
	}

	if ( 1 !== (emptyCntX + emptyCntY) ) {
		return;
	}

	if ( null === xVals[0] || null == yVals[0] ) {
		let bufferX: any = xVals[0];
		let bufferY: any = yVals[0];
		xVals[0] = xVals[1];
		yVals[0] = yVals[1];
		xVals[1] = bufferX;
		yVals[1] = bufferY;
	}

	// 비어있는게 X라면 Y랑 바꿔서 계산하자
	if ( 1 === emptyCntX ) {
		let buffer = xVals;
		xVals = yVals;
		yVals = buffer;
	}

	if ( null === yVals[1] ) {
		const ret: number = xVals[1] * yVals[0] / xVals[0];

		for ( let intpIn of inputs ) {
			if ( 0 === intpIn.value.length ) {
				intpIn.value = ret.toString();
				break;
			}
		}
	}
}

function calcAngle() {
	const inStrX: string = (<HTMLInputElement>document.getElementById("calc_angle_x")).value;
	const inStrY: string = (<HTMLInputElement>document.getElementById("calc_angle_y")).value;

	if ( 0 === inStrX.length || 0 === inStrY.length ) {
		return;
	}

	const inX: number = Number(inStrX);
	const inY: number = Number(inStrY);
	const calcAngleRet1: HTMLElement = <HTMLElement>document.getElementById("calc_angle_ret1");
	const calcAngleRet2: HTMLElement = <HTMLElement>document.getElementById("calc_angle_ret2");

	const ret1 = inY / inX * 100;
	const ret2 = Math.atan(inY/inX) * 180 / Math.PI;

	calcAngleRet1.textContent = ret1.toString();
	calcAngleRet2.textContent = atlong(ret2);
}

function atlong(x: number) {
	const data = Math.round(x * 10000);
	const dosu = Math.floor(x);
	const min_decimal = data % 10000 * 60 / 10000;
	const min = Math.floor(min_decimal);
	const sec = Math.floor(min_decimal * 10000 % 10000 * 60 / 10000);

	return dosu + "도 " + min + "분 " + sec + "초";
}