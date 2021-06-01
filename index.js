import fs from 'fs';

import Config from "./data/config.js";
import {Context} from "./classes/context.js";
import {StaticData} from "./data/staticdata.js";

import Discord from "discord.js";

const staticData = new StaticData().getDataFromServer();
const client = new Discord.Client();

if (!fs.existsSync('cache'))
	fs.mkdirSync('cache');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	const ctx = new Context(msg);

	if (msg.channel.id === Config.basic.channels.info_channel)
	{
		if (ctx.command.is("go"))
			ctx.showHelp();

		if (!ctx.isAdmin())
			ctx.delete();

		return;
	}
	if (ctx.isPrivateMessaging() && ctx.command.isCommand)
	{
		if (ctx.command.is("colors"))
			return ctx.author.send("🎨 EasyFly.One - Color Scheme:", { files: ["./data/images/color_scheme.png"] });

		if (ctx.command.is("about_us", "aboutus"))
			return ctx.author.send(staticData.aboutus);

		if (ctx.command.is("brand"))
			return ctx.author.send("🖼️ EasyFly.One - Logo's:", { files: ["./data/images/bg.png", "./data/images/logo.png", "./data/images/logo_m.png"] });

		if (ctx.command.is("findairport"))
		{
			if (ctx.command.arguments.length == 0)
				return ctx.author.send("You need write an argument this is may city/iata/country/name?");

			let query = ctx.command.arguments.join(' ').toLowerCase();
			if (query.length <= 2)
				return ctx.author.send("Your query is short may contains 2 more characters.");

			let founded = [];
			for (let i = 0; i < staticData.airports.length; i++)
			{
				let airport = staticData.airports[i];

				const name = `${airport.name} ${airport.country} ${airport.city} ${airport.iata_code}`.toLowerCase();
				if (name.includes(query))
					founded.push(airport);
			}

			if (founded.length == 0)
				return ctx.author.send(`Nothing founded by your query!`);

			let fields = [{ name: '\u200B', value: `\u200B ☑️  Search complete (${founded.length}):` }];

			for (let i = 0; i < founded.length; i++)
				fields.push({ name: `${founded[i].name} | ${founded[i].iata_code}`, value: `${founded[i].country} - ${founded[i].city}`, inline: true });

			const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Visit www.EasyFly.One')
				.setURL('https://easyfly.one/')
				.setAuthor('EasyFly.One', 'https://easyfly.one/img/logo.png', 'https://easyfly.one/')
				.setDescription('This list shows all successful searches on our website for airports. You can also search for them on our website!')
				.setThumbnail('https://purepng.com/public/uploads/large/search-icon-lob.png')
				.addFields(fields);

			return ctx.author.send(exampleEmbed);
		}

		if (ctx.command.is("go", "help"))
			return ctx.showHelp();

		return ctx.author.send(`Command '${ctx.command.title}' not found!`);
	}
});

client.login(Config.bot.token);