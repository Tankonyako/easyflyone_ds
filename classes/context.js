import Discord from "discord.js";
import {Command} from "./command.js";

export class Context
{
	constructor(message)
	{
		this.message = message;

		this.author = this.message.author;
		this.member = this.message.member;

		this.command = new Command(this.message.content);
	}

	isPrivateMessaging()
	{
		return this.message.guild == null && !this.author.bot;
	}

	isAdmin()
	{
		return this.member.hasPermission("ADMINISTRATOR");
	}

	showHelp()
	{
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Visit www.EasyFly.One')
			.setURL('https://easyfly.one/')
			.setAuthor('EasyFly.One', 'https://easyfly.one/img/logo.png', 'https://easyfly.one/')
			.setDescription('This bot helps you to interact with our site and do many useful functions. And most importantly, it\'s all available in your favorite Discord messenger.')
			.setThumbnail('https://images.emojiterra.com/google/android-pie/512px/2139.png')
			.addFields(
				{ name: '\u200B', value: '\u200B ℹ️  Command help:' },
				{ name: '/go /help', value: 'Show help', inline: true },
				{ name: '/colors', value: 'Get our color scheme', inline: true },
				{ name: '/brand', value: 'Get our logo(s)', inline: true },
				{ name: '/aboutus', value: 'About us', inline: true },
				{ name: '/findairport [name/iata/city/country]', value: 'Find airport by parameters', inline: true },
			);

		this.author.send(exampleEmbed);
	}

	delete()
	{
		this.message.delete();
	}
}