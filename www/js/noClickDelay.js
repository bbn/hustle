/*!
 * http://cubiq.org/remove-onclick-delay-on-webkit-for-iphone
 * Released under MIT license, http://cubiq.org/license
 */

function NoClickDelay(el) {
	this.element = typeof el == 'object' ? el : document.getElementById(el);
	var self = this;
	if( 'ontouchstart' in window )
		this.element.addEventListener('touchstart', self, true);
}


NoClickDelay.prototype = {
	handleEvent: function(e) {
		switch(e.type) {
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchend': this.onTouchEnd(e); break;
		}
	},

	onTouchStart: function(e) {
		e.preventDefault();
		this.moved = false;

		this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
		if(this.theTarget.nodeType == 3) this.theTarget = theTarget.parentNode;
		
		if (this.theTarget.getAttribute("href")) {
			this.theTarget.className+= ' pressed';
		}
		
		// alert( this.theTarget.className );

		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
	},

	onTouchMove: function(e) {
		this.moved = true;
		this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
	},

	onTouchEnd: function(e) {
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		if( !this.moved && this.theTarget ) {
			// this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
			var theEvent = document.createEvent('MouseEvents');
			theEvent.initEvent('click', true, true);
			this.theTarget.dispatchEvent(theEvent);
			this.pressedTarget = this.theTarget;
		}

		this.theTarget = undefined;
	}
};