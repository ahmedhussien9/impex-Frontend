import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { onMainContentChange } from 'src/app/shared/animations/sidenav.animations';
import {
  NavItem,
  SidebarService,
} from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss'],
  animations: [onMainContentChange],
})
export class AdminlayoutComponent implements OnInit {
  sidebarStatus: string = 'side';
  position: string;
  lang: string;
  links: NavItem[];
  subLinksIcon: string;
  dir: 'rtl' | 'ltr';

  constructor(
    private readonly sidebarservice: SidebarService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.links = this.sidebarservice.navItems;
    this.checkMediaQuery();
    this.expandCurrentChildLink();
  }

  expandChildLink(index, link): void {
    console.log(index);
    this.links[index].isExpand = !this.links[index].isExpand;
    if (link.route) {
      this.router.navigate([link.route]);
    }
  }

  expandCurrentChildLink(): void {
    this.links
      .map((link) => link.children)
      .forEach((subLinks, index) => {
        if (subLinks) {
          subLinks.forEach((subLink) => {
            if (`/dash/${subLink.route}` === this.router.url) {
              this.links[index].isExpand = true;
              return;
            }
          });
        }
      });
  }

  
  reload(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url], {
      relativeTo: this.route,
    });
  }

  checkMediaQuery(): void {}
}
