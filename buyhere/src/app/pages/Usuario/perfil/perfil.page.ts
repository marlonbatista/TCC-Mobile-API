import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/UserModel';
import { UsersService } from 'src/app/api/users.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx'
import { ActionSheetController, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user:any;
  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


  public users:UserModel = new UserModel;
  public us:UserModel = new UserModel;
  constructor(private userSevice:UsersService,private camera: Camera,
    public actionSheetController: ActionSheetController,
    private toastController: ToastController) {
    this.user = [];
  
  }

  async ngOnInit() {
    const id = JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(id)
    this.user = await this.userSevice.GetById(id.id);
    this.us.id = id.id;
    if(this.user.success){
      this.users = this.user.data;
      
      console.log('this.user =>',this.users)
      
    }
    
    
  }
 pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(() => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, () => {
      // Handle error
    });
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  deslog(){
    // this.isLogged = false;
    localStorage.clear();
    location.reload();
    
  }
  mostraDados() {

    let x = document.getElementById('dados')
    
    
    if(x.style.display==="block")
      x.style.display="none";
    else
      x.style.display="block";
     
  }

  async save():Promise<void>{
      const result = await this.userSevice.post(this.us);
      if(result.success){
        const toast = await this.toastController.create({
          message: "Dados alterados com sucesso.",
          duration:3000
        });
        toast.present();
        
      }
      console.log(result);
  }

}
