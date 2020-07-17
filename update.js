// Function reference to test content strikethrough
function tester() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    Logger.log(sheet.getName());
    var cell = sheet.getRange("C9");
    //Logger.log(cell.getValue());
    var richText = cell.getRichTextValue();
    var runs = richText.getRuns()
    Logger.log("length: " + runs.length);
    
    for (var i = 0; i < runs.length; i++) {
        Logger.log("index: " + i);
        Logger.log(runs[i].getText());
        Logger.log(richText.getRuns()[i].getTextStyle().isStrikethrough());
    }

    Logger.log("Test clasp");

}


function update() {
    try {
        var workpad = new Pad();
    }
    catch (e) {
        Logger.log(e.message);
        return 1;
    }

    workpad.showName();

    todayRow = workpad.getDateRow()
    // Logger.log("Today row: " + todayRow);
    if (todayRow == -1) {
        Logger.log("Failed to find date");
        return 1;
    }

    Logger.log("Last column: " + workpad.lastCol);
    // Read through undone tasks
    for (var i = 2; i <= workpad.lastCol; i++) {
        Logger.log("Column: " + i);

        tasks = workpad.getUndone(todayRow, i);
        for (var j = 0; j < tasks.length; j++) {
            Logger.log(tasks[j].getText());
        }
    }

}