import { CustomBaseEntity } from '../entity';
import { Id } from '../types';

export class BaseRoDto {
  id!: Id;

  constructor(entity: CustomBaseEntity) {
    this.id = entity.id;
  }
}
