import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() visibleSidebar: boolean;
   @Output() outVisibleSideBar = new EventEmitter();

  ngOnInit(): void {}

  sidenavClosed(): void {
    this.outVisibleSideBar.emit(!this.visibleSidebar);

  }

  goToHome(): void {
    this.router.navigate(['/productList']);
  }
  goToTrash(): void {
    this.router.navigate(['/Trash']);
  }
}
