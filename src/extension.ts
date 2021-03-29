// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	function getUrl (path: any):string {
		let url:string = path._formatted;
		if (!url.split('src')[1]) {
			vscode.window.showErrorMessage("copypath: 请选择在src目录下的文件");
			return '';
		} else {
			return  `'@${url.split('src')[1]}'`;
		}
	}
	function getFilename (url: string):string {
		let arr = url.split('/');
		let file = arr.pop();
		return (file&&file.split('.')[0] )|| '';
	}
	let disposable1 = vscode.commands.registerCommand('copypath.copyRelativePath', (path) => {
		let url = getUrl(path);
		vscode.env.clipboard.writeText(url);
	});
	let disposable2 = vscode.commands.registerCommand('copypath.copyImportWord', (path) => {
		const url = getUrl(path);
		const filename = getFilename(url);
		vscode.env.clipboard.writeText(`import ${filename} from ${url}`);
	});
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}
export function deactivate() {}
