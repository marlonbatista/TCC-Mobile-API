import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../api/user.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate{
    
    constructor(private userService: UserService, private router: Router){

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean |  UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
            
            if(this.userService.isStaticLogged){
                    return true;
            }
            else{
                this.router.navigateByUrl('/login');
            }
        } 
    

}