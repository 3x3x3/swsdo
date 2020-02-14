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

	const openManualDlgBtns = this.document.getElementsByClassName("open_manual_dlg_btn");

	for ( let i=0 ; i<openManualDlgBtns.length ; i++ ) {
		openManualDlgBtns[i].addEventListener("click", function () {
			const manualDlgWrapper: HTMLInputElement = <HTMLInputElement>document.getElementById("manual_dlg_wrapper");
			manualDlgWrapper.style.display = "block";
		});
	}

	const closeManualDlgBtn: HTMLInputElement = <HTMLInputElement>this.document.getElementById("close_manual_dlg_btn");
	
	closeManualDlgBtn.addEventListener("click", function () {
		const manualDlgWrapper: HTMLInputElement = <HTMLInputElement>document.getElementById("manual_dlg_wrapper");
		manualDlgWrapper.style.display = "none";
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
	const dosu = Math.floor(x);
	const min = Math.floor((x - Math.floor(x)) * 60);
	const sec = (((x - Math.floor(x)) * 60 - Math.floor((x-Math.floor(x)) * 60)) * 60).toFixed(2);

	return dosu + "도 " + min + "분 " + sec + "초";
}

function calcTmToLl() {
	const inEllipse: string = (<HTMLInputElement>document.getElementById("tm_to_ll_ellipse")).value;
	const inFixTime: boolean = (<HTMLInputElement>document.getElementById("tm_to_ll_fix_sec")).checked;
	const inOrigin: string = (<HTMLInputElement>document.getElementById("tm_to_ll_origin")).value;
	const inOriginAdd: string = (<HTMLInputElement>document.getElementById("tm_to_ll_origin_add")).value;
	const inDecimalStr: string = (<HTMLInputElement>document.getElementById("tm_to_ll_decimal")).value;

	const inStrX: string = (<HTMLInputElement>document.getElementById("tm_to_ll_x")).value;
	const inStrY: string = (<HTMLInputElement>document.getElementById("tm_to_ll_y")).value;

	if ( 0 === inStrX.length || 0 === inStrY.length ) {
		return;
	}

	const inX: number = Number(inStrX);
	const inY: number = Number(inStrY);
	const inDecimal: number = Number(inDecimalStr);

	const a: number = ("bassel" === inEllipse) ? 6377397.155 : 6378137;	// 장반경
	const f: number = ("bassel" === inEllipse) ? 1 / 299.1528128 : 1 / 298.257222101;	// 편평률
	const b: number = a * (1-f);
	const k0: number = 1;
	const delta_x: number = ("after_200912" === inOriginAdd) ? 600000 : ( ("jeju" === inOrigin) ? 550000 : 500000);
	const delta_y: number = 200000;
	const pi0: number = 38;
	const pi0_rad: number = pi0 / 180 * Math.PI;
	let lambda0: number = 0;

	if ( "west" === inOrigin ) {
		lambda0 = 125;
	}
	else if ( "east" === inOrigin ) {
		lambda0 = 129;
	}
	else if ( "east_sea" === inOrigin ) {
		lambda0 = 131;
	}
	else {
		lambda0 = 127;
	}

	const lambda0_rad = lambda0 / 180 * Math.PI;

	const e_sq: number = ((a * a) - (b * b)) / (a * a);
	const ep_sq: number = ((a * a) - (b * b)) / (b * b);
	const m0: number = a * ((1-e_sq/4-3*e_sq*e_sq/64-5*e_sq*e_sq*e_sq/256)*pi0_rad-(3*e_sq/8+3*e_sq*e_sq/32+45*e_sq*e_sq*e_sq/1024)*Math.sin(2*pi0_rad)+(15*e_sq*e_sq/256+45*e_sq*e_sq*e_sq/1024)*Math.sin(4*pi0_rad)-(35*e_sq*e_sq*e_sq/3072)*Math.sin(6*pi0_rad));
	const e1: number = (1 - Math.sqrt(1-e_sq)) / (1 + Math.sqrt(1-e_sq));
	const time_fix: number = inFixTime ? 10.405/3600 : 0;

	const m: number = m0 + ((inX-delta_x)/k0);
	const mu1: number = m / (a*(1-e_sq/4-3*e_sq*e_sq/64-5*e_sq*e_sq*e_sq/256));
	const pi1: number = mu1 + (3*e1/2-27*e1*e1*e1/32) * Math.sin(2*mu1) + (21*e1*e1/16-55*e1*e1*e1*e1/32) * Math.sin(4*mu1) + (151*e1*e1*e1/96) * Math.sin(6*mu1) + (1097*e1*e1*e1*e1/512) * Math.sin(8*mu1);
	const r1: number = (a*(1-e_sq)) / Math.pow(1-e_sq*Math.sin(pi1)*Math.sin(pi1), 3/2);
	const c1: number = ep_sq * Math.cos(pi1) * Math.cos(pi1);
	const t1: number = Math.tan(pi1) * Math.tan(pi1);
	const n1: number = a / Math.sqrt(1-e_sq*Math.sin(pi1)*Math.sin(pi1));
	const d: number = (inY-delta_y) / (n1*k0);

	const pi = (pi1-(n1*Math.tan(pi1)/r1)*(d*d/2-d*d*d*d/24*(5+3*t1+10*c1-4*c1*c1-9*ep_sq)+d*d*d*d*d*d/720*(61+90*t1+298*c1+45*t1*t1-252*ep_sq-3*c1*c1))) * 180/Math.PI;
	const lambda = lambda0 + ((1/Math.cos(pi1))*(d-(d*d*d/6)*(1+2*t1+c1)+(d*d*d*d*d/120)*(5-2*c1+28*t1-3*c1*c1+8*ep_sq+24*t1*t1))) * 180/Math.PI + time_fix;

	const longitude1: HTMLElement = <HTMLElement>document.getElementById("tm_to_ll_longitude_1");
	const longitude2: HTMLElement = <HTMLElement>document.getElementById("tm_to_ll_longitude_2");
	const latitude1: HTMLElement = <HTMLElement>document.getElementById("tm_to_ll_latitude_1");
	const latitude2: HTMLElement = <HTMLElement>document.getElementById("tm_to_ll_latitude_2");
	
	longitude1.textContent = lambda.toFixed(inDecimal).toString();
	longitude2.textContent = atlong(lambda);
	latitude1.textContent = pi.toFixed(inDecimal).toString();
	latitude2.textContent = atlong(pi);
}

function calcLlToTm() {
	const inEllipse: string = (<HTMLInputElement>document.getElementById("ll_to_tm_ellipse")).value;
	const inFixTime: boolean = (<HTMLInputElement>document.getElementById("ll_to_tm_fix_sec")).checked;
	const inOrigin: string = (<HTMLInputElement>document.getElementById("ll_to_tm_origin")).value;
	const inOriginAdd: string = (<HTMLInputElement>document.getElementById("ll_to_tm_origin_add")).value;
	const inDecimalStr: string = (<HTMLInputElement>document.getElementById("ll_to_tm_decimal")).value;
	
	const inStrLambda: string = (<HTMLInputElement>document.getElementById("ll_to_tm_longitude")).value;
	const inStrPi: string = (<HTMLInputElement>document.getElementById("ll_to_tm_latitude")).value;
	
	if ( 0 === inStrLambda.length || 0 === inStrPi.length ) {
		return;
	}
	
	const inLambda: number = Number(inStrLambda);
	const inPi: number = Number(inStrPi);
	const inDecimal: number = Number(inDecimalStr);
	
	const a: number = ("bassel" === inEllipse) ? 6377397.155 : 6378137;	// 장반경
	const f: number = ("bassel" === inEllipse) ? 1 / 299.1528128 : 1 / 298.257222101;	// 편평률
	const b: number = a * (1-f);
	const k0: number = 1;
	const delta_x: number = ("after_200912" === inOriginAdd) ? 600000 : ( ("jeju" === inOrigin) ? 550000 : 500000);
	const delta_y: number = 200000;
	const pi0: number = 38;
	const pi0_rad: number = pi0 / 180 * Math.PI;
	let lambda0: number = 0;
	
	if ( "west" === inOrigin ) {
		lambda0 = 125;
	}
	else if ( "east" === inOrigin ) {
		lambda0 = 129;
	}
	else if ( "east_sea" === inOrigin ) {
		lambda0 = 131;
	}
	else {
		lambda0 = 127;
	}
	
	const lambda0_rad = lambda0 / 180 * Math.PI;
	
	const e_sq: number = ((a * a) - (b * b)) / (a * a);
	const ep_sq: number = ((a * a) - (b * b)) / (b * b);
	const m0: number = a * ((1-e_sq/4-3*e_sq*e_sq/64-5*e_sq*e_sq*e_sq/256)*pi0_rad-(3*e_sq/8+3*e_sq*e_sq/32+45*e_sq*e_sq*e_sq/1024)*Math.sin(2*pi0_rad)+(15*e_sq*e_sq/256+45*e_sq*e_sq*e_sq/1024)*Math.sin(4*pi0_rad)-(35*e_sq*e_sq*e_sq/3072)*Math.sin(6*pi0_rad));
	const e1: number = (1 - Math.sqrt(1-e_sq)) / (1 + Math.sqrt(1-e_sq));
	const time_fix: number = inFixTime ? 10.405/3600 : 0;

	const pi: number = inPi / 180 * Math.PI;
	const lambda: number = (inLambda-time_fix) / 180 * Math.PI;
	const t: number = Math.tan(pi) * Math.tan(pi);
	const c: number = (e_sq / (1-e_sq)) * Math.cos(pi) * Math.cos(pi);
	const l_a: number = (lambda-lambda0_rad) * Math.cos(pi);
	const n: number = a / Math.sqrt(1-e_sq*Math.sin(pi)*Math.sin(pi));
	const m: number = a * ((1-e_sq/4-3*e_sq*e_sq/64-5*e_sq*e_sq*e_sq/256)*pi-(3*e_sq/8+3*e_sq*e_sq/32+45*e_sq*e_sq*e_sq/1024)*Math.sin(2*pi)+(15*e_sq*e_sq/256+45*e_sq*e_sq*e_sq/1024)*Math.sin(4*pi)-35*e_sq*e_sq*e_sq/3072*Math.sin(6*pi));

	const x: number = delta_x + k0 * (m-m0+n*Math.tan(pi)*(l_a*l_a/2 + l_a*l_a*l_a*l_a/24 * (5-t+9*c+4*c*c) + l_a*l_a*l_a*l_a*l_a*l_a/720 * (61-58*t+t*t+600*c-330*e_sq)));
	const y: number = delta_y + k0 * n * (l_a + l_a*l_a*l_a/6 * (1-t+c) + l_a*l_a*l_a*l_a*l_a/120 * (5-18*t+t*t+72*c-58 * ep_sq));

	const outX: HTMLElement = <HTMLElement>document.getElementById("ll_to_tm_x");
	const outY: HTMLElement = <HTMLElement>document.getElementById("ll_to_tm_y");

	outX.textContent = x.toFixed(inDecimal).toString();
	outY.textContent = y.toFixed(inDecimal).toString();
}
