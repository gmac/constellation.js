/**
* Keyboard controls.
* Configures keyboard shortcuts for calling controller methods.
*/
define([
	'lib/jquery',
	'./grid-c'
],
function( $, gridController ) {
	
	var _enabled = true;
	
	function stop(evt) {
		evt.preventDefault();
	}
	
	$(window)
		.on('keydown', function(evt) {
			if (_enabled) {
				switch ( evt.which ) {
					case 8: stop(evt); gridController.deleteGeometry(); return false; // "delete"
					case 66: stop(evt); gridController.splitNodes(); return false; // "b"
					case 74: stop(evt); gridController.joinNodes(); return false; // "j"
					case 80: stop(evt); gridController.makePolygon(); return false; // "p"
					case 70: stop(evt); gridController.findPath(); return false; // "f"
					case 83: stop(evt); gridController.snapNodeToGrid(); return false; // "s"
					case 78: stop(evt); evt.ctrlKey ? gridController.newGrid() : gridController.selectNearestGridNode(); return false; // "n"
					case 72: stop(evt); gridController.hitTestNodeInPolygons(); return false; // "h"
				}
			}
		})
		.on('focus', function(evt) {
			if (evt.target.tagName) {
				_enabled = !(evt.target.tagName.toLowerCase() === 'input');
			}
		})
		.on('blur', function(evt) {
			_enabled = true;
		});
});