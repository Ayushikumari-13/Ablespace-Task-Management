import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  createGuestSession() {
    const guestId = `guest-${Date.now()}`;

    const payload = {
      sub: guestId,
      name: 'Guest User',
      email: `${guestId}@ablespace.local`,
      role: 'guest',
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}