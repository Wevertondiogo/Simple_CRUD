import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "src/app/core/models/User.model";
import { RepositoryService } from '@services/repository.service';

@Injectable()
export class SignupService {
  constructor(private repositoryService: RepositoryService) {}

  public addUser(user: User): Observable<User> {
    return this.repositoryService.create<User>("users", user);
  }

}
