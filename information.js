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


class WorkPad {
    constructor(sheetName) {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        if (this.sheet == null) {
            throw "NoPadFound";
        }

        this.sheetName = sheetName;
        this.lastCol = this.sheet.getRange("1:1").getLastColumn();
    }

    // Getter
    get todayRow() {
        return this.getDateRow();
    }

    get nextdayRow() {
        return this.todayRow + 1;
    }

    // Method
    getDateRow() {
        var now = new Date();
        var values = this.sheet.getRange("A:A").getValues();
        // Logger.log("Length of values: " + values.length);
        // Logger.log(values);

        for (var i = 1; i < values.length; i++ ) {
            if (this._sameDate(now, values[i][0])) {
                return i + 1;
            }
        }
        return -1;
    }

    getFinishTasks(col) {
        var runs = this.sheet.getRange(this.todayRow, col).getRichTextValue().getRuns();
        var done = [];

        for (var i = 0; i < runs.length; i++) {
            if (runs[i].getTextStyle().isStrikethrough()) {
                done.push(runs[i]);
            }
        }

        return done;
    }

    getRemainTasks(col) {
        var runs = this.sheet.getRange(this.todayRow, col).getRichTextValue().getRuns();
        var undone = [];

        for (var i = 0; i < runs.length; i++) {
            if (! runs[i].getTextStyle().isStrikethrough()) {
                undone.push(runs[i]);
            }
        }

        return undone;
    }

    updateTasks(col, text) {
        // Preserve exist text
        var existText = this.sheet.getRange(this.nextdayRow, col).getValue().replace(/\s+$/g, "");
        text = text.replace(/\s+$/g, "");

        if (existText.length != 0) {
            existText = existText.concat("\n");
            text = existText + text;
        }
        
        this.sheet.getRange(this.nextdayRow, col).setValue(text);
        this.sheet.getRange(this.nextdayRow, col).setVerticalAlignment("top");
    }

    cleanTasks(col, text) {
        text = text.replace(/\s+$/g, "");

        this.sheet.getRange(this.todayRow, col).setValue(text);
        this.sheet.getRange(this.todayRow, col).setVerticalAlignment("top");
        this.sheet.getRange(this.todayRow, col).setFontLine("line-through");
    }

    // Implicit method
    _sameDate(d1, d2) {
        return (d1.getDate() === d2.getDate() 
                && d1.getMonth() === d2.getMonth()
                && d1.getFullYear() === d2.getFullYear())
    }
}


function currentSheetName() {
    currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    return year + "/" + month;
}
