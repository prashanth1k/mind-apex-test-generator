// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fileUtil = require("./src/fileUtil");
const generateTestApex = require("./src/generateTestApex");

const thisDoc = vscode.workspace.openTextDocument;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Extension "MindApexTestGenerator" is now active!');

  let disposable = vscode.commands.registerCommand(
    "mindapextestgenerator.createTestApex",
    activateExtn
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

/*
 custom functions
*/
function activateExtn() {
  const editor = vscode.window.activeTextEditor;
  if (!editor)
    return vscode.window.showErrorMessage(
      "No active editor. Run this command from valid Apex file."
    );

  if (editor.document.languageId != "apex" || editor.document.isUntitled)
    return vscode.window.showErrorMessage(
      "Invalid or unsaved file. Generate Apex from a valid Apex file."
    );

  const fileName = editor.document.fileName.substr(
    0,
    editor.document.fileName.lastIndexOf(".")
  );
  const apexClass = editor.document.getText();
  const fileSepIndex = fileName.lastIndexOf(`\\`) || fileName.lastIndexOf(`/`);
  const apexClassName = `${fileName.substr(fileSepIndex + 1)}`;

  const testApexClass = generateTestApex.genTestClass(apexClassName, apexClass);
  fileUtil.createApexFile(`${fileName}Test`, testApexClass);

  // all things done!
  vscode.window.showInformationMessage(
    "Successfully generated test class for Apex!"
  );
}

module.exports = {
  activate,
  deactivate,
};
