// Adds a button to mark a cell as autorun to run automatically every
// time a notebook is loaded

// Prevent this script from cluttering the IPython namespace
(function (IPython) {
    "use strict";

    /**
     * Concatenate associative array objects
     *
     * Source: http://stackoverflow.com/questions/2454295/javascript-concatenate-properties-from-multiple-objects-associative-array
     */
    function collect() {
	var ret = {};
	var len = arguments.length;
	for (var i=0; i<len; i++) {
            for (var p in arguments[i]) {
		if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
		}
            }
	}
	return ret;
    }
    

    function setAutorun(cell, trueFalse){
	//set (and if necessary create) cell's metadata.is_autorun
	cell.metadata.is_autorun = trueFalse;

	//set cell's CSS properties accordingly using JQuery
	var cellJQ = cell.element.find('div.input_area');  
	if(trueFalse){
	    cellJQ.css("borderWidth", "5px");
	    cellJQ.css("borderColor", "yellow");
	} else {
	    cellJQ.css("borderWidth", "1px");
	    cellJQ.css("borderColor", "rgb(207,207,207)");
	}
    }

    function toggleAutorun() {
        var cell = IPython.notebook.get_selected_cell();
        if ( cell.metadata.is_autorun ) {
	    setAutorun(cell, false);
        } else {
	    setAutorun(cell, true);
        }
    }

    var autorunKey = { "Alt-X" : toggleAutorun };
    function assign_key(cell) {
        var keys = cell.code_mirror.getOption('extraKeys');
        cell.code_mirror.setOption('extraKeys', collect(keys, autorunKey ));  
    }


    /**
     * Register new extraKeys to codemirror for newly created cell
     *
     * @param {Object} event
     * @param {Object} nbcell notebook cell
     *
     */
    function create_cell(event, nbcell) {
        var cell = nbcell.cell;
        if ((cell instanceof IPython.CodeCell)) { assign_key(cell); }
    };

    function init_autorun(){
	/**
	 * Add autorun control button to toolbar and initialize codecells
	 */
	IPython.toolbar.add_buttons_group([
            {
		id: "autorun_codecell",
		label: 'Toggle make autorun cell',
		icon: 'fa-bolt',
		callback: toggleAutorun
            }
	]);
	
	// loop through notebook and set autorun cells 
	var cells = IPython.notebook.get_cells();
	cells.forEach( function(cell)
		       {
			   if (cell instanceof IPython.CodeCell) {
			       assign_key(cell);
			       var trueFalse = (cell.metadata.is_autorun === undefined ? false : cell.metadata.is_autorun);
			       setAutorun(cell, trueFalse);
			   }
		       });
	
    };

    function exec_autorun(){
	console.log("RUNNING autorun cells");
	// loop through cells and execute autorun cells
	var numExecs = 0;
	var cells = IPython.notebook.get_cells();
	cells.forEach( 
	    function(cell)
	    {
		if (cell instanceof IPython.CodeCell && cell.metadata.is_autorun) {
		    cell.execute();
		    numExecs++;
		};
	    });
	console.log("EXECUTED ", numExecs, " cells!!!");
    };

    // Initialize the extension 
    //   - should be triggereed on 'notebook_loaded.Notebook' event inside of config.js
    init_autorun();

    $([IPython.events]).on("user.EDLAB", exec_autorun);

    // Write a message to the console to confirm the extension loaded
    console.log("autorun cell extension loaded correctly");    
    return true;
}(IPython));
