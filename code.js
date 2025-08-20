/**
 * Required function for Google Apps Script web applications
 * Called when user accesses the web app URL
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Spreadsheet Reader - Vue.js')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Function called by frontend to get spreadsheet data
 */
function getServerMessage() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const tab = sheet.getSheetByName('page1');
    
    if (!tab) {
      return { error: "Spreadsheet 'page1' not found" };
    }
    
    const range = tab.getRange('A2:B' + tab.getLastRow());
    const data = range.getValues();
    
    // Format data for display
    const formattedData = data.map((row, index) => ({
      id: row[0],
      country: row[1],
      rowIndex: index + 2 // +2 because we start from row 2 and index starts at 0
    }));
    
    return {
      success: true,
      data: formattedData,
      count: formattedData.length
    };
  } catch (error) {
    return { error: "Error reading data: " + error.toString() };
  }
}

/**
 * Function to update a record in the spreadsheet
 */
function updateRow(rowIndex, newId, newCountry) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const tab = sheet.getSheetByName('page1');
    
    if (!tab) {
      return { error: "Spreadsheet 'page1' not found" };
    }
    
    // Update cells A and B in the specified row
    tab.getRange(rowIndex, 1).setValue(newId);
    tab.getRange(rowIndex, 2).setValue(newCountry);
    
    return {
      success: true,
      message: "Record updated successfully in spreadsheet!"
    };
  } catch (error) {
    return { error: "Error updating record: " + error.toString() };
  }
}

/**
 * Function to delete a record from the spreadsheet
 */
function deleteRow(rowIndex) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const tab = sheet.getSheetByName('page1');
    
    if (!tab) {
      return { error: "Spreadsheet 'page1' not found" };
    }
    
    // Delete the specified row
    tab.deleteRow(rowIndex);
    
    return {
      success: true,
      message: "Record deleted successfully from spreadsheet!"
    };
  } catch (error) {
    return { error: "Error deleting record: " + error.toString() };
  }
}

/**
 * Function to add a new record to the spreadsheet
 */
function addRow(id, country) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const tab = sheet.getSheetByName('page1');
    
    if (!tab) {
      return { error: "Spreadsheet 'page1' not found" };
    }
    
    // Add a new row at the end
    const lastRow = tab.getLastRow();
    tab.getRange(lastRow + 1, 1).setValue(id);
    tab.getRange(lastRow + 1, 2).setValue(country);
    
    return {
      success: true,
      message: "New record added successfully to spreadsheet!",
      newRowIndex: lastRow + 1
    };
  } catch (error) {
    return { error: "Error adding record: " + error.toString() };
  }
}

/**
 * Legacy function for reading spreadsheet data (kept for compatibility)
 */
function readDataSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
  const tab = sheet.getSheetByName('page1')
  const range = tab.getRange('A2:B' + tab.getLastRow())
  const data = range.getValues()
  data.forEach(row => {
    const id = row[0]
    const country = row[1]
    Logger.log(`Id: ${id}, Country: ${country}`)
  })
}