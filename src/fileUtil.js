const fs = require("fs");
const vscode = require("vscode");

// TODO: test for existing file. Either fail or use git to version control

const createApexFile = (filePath, fileData = "", openFile = true) => {
  console.debug("Creating file at: ", filePath);

  const apexTestXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>51.0</apiVersion>
    <status>Active</status>
  </ApexClass>
  `;

  const testFileName = `${filePath}.cls`;
  fs.writeFile(testFileName, fileData, (err) => {
    if (err) return false;
    if (!fs.existsSync(`${testFileName}-meta.xml`)) {
      fs.writeFile(`${testFileName}-meta.xml`, apexTestXml, (err) => {
        console.debug(err);
      });
    }
    console.debug("Created " + `${testFileName}`);
    if (openFile) {
      vscode.workspace
        .openTextDocument(vscode.Uri.file(testFileName))
        .then((f) =>
          vscode.window.showTextDocument(f, vscode.ViewColumn.Beside)
        );
    }
    return `${filePath}Test.cls`;
  });
};

module.exports = {
  createApexFile,
};
