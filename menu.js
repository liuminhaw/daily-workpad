function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('workpad')
        .addItem('Update', 'update')
        .addItem('Test Style', 'test_style')
        .addToUi();
}