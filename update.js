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



function main() {

}