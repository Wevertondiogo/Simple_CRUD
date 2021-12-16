import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../../../../assets/styles/application.scss']
})
export class SignupComponent implements OnInit {
  public formGroup!: FormGroup;
  public shown: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {}

  private createForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl("", Validators.required),
      description: new FormControl(""),
      age: new FormControl("", Validators.required),
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
