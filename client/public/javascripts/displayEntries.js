// function to display entries in a table
// tableflag tells the function whether its on the table page or delete page
// based off the presence of the modify button
function displayAllEntries(){
  var tableDiv = document.getElementById("tofill");
  var entriesArray = JSON.parse(tableDiv.dataset.info);
  // Getting data from div attribute
  // Creating table elements
  var entriesTable = document.createElement('table');
  var entriesTableBody = document.createElement('tbody');
  entriesTableBody.id = "entriesBody";
  var entriesTableHead = document.createElement('thead');
  // Array of table column titles
  var titlesArray = ["FileID", "File Name"];
  // Creating, filling, and appending table header row
  var tr = document.createElement('tr');
  // only adds checkbox row if on table page
  // appends rest of rows
  titlesArray.forEach((item, i) => {
    var td = document.createElement('td');
    var text = document.createTextNode(item);
    td.appendChild(text);
    tr.appendChild(td);
  });
  entriesTableHead.appendChild(tr);
  entriesTable.appendChild(entriesTableHead);
  // Array of keys to JSON holding entries data
  var keysArray = ['FileID', 'filename'];
  // Looping through list of entries
  for (var i = 0; i < entriesArray.length; i++){
    var tr = document.createElement('tr');
    // Creating and appending cells for each value in the JSON object using keys list
    keysArray.forEach((item, n) => {
      var td = document.createElement('td');
      var text = document.createTextNode(entriesArray[i][item]);
      td.appendChild(text);
      tr.appendChild(td);
    });
    // Appends row for current entry
    entriesTableBody.appendChild(tr);
  };
  entriesTable.appendChild(entriesTableBody);
  // Appends the table to the entries div
  tableDiv.appendChild(entriesTable);
};




displayAllEntries();

