import { UserService } from './../../services/user.service';
import { UserModel } from './../../model/userModel';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManager } from '../../components/input-file/input-file.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  model: UserModel = new UserModel();

  constructor(
    private userSrv: UserService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(id: string): Promise<void> {
    if (id === 'new') { return; }
    const result = await this.userSrv.GetById(id);
    this.model = result.data as UserModel;
  }

  async save(): Promise<void> {
    const result = await this.userSrv.post(this.model);
    console.log('result =>', result)
    if (result.success) {
      this.matSnack.open('Usuário salvo com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/Users');
    } else {
      this.matSnack.open('Infelizmente a imagem é muito grande!', undefined, { duration: 3000 })
    }
  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      try {

        this.model.photo = file.base64Data;
      } catch (error) {
        console.log(error)
      }
    }
  }


}
