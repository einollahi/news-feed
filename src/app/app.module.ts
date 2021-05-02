import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/es-US';
import { environment } from 'src/environments/environment';
registerLocaleData(en);

import { StartupService } from './shared/services/startup.service';

export function startupService(startupService: StartupService) {
  return () => startupService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule],
  providers: [
    ...environment.providers,
    {
      provide: APP_INITIALIZER,
      useFactory: startupService,
      deps: [StartupService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
