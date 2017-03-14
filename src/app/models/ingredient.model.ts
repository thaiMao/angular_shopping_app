export class Ingredient {
  constructor(
  public image: string,
  public tpnb: number,
  public price: number,
  public PromotionDescription: string,
  public ContentsMeasureType: string,
  public name: string,
  public UnitOfSale: number,
  public AverageSellingUnitWeight: number,
  public description: Array<string>,
  public UnitQuantity: string,
  public ContentsQuantity: number,
  public unitprice: number) {}
}
