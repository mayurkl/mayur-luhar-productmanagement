import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router
  ) { }
  visibleSidebar = false;

  toggleSideBar(): void {
    this.visibleSidebar = !this.visibleSidebar;
  }
  hideSideBar(event): void{
    this.visibleSidebar = event;

  }


}
