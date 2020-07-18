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
    // Read through today's tasks and update
    for (var i = 2; i <= workpad.lastCol; i++) {
        Logger.log("Column: " + i);
        var newPadTask = ""

        undoneTasks = workpad.getUndone(todayRow, i);
        for (var j = 0; j < undoneTasks.length; j++) {
            Logger.log(undoneTasks[j].getText());
            taskText = undoneTasks[j].getText().replace(/^\s+|\s+$/g, '');
            newPadTask += taskText + "\n";
        }
        // Set undone task for next day
        Logger.log("New Task: " + newPadTask);
        workpad.updateTasks(todayRow + 1, i, newPadTask);

        var padTask = "";
        doneTasks = workpad.getDone(todayRow, i);
        for (var j = 0; j < doneTasks.length; j++) {
            Logger.log(doneTasks[j].getText());
            taskText = doneTasks[j].getText().replace(/^\s+|\s+$/g, '');
            padTask += taskText + "\n";
        }
        // Update finished task for today
        Logger.log("Finished Task: " + padTask);
        workpad.cleanTasks(todayRow, i, padTask);
    }

}