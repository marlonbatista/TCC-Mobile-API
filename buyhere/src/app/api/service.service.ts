import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResultHTTP } from '../Interface/IResult';
import Swal from 'sweetalert2';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = "http://localhost:3000/api/";

 
  constructor(private http: HttpClient, public loadingController: LoadingController) { }

  public createHeaders(header?:HttpHeaders):HttpHeaders {
    if(!header){
      header = new HttpHeaders();
    }
    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');
    const token :string = '';

    if(token){
      header = header.append('x-token-access', token);
    }
    return header;
  }

  public get(url: string): Promise<IResultHTTP> {
    const header = this.createHeaders();
    return new Promise(async (resolve) => {
      
      try {
        // const loading = await this.loadingController.create({
        //   message: 'Please wait...',
        //   duration: 2000
        // });
        // await loading.present();
    
        
        const res = await this.http.get(url, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        // const { role, data } = await loading.onDidDismiss();
    
        // console.log('Loading dismissed!');
      } catch (error) {
        const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
        });
        await loading.present();
        resolve({ success: false, data: undefined, error});
        const { role, data } = await loading.onDidDismiss();
    
        console.log('Loading dismissed!');
      }
    })
  }
  // public getProduto(url: string): Promise<IResultHTTP> {
  //   const header = this.createHeaders();
  //   return new Promise(async (resolve) => {
   
  //     try {
  //       const loading = await this.loadingController.create({
  //         message: 'Please wait...',
  //         duration: 2000
  //       });
  //       await loading.present();
    
        
  //       const res = await this.http.get('http://localhost:3000/' + url, { headers: header }).toPromise();
  //       resolve({ success: true, data: res, error: undefined });
  //       const { role, data } = await loading.onDidDismiss();
    
  //       console.log('Loading dismissed!');
  //     } catch (error) {
  //       const loading = await this.loadingController.create({
  //         message: 'Please wait...',
  //         duration: 2000
  //       });
  //       await loading.present();
  //       resolve({ success: false, data: undefined, error});
  //       const { role, data } = await loading.onDidDismiss();
    
  //       console.log('Loading dismissed!');
  //     }
  //   })
  // }
  public post(url: string, model:any, headers?:HttpHeaders):Promise<IResultHTTP>{
    const header = this.createHeaders(headers);
    return new Promise(async( resolve) =>{
      try {
        const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
        });
        await loading.present();
        const res = await this.http.post(url, model, {headers:header}).toPromise();
        resolve({ success: true, data: res, error: undefined });
        const { role, data } = await loading.onDidDismiss();
    
        console.log('Loading dismissed!');
      } catch (error) {
        // console.log(error);
        if (error.status === 400){
          console.log(error.error);
          let errosText = '<ul>';
          if(Array.isArray(error.error)){
            error.error.forEach(element => {
              errosText += `<li style="text-align: left">${element.message|| element }</li>`;              
            });
            errosText +='</ul>';
            Swal.fire('Atenção ',errosText, 'warning');
          }
        }
        resolve({ success:false, data:{}, error});
      }
    });
  }

  public delete(url:string):Promise<IResultHTTP>{
    const  header = this.createHeaders();
    return new Promise(async( resolve) =>{
      try {
        const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
        });
        await loading.present();
        const res = await this.http.post(url, {headers:header});
        resolve({ success: true, data: res, error: undefined });
        const { role, data } = await loading.onDidDismiss();
      } catch (error) {
        const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
        resolve({ success: false, data: {}, error});
      }
    });
  }
}
