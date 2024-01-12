function downloaddataHKU() {
  const oldsheet_confirmed =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
      "suspected or confirmed cases"
    );
  const oldrow = oldsheet_confirmed.getDataRange().getNumRows();
  const olddate = oldsheet_confirmed.getRange(oldrow, 1).getValue();
  const oldDate = Date.parse(olddate);
  Logger.log(olddate);
  Logger.log(oldDate);

  const url =
    "https://covid19.hku.hk/control/latest-campus-related-test-positive-cases/";
  const res = UrlFetchApp.fetch(url).getContentText();
  const currentYear = ",2022";

  const $ = Cheerio.load(res);
  const allRows = $("table > tbody > tr");
  Logger.log(allRows.length);
  for (let index = allRows.length - 1; index >= 0; index--) {
    var tds = $(allRows[index]).find("td");
    // Logger.log(tds.length);
    const year = "2022";
    var Dateofreport = $(tds[0]).text().trim() + " " + year;
    var Placesvisitedoncampus = $(tds[1]).text().trim();
    var FacultyUnit = $(tds[2]).text().trim();
    var HallCollege = $(tds[3]).text().trim();
    var Dateoflastvisittocampus = $(tds[4]).text().trim();
    var StudentStaffVisitor = $(tds[5]).text().trim();
    var currentdate = Date.parse(Dateofreport + currentYear);
    Logger.log(currentdate);
    if (currentdate > oldDate) {
      Logger.log(Dateofreport);
      oldsheet_confirmed.appendRow([
        Dateofreport,
        StudentStaffVisitor,
        FacultyUnit,
        HallCollege,
        Dateoflastvisittocampus,
        Placesvisitedoncampus,
        ,
        "S",
      ]);
      Logger.log("update!!!");
    }
  }
}
