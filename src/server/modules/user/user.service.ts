import { NotFoundError } from '@/server/utils/errors';
import { userRepository } from './user.repository';

export class UserService {
  /**
   * Obtener detalles del usuario autenticado
   */
  async getUserDetails(userId: string) {
    const user = await userRepository.findUserWithDetails(userId);

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    return user;
  }
}

export const userService = new UserService();
