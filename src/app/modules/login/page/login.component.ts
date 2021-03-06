import { User } from '@models/User.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../../assets/styles/application.scss']
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;
  public shown: boolean = false;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl("", Validators.required)
    })
  }

  public onSubmit(): void {
    const user = this.formGroup.value;
    this.loginService.findUser(user).subscribe((users: User[]) => {
      users.find(result => {
        if(result.email === user.email && result.password === user.password) {
          this.formGroup.reset();
          this.router.navigate(['/'])
        } else {
          this.formGroup.controls["email"].setErrors({ notExists: true })
          this.formGroup.controls["password"].setErrors({ notExists: true })
        }
      });
    });

  }

  public toggleInputType = () => {
    this.shown = !this.shown;
  }


  get email(): AbstractControl {
    return this.formGroup.controls["email"];
  }

  get password(): AbstractControl {
    return this.formGroup.controls["password"];
  }

}
