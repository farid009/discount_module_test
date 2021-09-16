import { Id } from '../types';

export interface ICustomBaseEntity {
  id: Id;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class CustomBaseEntity implements ICustomBaseEntity {
  id!: Id;

  createdAt?: Date;

  updatedAt?: Date;
}
