import { Controller, Post, Get, HttpCode, HttpStatus } from '@nestjs/common';
import type { JwtPayload, LoginResponse } from '@apex/shared';
import { AuthService } from '../../application/auth.service';
import { PublicUser } from '../../application/user.service';
import { Public } from '../../infrastructure/auth/public.decorator';
import { CurrentUser } from '../../infrastructure/auth/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { ValidatedBody } from './dto/validated-body.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@ValidatedBody() credentials: LoginDto): Promise<LoginResponse> {
    return this.authService.login(credentials.email, credentials.password);
  }

  @Get('profile')
  async profile(@CurrentUser() user: JwtPayload): Promise<PublicUser> {
    return this.authService.getProfile(user.sub);
  }
}
