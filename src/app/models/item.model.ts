export class Item {
  constructor(
  public image: string,
  public price: number,
  public name: string,
  public description: Array<string>,
  public quantity: number) {}
}
