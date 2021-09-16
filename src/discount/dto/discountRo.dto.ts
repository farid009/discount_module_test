export class DiscountRoDto {
  status!: boolean;
  discountPercentage!: number;

  constructor(discountPercentage: number, status: boolean) {
    this.status = status;
    this.discountPercentage = discountPercentage;
  }
}
