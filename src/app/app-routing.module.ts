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
import {AddReviewComponent} from "./pages/events/add-review/add-review.component";
import {AllEventsComponent} from "./pages/events/all-events/all-events.component";
import {StatisticsComponent} from "./pages/statistics/statistics.component";
import {OrganiserProfileComponent} from "./pages/organiser-profile/organiser-profile.component";
import {ViewFeedbackComponent} from "./pages/view-feedback/view-feedback.component";
import {ViewOrganisersComponent} from "./pages/users-management/view-organisers/view-organisers.component";
import {RolesComponent} from "./pages/roles/roles.component";
import {ViewUsersComponent} from "./pages/users-management/view-users/view-users.component";
import {GeneralStatisticsComponent} from "./pages/general-statistics/general-statistics.component";
import {AccountConfirmationComponent} from "./pages/account-confirmation/account-confirmation.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/events',
        pathMatch: 'full',
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
        path: 'events/all',
        component: AllEventsComponent
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
      },
      {
        path: 'view-feedback',
        component: ViewFeedbackComponent
      },
      {
        path: 'reviews/:reviewId',
        component: AddReviewComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'organiser-profile',
        component: OrganiserProfileComponent
      },
      {
        path: 'organisers',
        component: ViewOrganisersComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'users',
        component: ViewUsersComponent
      },
      {
        path: 'general-statistics',
        component: GeneralStatisticsComponent
      },
      {
        path: 'confirm-account/:code',
        component: AccountConfirmationComponent
      },
      {
        path: '404',
        component: NotFoundComponent
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
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
