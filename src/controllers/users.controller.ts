import { Request, Response } from 'express';
import { userService } from '../container';
import { DomainError } from '../errors/domain.error';
import { ICreateUserDTO, UserFilters } from '../dtos/users.dto';

export class UsersController {
  public static createUser = async (
    req: Request<Record<string, string>, unknown, ICreateUserDTO>,
    res: Response
  ): Promise<void> => {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user
    });
  };

  public static getUsersByFilter = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email, nombre, rol, activo } = req.query;

    if (
      (email !== undefined && typeof email !== 'string') ||
      (nombre !== undefined && typeof nombre !== 'string') ||
      (rol !== undefined && typeof rol !== 'string') ||
      (activo !== undefined &&
        activo !== 'true' &&
        activo !== 'false')
    ) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'Los filtros enviados no tienen un formato válido.'
      );
    }

    const filters: UserFilters = {
      email: email as string | undefined,
      nombre: nombre as string | undefined,
      rol: rol as string | undefined,
      activo: activo === undefined ? undefined : activo === 'true'
    };

    const users = await userService.getUsers(filters);

    res.status(200).json({
      success: true,
      data: users
    });
  };

  public static getUserById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const user = await userService.getUserDetail(req.params.id);

    res.status(200).json({
      success: true,
      data: user
    });
  };

  public static inactivateUser = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const user = await userService.inactivateUser(req.params.id);

    res.status(200).json({
      success: true,
      data: user
    });
  };
}
