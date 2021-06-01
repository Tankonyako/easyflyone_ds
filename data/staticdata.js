import fs from 'fs';

import pkg from 'node-html-parser';
const { parse } = pkg;

import Request from 'request';

const URL_AIRPORTS = 'https://easyfly.one/data/airports.json';
const URL_ABOUT_US = 'https://easyfly.one/aboutus';

export class StaticData {
	constructor()
	{
		this.airports = [];
		if (fs.existsSync('cache/airports.json'))
			this.airports = JSON.parse(fs.readFileSync('cache/airports.json').toString());

		this.aboutus = 'Loading...';
	}

	getDataFromServer()
	{
		Request.get({ url: URL_AIRPORTS }, (error, response, body) => {
			this.airports = JSON.parse(body);
			fs.writeFileSync('cache/airports.json', JSON.stringify(this.airports));
			console.log("Airports static data loaded!")
		});

		Request.get({ url: URL_ABOUT_US }, (error, response, body) => {
			let page = parse(body);

			let info = page.querySelector('#aa-content-frame');
				info.querySelector('h1').remove();

			this.aboutus = `**EasyFly.One Airlines Group**`;
			this.aboutus += info.text.replace('\n\n', '');

			console.log("About us data loaded!")
		});

		return this;
	}
}