import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User.model';
import { Injectable } from "@angular/core";
import { RepositoryService } from "src/app/core/services/repository.service";

@Injectable()
export class LoginService {
  constructor(private repositoryService: RepositoryService) { }

  public  findUser(user: User): Observable<User[]> {
     return this.repositoryService.getData<User[]>("users");
  }
}
