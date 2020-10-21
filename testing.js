/**
 * Show runs in selected cell.
 * 
 * @param {string} cellA1 A1 notation string of selected cell.
 * @return text style information of selected cell.
 * @customfunction
 */
function test_style() {

    var a1Notation = a1_prompt();
    if (a1Notation == null) {
        Logger.log("No a1 notation returned");
        return 1
    }

    var readRange = SpreadsheetApp.getActiveSpreadsheet().getRange(a1Notation);

    var runs = readRange.getRichTextValue().getRuns();

    var logText = "";
    for (var i = 0; i < runs.length; i++) {
        logText += "Run " + i + "\n" + runs[i].getText() + "\n";
        logText += "Font family: " + runs[i].getTextStyle().getFontFamily() + "\n";
        logText += "Font size: " + runs[i].getTextStyle().getFontSize() + "\n";
        logText += "Color: " + runs[i].getTextStyle().getForegroundColor() + "\n";
        logText += "Is strike through: " + runs[i].getTextStyle().isStrikethrough() + "\n";
        logText += "Is bold: " + runs[i].getTextStyle().isBold() + "\n";
        logText += "Is italic: " + runs[i].getTextStyle().isItalic() + "\n";
        logText += "Is underline: " + runs[i].getTextStyle().isUnderline() + "\n\n";
    }

    Logger.log(logText);

    var writeRange = SpreadsheetApp.getActiveSpreadsheet().getRange("Logger!A2");
    writeRange.setValue(logText);
}

function a1_prompt() {
    var ui = SpreadsheetApp.getUi(); // Same variations.

    var result = ui.prompt(
        "Get cell's style properties",
        "Please enter cell A1 notation:",
        ui.ButtonSet.OK_CANCEL);

    // Process the user's response.
    var button = result.getSelectedButton();
    var text = result.getResponseText();
    if (button == ui.Button.OK) {
        // User clicked "OK".
        return text;
    } 
}