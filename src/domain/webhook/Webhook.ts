export class Webhook {
  constructor(
    public readonly id: string,
    public readonly url: string,
    public readonly events: string[],
    public readonly userId: string,
  ) { }


}
