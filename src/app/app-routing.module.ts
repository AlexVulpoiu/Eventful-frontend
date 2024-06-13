import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {EventsForUsersComponent} from "./pages/events-for-users/events-for-users.component";
import {TicketScannerComponent} from "./pages/ticket-scanner/ticket-scanner.component";
import {MapsComponent} from "./pages/maps/maps.component";
import {SeatsMapComponent} from "./pages/seats-map/seats-map.component";
import {TextEditorComponent} from "./pages/text-editor/text-editor.component";
import {AddStandingLocationComponent} from "./pages/locations/add-standing-location/add-standing-location.component";
import {LocationsManagementComponent} from "./pages/locations/locations-management/locations-management.component";
import {AddSeatedLocationComponent} from "./pages/locations/add-seated-location/add-seated-location.component";
import {EventComponent} from "./pages/events/event/event.component";
import {PlaceOrderComponent} from "./pages/orders/place-order/place-order.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AddEventComponent} from "./pages/events/add-event/add-event.component";
import {FeedbackComponent} from "./pages/feedback/feedback.component";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'events',
        component: EventsForUsersComponent
      },
      {
        path: 'tickets-scanner',
        component: TicketScannerComponent
      },
      {
        path: 'maps',
        component: MapsComponent
      },
      {
        path: 'seats-map',
        component: SeatsMapComponent
      },
      {
        path: 'text-editor',
        component: TextEditorComponent
      },
      {
        path: 'locations/add-standing',
        component: AddStandingLocationComponent
      },
      {
        path: 'locations',
        component: LocationsManagementComponent
      },
      {
        path: 'locations/add-seated',
        component: AddSeatedLocationComponent
      },
      {
        path: 'events/add',
        component: AddEventComponent
      },
      {
        path: 'events/:eventId',
        component: EventComponent
      },
      {
        path: 'orders/new',
        component: PlaceOrderComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
