
import { User as PrismaUser } from '@prisma/client';
import { ICreateUserDTO, UserFilters } from '../dtos/users.dto';

export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  activo: boolean;
  createdAt: string;
}

export interface UserRepository {
  create(input: ICreateUserDTO): Promise<User>;
  findAll(filters?: UserFilters): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  updateActiveStatus(id: string, activo: boolean): Promise<User | null>;
}
