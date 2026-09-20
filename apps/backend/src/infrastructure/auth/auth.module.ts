import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './jwt.strategy';
import { UserOrmEntity } from '../../adapters/outbound/user.orm-entity';
import { TypeOrmUserRepository } from '../../adapters/outbound/typeorm-user.repository';
import { USER_REPOSITORY_TOKEN } from '../../domain/user.repository';
import { UserService } from '../../application/user.service';
import { AuthService } from '../../application/auth.service';
import { AuthController } from '../../adapters/inbound/auth.controller';
import { UserController } from '../../adapters/inbound/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          // El tipo de `expiresIn` es un literal de la librería `ms`;
          // el valor llega por entorno, así que se afirma aquí.
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') ??
            '8h') as `${number}h`,
        },
      }),
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UserService, AuthService],
})
export class AuthModule {}
