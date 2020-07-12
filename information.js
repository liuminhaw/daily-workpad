function Pad() {
    currentDate = new Date();

    this.year = currentDate.getFullYear();
    this.month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    this.sheetName = this.year + "/" + this.month;

    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.sheetName);
    if (this.sheet == null) {
        // TODOs: Create new sheet if sheet not exist
        throw "NoPadFound"
    }

    this.showName = function() {
        Logger.log("Name: " + this.sheetName);
    }

    // TODOs: getDateRow method

    // TODOs: updatePad method
}

function getSheet() {
    try {
        var workpad = new Pad();
    }
    catch (e) {
        Logger.log("Sheet not found");
        return 1;
    }

    workpad.showName();
}

