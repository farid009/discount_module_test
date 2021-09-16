import { CustomBaseEntity } from '@src/shared/entity';

export class Discount extends CustomBaseEntity {
  code!: string;
  percentage!: number;
}
