/* Journal Controller
 * 
 * The journal controller is used to setup and handle Journals
 * For an example of a Journal Assignment see SE 3.1.1
 * 
 * NOTE: This *MUST* be called before any changes are made to the first row!
 */
var Journal = function(elem, options, solutions) {
	var $table = $(elem);
	var options = options,
	    solutions = solutions;
	
	var $tRow = $table.find('tr.journalRow:first');
	// Generate the options for the dropdowns
	var toInsert = '';
	for(var i = 0; i < options.length; i++) {
		toInsert += '<option>'+options[i]+'</option>';
	}
	$tRow.find('select').append(toInsert);
	// Add event listeners to check for changes
	$tRow.find('input,select').on('change focusout', function() {
		checkAnswers();
	});

	// Clone the first row and save it for later appending
	var $prototypeRow = $tRow.clone(false);
	// Add event listeners to check for changes (do it again, because it was told to ignore previous bindings)
	$prototypeRow.find('input,select').on('change', function() {
		checkAnswers();
	});
	// TODO: Find a better way to point to this one
	var $date = $prototypeRow.find('input.date');
	if($date.length > 0) {
		//$date.datepicker({format: 'mm/dd'});
	}


	function compareValues($elem, type, toCompare) {
		var value = $elem.val();
		switch(type) {
			case 'option':
				value = $elem.find('option:selected').val();
				toCompare = options[toCompare];
				break;
			case 'int':
				value = parseInt(value, 10);
				break;
			default:
		}
		console.debug("Comparing "+value+" to "+toCompare);
		if(value === toCompare) {
			$elem.removeClass('bad').addClass('good');
		} else {
			$elem.removeClass('good').addClass('bad');
		}
	}

	function checkAnswers() {
		$table.find('tr.journalRow').each(function(index) {
			var $row = $(this);
			
			// Iterate over each of the values in the solution and check them against the existing values
			$.each(solutions[index], function(key, val) {
				var selector = (val.type === 'option') ? 'select' : 'input';
				var $key = $row.find(selector+'.'+key);
				compareValues($key, val.type, val.value);
			});
		});
	}

	function addRow() {
		if($table.find('tr.journalRow').length >= solutions.length) {
			return;
		}

		// NOTE: We *do* want to take all the bound events with this one
		$table.append($prototypeRow.clone(true));
	}


	return {
		'addRow': function() {
			addRow();
		},
		'check': function() {
			checkAnswers();
		}
	};
};

/**
var exampleSolutions = [
	{
		'date': {type: 'string', value: '04/30'},
		'dropdownOne': {type: 'option', value: 4},
		'dropdownTwo': {type: 'option', value: 18},
		'description': {type: 'string', value: 'Supplies'},
		'credit': {type: 'int', value: 1450},
		'debit': {type: 'int', value: 1450}
	}
];
*/
