export type Role = "ADMIN" | "BIBLIOTECARIO" | "ALUMNO";

export interface UserApp {
  id: number;
  nombre: string;
  email: string;
  password: string;
  carrera_id?: number | null;
  rol: Role;
  created_at: string;
  updated_at: string;
  activo: boolean;
}
