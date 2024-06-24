import {Component, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav.service';
import {NavItem} from "./nav-item/nav-item";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems: NavItem[] = [
    {
      navCap: 'Main menu',
    },
    {
      displayName: 'Events',
      iconName: 'calendar-event',
      route: '/events'
    },
    {
      navCap: 'Auth',
    },
    {
      displayName: 'Login',
      iconName: 'lock',
      route: '/authentication/login',
    },
    {
      displayName: 'Register',
      iconName: 'user-plus',
      route: '/authentication/register',
    },
    {
      displayName: 'Organisers register',
      iconName: 'user-star',
      route: '/authentication/organisers/register',
    }
  ];
  roles: string[] = [];

  constructor(public navService: NavService, private tokenStorageService: TokenStorageService) {
    let user = this.tokenStorageService.getUser();
    if (user.roles != undefined) {
      this.roles = user.roles;
    }
    if (this.roles.includes('USER')) {
      this.navItems = [
        {
          navCap: 'Main menu',
        },
        {
          displayName: 'Events',
          iconName: 'calendar-event',
          route: '/events'
        },
        {
          displayName: 'Add feedback',
          iconName: 'writing',
          route: '/feedback'
        },
        {
          navCap: 'Auth',
        },
        {
          displayName: 'Register',
          iconName: 'user-plus',
          route: '/authentication/register',
        },
        {
          displayName: 'Organisers register',
          iconName: 'user-star',
          route: '/authentication/organisers/register',
        }
      ];
    } else if (this.roles.includes('ORGANISER')) {
      this.navItems = [
        {
          navCap: 'Main menu',
        },
        {
          displayName: 'My events',
          iconName: 'calendar-event',
          route: '/events/all'
        },
        {
          displayName: 'Add event',
          iconName: 'table-plus',
          route: '/events/add'
        },
        {
          displayName: 'Add feedback',
          iconName: 'writing',
          route: '/feedback'
        },
        {
          navCap: 'Auth',
        },
        {
          displayName: 'Register',
          iconName: 'user-plus',
          route: '/authentication/register',
        },
        {
          displayName: 'Organisers register',
          iconName: 'user-star',
          route: '/authentication/organisers/register',
        }
      ];
    } else if (this.roles.includes('MODERATOR')) {
      this.navItems = [
        {
          navCap: 'Main menu',
        },
        {
          displayName: 'All events',
          iconName: 'calendar-event',
          route: '/events/all'
        },
        {
          displayName: 'Locations',
          iconName: 'map-pin',
          route: '/locations'
        },
        {
          displayName: 'View organisers',
          iconName: 'users-group',
          route: '/organisers'
        },
        {
          displayName: 'View feedback',
          iconName: 'list-details',
          route: '/view-feedback'
        },
        {
          navCap: 'Auth',
        },
        {
          displayName: 'Register',
          iconName: 'user-plus',
          route: '/authentication/register',
        },
        {
          displayName: 'Organisers register',
          iconName: 'user-star',
          route: '/authentication/organisers/register',
        }
      ];
    } else if (this.roles.includes('ADMIN')) {
      this.navItems = [
        {
          navCap: 'Main menu',
        },
        {
          displayName: 'All events',
          iconName: 'calendar-event',
          route: '/events/all'
        },
        {
          displayName: 'Locations',
          iconName: 'map-pin',
          route: '/locations'
        },
        {
          displayName: 'View organisers',
          iconName: 'users-group',
          route: '/organisers'
        },
        {
          displayName: 'Roles',
          iconName: 'settings',
          route: '/roles'
        },
        {
          displayName: 'View users',
          iconName: 'users',
          route: '/users'
        },
        {
          displayName: 'Statistics',
          iconName: 'chart-bar',
          route: '/general-statistics'
        },
        {
          displayName: 'View feedback',
          iconName: 'list-details',
          route: '/view-feedback'
        },
        {
          navCap: 'Auth',
        },
        {
          displayName: 'Register',
          iconName: 'user-plus',
          route: '/authentication/register',
        },
        {
          displayName: 'Organisers register',
          iconName: 'user-star',
          route: '/authentication/organisers/register',
        }
      ];
    }
  }

  ngOnInit(): void {
  }
}
