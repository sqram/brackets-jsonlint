/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/**
 * author: katsh  http://kat.sh
<<<<<<< HEAD
 * Basic JSON validator. And i mean, -basic-.
 * Checks if file opened is a .json file, if so, parse the whole file.
 * If file is not a .json file, try to parse selected text (an assumption
 * that the user select a whole json object.
 * This plugin only tells you if the json is valid or not. (error free)
 */
=======
 * displays parent directory next to file name in Working Files panel
*/

>>>>>>> 2024d6fd5503ecd420a60f0b4ef73efe4adba19e

define(function (require, exports, module) {
    "use strict";

<<<<<<< HEAD
    var CommandManager      = brackets.getModule("command/CommandManager"),
        Menus               = brackets.getModule("command/Menus"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        Document            = brackets.getModule("document/DocumentManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager");
        
        jQuery.getScript( require.toUrl("./") + "jsl.format.js");
        jQuery.getScript( require.toUrl("./") + "jsl.parser.js");
    
     /*
     * Returns the text that has been selected in the editor window in focus .
     * Thanks @pedelman on github for this fn
     */
    function _getSelectedText() {
        return EditorManager.getActiveEditor().getSelectedText();
    }
    
    
    /*
     * Get extension of focused file/tab
     */
    function getExtension() {
        var ext;
        var currentDocument = Document.getCurrentDocument();
       
        if (typeof currentDocument.extension !== 'undefined') {
            ext = currentDocument.extension;
        } else {
            var tmp = currentDocument.file.name;
            var tmpArray = tmp.split('.');
            ext = tmpArray[tmpArray.length - 1];
        }
        // FIXME if file has no '.', this may break;
        return ext;
    }

    
    
   
    // Parse the json for syntax errors
    function parseJSON(text) {
        try {
           var result = jsl.parser.parse(text);

            if (result) {
                alert('success')   
            } else {
                
             alert('error')   
            }
            
        } catch (err) {
            alert(err);
           
        }
    }
    
    
    /*
     * Function to run when the menu item is clicked
     * Kind of our entry point. Script starts from here.
     * If file being edited is a json file, just get the
     * text of the whole file. If not (ie, a .js file),
     * assume the user has highlited a json string, and
     * so we validate the selection instead of whole file.
     */
    function init() {
       
        var ext = getExtension();
        var stringToParse = null;
        
        if (ext === 'json') {
            // parse entire doc 
            stringToParse = EditorManager.getActiveEditor().document.getText();
            
        } else {
            // parse selected text   
            stringToParse = _getSelectedText();
        }
        
        if ((stringToParse !== null) && (stringToParse !== '')) {
            parseJSON(stringToParse);
        }
    }
    
    
   
    

    var PARSE_CMD_ID = "katsh.parseJSON";   // package-style naming to avoid collisions
    CommandManager.register("Parse json", PARSE_CMD_ID, init);
    
    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuDivider(Menus.FIRST);
    menu.addMenuItem(PARSE_CMD_ID, {key: 'Ctrl-Shift-j', displayKey: 'Ctrl-Shift-j'}, Menus.FIRST);
=======
    var DocumentManager     = brackets.getModule("document/DocumentManager"),
        WorkingSet          = brackets.getModule("project/WorkingSetView");
    
    /*
     * Whenever a file or set of files is added to the workingset,
     * we update the workingset's DOM to show the dir. If we
     * are just updating a single file (ie, user double-clicked
     * a file in the project tree) then pass singleFile as true.
     * If we're adding a set of files (usually on start up)
     * pass singleFile as false. The 'data' parameter is either
     * a file object, or a set of file objects.
     */
    function updateWorkingSet(singleFile, data) {
        if ($('#open-files-container').length > 0) {
			var i = 0;
            DocumentManager.getWorkingSet().forEach(function(file) {
                var tmp = file.fullPath.split("/");
                var dir = tmp[ tmp.length - 2 ];
				
				var $element = $('#open-files-container ul li a').eq(i);			
				if ($element.find('.dir').length == 0) {					
					$element.append("<span class='dir' style='color: orange; font-size: 11px;float: right; display: inline-block'>" + dir + "</span>");
				} else {
					$element.find('.dir').text(dir);					
				}
				i++;				
			});
		}
		return false;
    }
    
    
    /* Register listeners for WorkingSet. */
    
    // A file is added to the working set
    $(DocumentManager).on("workingSetAdd", function (event, addedFile) {
      updateWorkingSet(true, addedFile);
    });

    // A list of files is added to the working set
    $(DocumentManager).on("workingSetAddList", function (event, addedFiles) {
        updateWorkingSet(false, addedFiles);
    });



   /* Not currently needed...but maybe one day if we want to enable/disable via menu
    var PARSE_CMD_ID = "katsh.parentfolder";   // package-style naming to avoid collisions
    CommandManager.register("Parse json", PARSE_CMD_ID, init);
     Then create a menu item bound to the command
     The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuDivider(Menus.FIRST);
    menu.addMenuItem(PARSE_CMD_ID, {key: 'Ctrl-Shift-j', displayKey: 'Ctrl-Shift-j'}, Menus.FIRST);
	*/
>>>>>>> 2024d6fd5503ecd420a60f0b4ef73efe4adba19e

});