import { Injectable, Inject, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { User } from '../domain/user';
import type { UserRepository } from '../domain/user.repository';
import { USER_REPOSITORY_TOKEN } from '../domain/user.repository';

const BCRYPT_ROUNDS = 12;

/** Vista pública de un usuario: nunca incluye el hash de la contraseña. */
export type PublicUser = Omit<User, 'passwordHash'>;

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<PublicUser[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.toPublic(user));
  }

  async getUserById(id: string): Promise<PublicUser | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.toPublic(user) : null;
  }

  /** Uso interno del flujo de login; incluye el hash. */
  async findByEmailWithHash(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email.toLowerCase().trim());
  }

  async createUser(data: Partial<User> & { password: string }): Promise<PublicUser> {
    const email = (data.email ?? '').toLowerCase().trim();
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictException(`Ya existe un usuario con el correo ${email}`);
    }

    const user = new User();
    Object.assign(user, data);
    user.id = data.id ?? randomUUID();
    user.email = email;
    user.status = data.status ?? 'ACTIVE';
    user.createdAt = data.createdAt ?? new Date().toISOString();
    user.passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    return this.toPublic(await this.userRepository.save(user));
  }

  async updateUser(
    id: string,
    data: Partial<User> & { password?: string },
  ): Promise<PublicUser | null> {
    const existing = await this.userRepository.findById(id);
    if (!existing) return null;

    const { password, passwordHash: _ignored, ...safeData } = data;
    const merged = Object.assign(existing, safeData, { id });
    if (password) {
      merged.passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    }

    return this.toPublic(await this.userRepository.save(merged));
  }

  async registerLogin(user: User): Promise<void> {
    user.lastLoginAt = new Date().toISOString();
    await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  toPublic(user: User): PublicUser {
    const { passwordHash: _passwordHash, ...publicUser } = user;
    return publicUser;
  }
}
