function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("React-Apps-Script")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function includes(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
