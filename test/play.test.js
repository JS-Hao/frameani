const FrameAni = require("../src/index").default;

test("one value play", done => {
	let finalValue = 0;
	const frameAni = new FrameAni({
		value: [0, 100],
		duration: 1000,
		render: function(value) {
			finalValue = value;
		},
		onEnd: function() {
			expect(finalValue).toEqual(100);
			done();
		}
	});
	frameAni.play();
});

test("more value play", done => {
	let finalValue = [0, 0];
	const frameAni = new FrameAni({
		value: [[0, 100], [0, -100]],
		duration: 1000,
		render: function(value1, value2) {
			finalValue[0] = value1;
			finalValue[1] = value2;
		},
		onEnd: function() {
			done();
			expect(finalValue[0]).toEqual(100);
			expect(finalValue[1]).toEqual(-100);
		}
	});

	frameAni.play();
});
