let activeTabBtn = 0;
let tabBtns: any = [];

window.onload = function() {
	const tabBtnsWrapper: HTMLDivElement = <HTMLDivElement>this.document.getElementById("top_btn_wrapper");
	tabBtns = tabBtnsWrapper.getElementsByTagName("input");
	activeTabBtn = tabBtns[0];

	const contentsWrappers: any = this.document.getElementsByClassName("contents_wrapper");

	for ( let i=0 ; i<tabBtns.length ; i++ ) {
		tabBtns[i].addEventListener("click", function () {
			activeTabBtn = tabBtns[i];

			for ( let j=0 ; j<contentsWrappers.length ; j++ ) {
				if ( i === j ) {
					contentsWrappers[j].style.display = "block";
				}
				else {
					contentsWrappers[j].style.display = "none";
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

	for ( let intp_in of xInputs ) {
		if ( 0 !== intp_in.value.length ) {
			xVals.push(Number(intp_in.value));
		}
		else {
			xVals.push(null);
			emptyCntX++;
		}

		inputs.push(intp_in);
	}

	for ( let intp_in of yInputs ) {
		if ( 0 !== intp_in.value.length ) {
			yVals.push(Number(intp_in.value));
		}
		else {
			yVals.push(null);
			emptyCntY++;
		}

		inputs.push(intp_in);
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

		for ( let intp_in of inputs ) {
			if ( 0 === intp_in.value.length ) {
				intp_in.value = ret.toString();
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

	for ( let intp_in of xInputs ) {
		if ( 0 !== intp_in.value.length ) {
			xVals.push(Number(intp_in.value));
		}
		else {
			xVals.push(null);
			emptyCntX++;
		}

		inputs.push(intp_in);
	}

	for ( let intp_in of yInputs ) {
		if ( 0 !== intp_in.value.length ) {
			yVals.push(Number(intp_in.value));
		}
		else {
			yVals.push(null);
			emptyCntY++;
		}

		inputs.push(intp_in);
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

		for ( let intp_in of inputs ) {
			if ( 0 === intp_in.value.length ) {
				intp_in.value = ret.toString();
				break;
			}
		}
	}
}
