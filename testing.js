/**
 * Show runs in selected cell.
 * 
 * @param {string} cellA1 A1 notation string of selected cell.
 * @return text style information of selected cell.
 * @customfunction
 */
function test_style(cellA1) {
    try {
        var workpad = new Pad();
    }
    catch (e) {
        Logger.log(e.message);
        return 1;
    }

    var runs = workpad.sheet.getRange(cellA1).getRichTextValue().getRuns();

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

    return logText;
}
