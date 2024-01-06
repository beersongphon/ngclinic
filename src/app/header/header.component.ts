import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navBurger') navBurger?: ElementRef;
  @ViewChild('navMenu') navMenu?: ElementRef;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navBurger?.nativeElement.classList.toggle('is-active');
    this.navMenu?.nativeElement.classList.toggle('is-active');
  }

  logout(): void{
    this.apiService.logout();
    // this.isLogin = false;
    // this.loginForm.reset();
    this.router.navigate(['/']);
  }
}
