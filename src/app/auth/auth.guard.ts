import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../shared/service/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AppService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean
                                | UrlTree>
                                | Promise<boolean | UrlTree>
                                | boolean
                                | UrlTree {
    const token = localStorage.getItem('token');
    if(!token) {
      this.router.navigate(['/auth']);
    }
    return true;
  }
}
