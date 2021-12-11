import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User.model';
import { RepositoryService } from '../../../../core/services/repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;
  constructor(private repositoryService: RepositoryService) { }

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
    console.log(this.formGroup.value)
  }


  get email(): AbstractControl {
    return this.formGroup.controls["email"];
  }

  get password(): AbstractControl {
    return this.formGroup.controls["password"];
  }

}
