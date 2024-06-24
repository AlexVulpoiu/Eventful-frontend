import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, scan, shareReplay, startWith} from "rxjs";
import {ZXingScannerComponent, ZXingScannerModule} from "@zxing/ngx-scanner";
import {BarcodeFormat} from "@zxing/library";
import {AsyncPipe, CommonModule, formatDate, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {EventService} from "../../services/event.service";
import {TicketDto} from "../../dto/tickets/ticket-dto";
import {EventTicketsScannerService} from "../../services/event-tickets-scanner";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ticket-scanner',
  standalone: true,
  imports: [
    ZXingScannerModule,
    AsyncPipe,
    MatButton,
    NgIf,
    CommonModule,
  ],
  templateUrl: './ticket-scanner.component.html',
  styleUrl: './ticket-scanner.component.scss'
})
export class TicketScannerComponent implements OnInit {
  @ViewChild('scanner') scanner!: ZXingScannerComponent;
  ticketInfo: TicketDto | undefined;
  startDate: Date = new Date();
  eventName: string = '';
  ticketId: string = '';
  showButton: boolean = false;
  showNextScanButton: boolean = false;
  eventId: number = 0;

  constructor(private eventService: EventService, private eventTicketsScannerService: EventTicketsScannerService,
              private notificationService: NotificationService, private router: Router,
              @Inject(LOCALE_ID) public locale: string) {

  }

  ngOnInit(): void {
    this.eventTicketsScannerService.getMessage.subscribe(data => this.eventId = data.eventId);
  }

  allowedFormats = [BarcodeFormat.QR_CODE];

  devices$ = new BehaviorSubject<MediaDeviceInfo[]>([]);

  selectedDevice$: Observable<MediaDeviceInfo> = this.devices$.pipe(
    map((device) => device[0]),
    distinctUntilChanged(),
    shareReplay(1)
  );

  enable$ = this.devices$.pipe(map(Boolean));

  toggleCamera$ = new BehaviorSubject<boolean>(false);

  startCamera$ = this.toggleCamera$.pipe(
    scan((acc) => !acc, true),
    startWith(true)
  );

  startCamera = this.startCamera$.subscribe(() => this.ticketInfo = undefined);

  scanSuccess$ = new BehaviorSubject<string>('');

  scanError(error: Error) {
    console.error(error);
  }

  scanSuccess = this.scanSuccess$.pipe(
    map((result) => result),
  ).subscribe(id => {
    if (id !== undefined && id !== null && id !== '') {
      this.eventService.getTicketInfo(this.eventId, id)
        .subscribe({
          next: data => {
            this.ticketInfo = data;
            this.startDate = data.startDate;
            this.eventName = data.eventName;
            this.ticketId = data.externalId;
            this.showButton = true;
          }, error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
              this.router.navigate(['/events/all']);
            } else if (400 <= status && status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        });
      this.toggleCamera$.next(false);
    }
  });

  validateTicket() {
    this.eventService.validateTicket(this.eventId, this.ticketId).subscribe(
      {
        next: () => {
          this.notificationService.showSuccess('The ticket was validated successfully!');
          this.showButton = false;
          this.showNextScanButton = true;
        },
        error: err => {
          let message = typeof err.error === "string" ? err.error : 'Internal server error';
          let status = typeof err.status === "number" ? err.status : 500;

          if (status === 401 || status === 403) {
            this.router.navigate(['/events/all']);
          } else if (400 <= status && status < 500) {
            this.notificationService.showWarning(message);
          } else {
            this.notificationService.showError(message);
          }
        }
      }
    );
  }

  newScan() {
    this.showNextScanButton = false;
    this.ticketInfo = undefined;
    this.toggleCamera$.next(true);
  }

  protected readonly formatDate = formatDate;
  protected readonly window = window;
}
