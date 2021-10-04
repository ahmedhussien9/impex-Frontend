import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dir: string;
  formGroup: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.formGroup = this.fb.group({
      companyName: ['', Validators.required],
      participantKey: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    if (!this.formGroup.valid) {
      this.loading = false;
      alert("Please make sure to entered the required fields");
      return;
    }

    this.authService.loginApi(this.formGroup.get("participantKey").value).pipe(
      finalize(() => this.loading = false)
    ).subscribe(data => {
      this.toastr.success(`Welcome Back ${data.body['name'] || ''}`)
      this.authService.setUserData(data.body);
      this.router.navigate(['/dash', 'home'])
      console.log(data);
    })
  }
}
