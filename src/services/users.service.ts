
import { ICreateUserDTO, UserFilters } from '../dtos/users.dto';
import { DomainError } from '../errors/domain.error';
import { User, UserRepository } from '../repositories/users.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(input: ICreateUserDTO): Promise<User> {
    const email = input.email?.trim().toLowerCase();
    const nombre = input.nombre?.trim();
    const rol = input.rol?.trim().toUpperCase();

    if (!email || !nombre || !rol) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El correo, nombre y rol son obligatorios.'
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El correo electrónico no tiene un formato válido.'
      );
    }

    if (nombre.length > 150 || email.length > 255 || rol.length > 20) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'Uno o más campos superan la longitud permitida.'
      );
    }

    return this.userRepository.create({
      email,
      nombre,
      rol
    });
  }

  public async getUsers(filters: UserFilters = {}): Promise<User[]> {
    return this.userRepository.findAll(filters);
  }

  public async getUserDetail(id: string): Promise<User> {
    this.validateId(id);

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un usuario con identificador ${id}.`
      );
    }

    return user;
  }

  public async inactivateUser(id: string): Promise<User> {
    this.validateId(id);

    const user = await this.userRepository.updateActiveStatus(id, false);

    if (!user) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un usuario con identificador ${id}.`
      );
    }

    return user;
  }

  private validateId(id: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'El identificador del usuario debe ser un UUID válido.'
      );
    }
  }
}
