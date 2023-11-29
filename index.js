import { saveSettingsDebounced } from "../../../../script.js";
import { extension_settings } from "../../../extensions.js";
import { registerSlashCommand } from "../../../slash-commands.js";



const initSettings = ()=>{
	if (!extension_settings.custom_title) {
		extension_settings.custom_title = {
			title: null,
			default: document.title,
		};
	}
};


const setTitle = (_, prompt)=>{
	initSettings();
	if (prompt) {
	    document.title = prompt;
		extension_settings.custom_title.title = prompt;
	} else {
		document.title = extension_settings.custom_title.default;
	}
	saveSettingsDebounced();
};
registerSlashCommand('title', setTitle, [], 'change the document title (title of the tab / window), leave blank to reset', true, true);


$(document).ready(function() {
	initSettings();
	extension_settings.custom_title.default = document.title;
	document.title = extension_settings.custom_title.title ?? document.title;
});