import { Prisma } from '@prisma/client';

export interface Repository<
  Entity,
  EntityCreateInput,
  EntityUpdateInput,
  EntityWhereInput,
> {
  create(data: EntityCreateInput): Promise<Entity>;
  find(where: EntityWhereInput): Promise<Entity[]>;
  update(where: EntityWhereInput, data: EntityUpdateInput): Promise<Boolean>;
  delete(where: EntityWhereInput): Promise<Boolean>;
  count(where: EntityWhereInput): Promise<number>;
  sum(where: EntityWhereInput, field: string): Promise<number>;
}
