import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { JwtPayload, LoginResponse } from '../domain/shared/types';
import { UserService, PublicUser } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userService.findByEmailWithHash(email);

    // Mensaje idéntico para usuario inexistente y contraseña incorrecta,
    // para no revelar qué correos están registrados.
    const invalid = new UnauthorizedException('Credenciales inválidas');
    if (!user || !user.passwordHash) throw invalid;

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) throw invalid;

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('El usuario se encuentra inactivo');
    }

    await this.userService.registerLogin(user);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      branchId: user.branchId,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: this.userService.toPublic(user) as LoginResponse['user'],
    };
  }

  async getProfile(userId: string): Promise<PublicUser> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException('Sesión inválida');
    }
    return user;
  }
}
