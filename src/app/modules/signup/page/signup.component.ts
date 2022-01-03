import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../../../../assets/styles/application.scss']
})
export class SignupComponent implements OnInit {
  public formGroup!: FormGroup;
  public shown: boolean = false;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {
    const user = this.formGroup.value;
    this.signupService.addUser(user).subscribe(() => this.router.navigate([""]))
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl("", Validators.required),
      description: new FormControl(""),
      age: new FormControl("",  Validators.compose([
        Validators.required,
        Validators.max(120)
      ])),
      occupation: new FormControl(""),
    })
  }

  public toggleInputType = () => {
    this.shown = !this.shown;
  }


  get name(): AbstractControl {
    return this.formGroup.controls["name"];
  }
  get email(): AbstractControl {
    return this.formGroup.controls["email"];
  }

  get password(): AbstractControl {
    return this.formGroup.controls["password"];
  }

  get age(): AbstractControl {
    return this.formGroup.controls["age"];
  }

  get occupation(): AbstractControl {
    return this.formGroup.controls["occupation"];
  }

}
