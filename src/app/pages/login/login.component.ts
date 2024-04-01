import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { LoaderService } from '../../core/services/loader.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../core/services/login.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.moveToDashBoard();
    }
  }

  login() {
    this.loaderService.showLoading()
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (res) => {
        this.loaderService.hideLoading()
        if (res?.data?.token) {
          localStorage.setItem('token', res.data.token)
          this.notificationService.success(res?.message)
          this.moveToDashBoard();
        } else {
          this.notificationService.error('Something went wrong!')
        }
      },
      error: (err) => {
        this.loaderService.hideLoading();
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    });
  }

  moveToDashBoard() {
    this.router.navigate(['dashboard'])
  }
}
