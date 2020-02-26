import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading: boolean = false
  submitted: boolean = false
  error: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { if(this.authService.isAuthenticated()) { this.router.navigate(['/']); }}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return }

    this.loading = true;
    this.authService.login(this.form.email.value, this.form.password.value).catch(error => {
      this.error = error
      this.loading = false
    })
  }

  get form() { return this.loginForm.controls; }
}
