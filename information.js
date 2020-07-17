function Pad() {
    currentDate = new Date();

    this.year = currentDate.getFullYear();
    this.month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    this.date = ("0" + currentDate.getDate()).slice(-2);
    this.sheetName = this.year + "/" + this.month;

    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.sheetName);
    if (this.sheet == null) {
        // TODOs: Create new sheet if sheet not exist
        throw "NoPadFound"
    }

    this.lastCol = this.sheet.getRange("1:1").getLastColumn();

    this.showName = function() {
        Logger.log("Name: " + this.sheetName);
    }

    // Get current date row number
    this.getDateRow = function() {
        var now = new Date();
        var values = this.sheet.getRange("A:A").getValues();
        Logger.log("Length of values: " + values.length);
        // Logger.log(values);

        for (var i = 1; i < values.length; i++ ) {
            if (_sameDate(now, values[i][0])) {
                return i + 1;
            }
        }
        return -1;
    }

    // Get current date pad content
    this.getUndone = function(row, col) {
        var runs = this.sheet.getRange(row, col).getRichTextValue().getRuns();
        var undone = [];

        for (var i = 0; i < runs.length; i++) {
            if (! runs[i].getTextStyle().isStrikethrough()) {
                undone.push(runs[i]);
            }
        }

        return undone;
    }


    function _sameDate(d1, d2) {
        return (d1.getDate() === d2.getDate() 
                && d1.getMonth() === d2.getMonth()
                && d1.getFullYear() === d2.getFullYear())
    }

    
    // TODOs: updatePad method
}

function getSheet() {
    try {
        var workpad = new Pad();
    }
    catch (e) {
        Logger.log(e.message);
        Logger.log("Sheet not found");
        return 1;
    }

    workpad.showName();
    Logger.log("Current date row " + workpad.currentDateRow);
    Logger.log("Check row value " + workpad.sheet.getRange(workpad.currentDateRow, 1).getValue());
    Logger.log("Today's Pad: " + workpad.contents);

}

