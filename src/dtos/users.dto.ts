
export interface ICreateUserDTO {
  email: string;
  nombre: string;
  rol: string;
}

export interface UserFilters {
  email?: string;
  nombre?: string;
  rol?: string;
  activo?: boolean;
}
