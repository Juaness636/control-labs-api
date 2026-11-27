
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { ICreateUserDTO, UserFilters } from '../dtos/users.dto';
import { User, UserRepository } from './users.repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly database: PrismaClient) {}

  public async create(input: ICreateUserDTO): Promise<User> {
    const user = await this.database.user.create({
      data: {
        email: input.email,
        nombre: input.nombre,
        rol: input.rol
      }
    });

    return this.toDomain(user);
  }

  public async findAll(filters: UserFilters = {}): Promise<User[]> {
    const users = await this.database.user.findMany({
      where: {
        email: filters.email
          ? { contains: filters.email, mode: 'insensitive' }
          : undefined,
        nombre: filters.nombre
          ? { contains: filters.nombre, mode: 'insensitive' }
          : undefined,
        rol: filters.rol
          ? { equals: filters.rol, mode: 'insensitive' }
          : undefined,
        activo: filters.activo
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return users.map(user => this.toDomain(user));
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.database.user.findUnique({
      where: { id }
    });

    return user ? this.toDomain(user) : null;
  }

  public async updateActiveStatus(
    id: string,
    activo: boolean
  ): Promise<User | null> {
    const updated = await this.database.user.updateMany({
      where: { id },
      data: { activo }
    });

    if (updated.count === 0) {
      return null;
    }

    return this.findById(id);
  }

  private toDomain(user: PrismaUser): User {
    return {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
      activo: user.activo,
      createdAt: user.createdAt.toISOString()
    };
  }
}
