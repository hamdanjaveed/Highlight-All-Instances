/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Hightlight All Instance Extension
    description
*/
define(function (require, exports, module) {
    'use strict';

    console.log("INITIALIZING Hightlight All Instance EXTENSION");

    var CommandManager = brackets.getModule("command/CommandManager");
    var Menus          = brackets.getModule("command/Menus");
    var EditorManager  = brackets.getModule("editor/EditorManager");
    var AppInit = brackets.getModule("utils/AppInit");
    var DocumentManager = brackets.getModule("document/DocumentManager");
//    var PreferencesManager = brackets.getModule("preferences/PreferencesManager");
//    console.log(PreferencesManager.setValueAndSave);

    AppInit.appReady(function () {
//        PreferencesManager.setValueAndSave("highlightMatches", "boolean", true);
        var doc = DocumentManager.getCurrentDocument();
        var editor = EditorManager.getFocusedEditor();
        var cm = editor._codeMirror;

        cm.on("cursorActivity", function(cm) {
            var selectedText = editor.getSelectedText();
            if (selectedText) {
                console.log("Got selection: " + selectedText);
                var text = DocumentManager.getCurrentDocument().getText().split("\n");
                var rgxp = new RegExp(selectedText, "g");
//                var matches = rgxp.exec(text);
                for (var i = 0; i < text.length; i++) {
                    var m;
                    while (m = rgxp.exec(text[i])) {
                        console.log("Found match on line: " + (i + 1) + ", and ch: " + m.index);
                    }
                }
            }
        });
    });
});
