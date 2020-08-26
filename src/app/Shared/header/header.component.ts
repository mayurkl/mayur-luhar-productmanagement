import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  @Input() appheadervisiblesidebar: boolean;
  @Output() SideBar = new EventEmitter();
  showSideBar: boolean;
  ngOnInit(): void {}
  togggleSideBar(): void{
    this.SideBar.emit(!this.appheadervisiblesidebar);
  }
}
