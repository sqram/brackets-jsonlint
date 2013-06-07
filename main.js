/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/**
 * author: katsh  http://kat.sh
 * displays parent directory next to file name in Working Files panel
*/


define(function (require, exports, module) {
    "use strict";

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

});