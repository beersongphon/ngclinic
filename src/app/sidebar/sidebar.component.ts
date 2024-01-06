import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
link:any
  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  clickLink(line:any){
    this.link = line
console.log(this.link);
this.router.navigate([this.link]);
  }
}
