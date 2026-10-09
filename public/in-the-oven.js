// Plays the "In the oven" Lottie under the heading. The player is lottie-web
// 5.13.0's light build (lottie_light.min.js, MIT), served from this origin so
// the CSP needs no third-party script source; it has no expression support,
// so it never calls eval. Visitors who prefer reduced motion get a still frame.
(function () {
	var container = document.getElementById('in-the-oven');
	if (!container || !window.lottie) return;

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var animation = window.lottie.loadAnimation({
		container: container,
		renderer: 'svg',
		loop: !reduceMotion,
		autoplay: !reduceMotion,
		path: '/in-the-oven.json',
	});
	if (reduceMotion) {
		animation.addEventListener('DOMLoaded', function () {
			animation.goToAndStop(45, true);
		});
	}
})();
