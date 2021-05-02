import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent implements OnInit, OnDestroy {
  @Input() data: IUser = {
    email: null,
    name: null,
    username: null,
    avatar: null,
  };

  isSelected: boolean = false;

  selectedUserSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.selectedUserSubscription = this.userService
      .getSelectedUser()
      .subscribe((users: IUser[]) => {
        const foundedUser = users.find(
          (user: IUser) => user.username === this.data.username
        );

        this.isSelected = !!foundedUser;
      });
  }

  ngOnDestroy(): void {
    this.selectedUserSubscription?.unsubscribe();
  }

  selectOrDeselectUser() {
    this.isSelected = !this.isSelected;

    this.userService
      .getSelectedUser()
      .pipe(first())
      .subscribe((users: IUser[]) => {
        const selectedUser: IUser[] = this.isSelected
          ? [...users, this.data]
          : users.filter((user: IUser) => user.username !== this.data.username);
        this.userService.setSelectedUser(selectedUser);
      });
  }
}
