import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private authService: AuthService) {}

  load(): boolean {
    this.authService.initializeRandomState();
    return true;
  }
}
