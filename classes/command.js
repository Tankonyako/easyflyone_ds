export class Command {
	constructor(cmd)
	{
		this.isCommand = cmd.startsWith("/") && cmd.length > 1;

		if (this.isCommand)
		{
			const parts = cmd.replace('/', '').split(' ');

			this.title = parts[0];
			this.arguments = parts.slice(1);
		}
	}

	is()
	{
		if (!this.isCommand)
			return false;

		for (let i = 0; i < arguments.length; i++)
			if (this.title.includes(arguments[i]))
				return true;

		return false;
	}
}