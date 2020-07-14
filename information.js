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

    this.showName = function() {
        Logger.log("Name: " + this.sheetName);
    }

    // Get current date row number
    function getDateRow(sheet) {
        var now = new Date();
        var values = sheet.getRange("A:A").getValues();
        Logger.log("Length of values: " + values.length);
        // Logger.log(values);

        for (var i = 1; i < values.length; i++ ) {
            if (_sameDate(now, values[i][0])) {
                return i + 1;
            }
        }
        return -1;
    }
    this.currentDateRow = getDateRow(this.sheet);

    // Get current date pad content
    this.contents = this.sheet.getRange(this.currentDateRow, 2, 1, 5).getValues();

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

