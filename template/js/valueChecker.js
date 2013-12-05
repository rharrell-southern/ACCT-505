/*
 * Simple class to handle checking input values against stored values
 * 
 * Accepts an object describing what to check and the answers.
 * Format:
 * {'selector': answer}
 * Example:
 * {'#currentCash': 23500}
 */
var ValueChecker = function(answers) {
	$.each(answers, function(key, value) {
		var $key = $(key);
		$key.on("change focusout", function() {
			var $this = $(this);
			var val = parseInt($this.val());
			if(isNaN(val)) {
				$this.removeClass("bad good");
			} else if(val === value) {
				$this.removeClass('bad').addClass('good');
			} else {
				$this.removeClass('good').addClass('bad');
			}
		});
	});
};
