export class DefaultAlert {
	public type: string;
	public message: string;

	constructor(type: string, message: string) {
		this.type = type;
		this.message = message;
	}
}
