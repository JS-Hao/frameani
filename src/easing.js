/* The following timing function is basing on the Cubic Bezier  */

const easing = {
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},

	easeOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},

	easeInOut: function(t, b, c, d) {
		return ((t /= d / 2) < 1) ? (c / 2 * t * t * t + b) : (c / 2 * ((t -= 2) * t * t + 2) + b);
	},

	linear: function(t, b, c, d) {
		return c * t / d + b;
	}
}

export default easing;