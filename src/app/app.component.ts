import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from './shared/models/user.model';
import { DisplayMode, UiService } from './shared/services/ui.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  users: IUser[] = [];

  preventDisplayingSiteContent: boolean;
  displayModeSubscription: Subscription;

  constructor(private uiService: UiService, private userService: UserService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event, width?, height?) {
    const [w, h] = [
      event ? event.target.innerWidth : width,
      event ? event.target.innerHeight : height,
    ];
    this.uiService.setDisplayMode(w);
  }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
    this.displayModeSubscription = this.uiService
      .getDisplayMode()
      .subscribe((displayMode: string) => {
        if (displayMode === DisplayMode.mini) {
          this.preventDisplayingSiteContent = true;
        } else {
          this.preventDisplayingSiteContent = false;
        }
      });

    this.userService.getUserFriendsList().subscribe((res) => {
      this.users = [...res];
    });
  }

  ngOnDestroy(): void {
    this.displayModeSubscription?.unsubscribe();
  }
}
