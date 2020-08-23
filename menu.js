function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('workpad')
        .addItem('Update', 'update')
        .addItem('New Update', 'newUpdate')
        .addToUi();
}