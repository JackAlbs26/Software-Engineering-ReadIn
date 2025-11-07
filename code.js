function doGet() {
  return HtmlService.createHtmlOutputFromFile('app.html')
    .setTitle('ReadIn (Vanilla)')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
