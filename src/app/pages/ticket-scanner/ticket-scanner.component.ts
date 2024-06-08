import {Component, Inject, LOCALE_ID, ViewChild} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, scan, shareReplay, startWith} from "rxjs";
import {ZXingScannerComponent, ZXingScannerModule} from "@zxing/ngx-scanner";
import {BarcodeFormat} from "@zxing/library";
import {AsyncPipe, CommonModule, formatDate, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {EventsService} from "../../services/events.service";
import {TicketDto} from "../../dto/tickets/ticket-dto";

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
export class TicketScannerComponent {
  @ViewChild('scanner') scanner!: ZXingScannerComponent;
  ticketInfo: TicketDto | undefined;
  startDate: Date = new Date();
  eventName: string = '';
  ticketId: string = '';
  showButton: boolean = false;
  showNextScanButton: boolean = false;

  constructor(private eventService: EventsService,
              @Inject(LOCALE_ID) public locale: string) {

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

  scanSuccess$ = new BehaviorSubject<string>('');

  scanError(error: Error) {
    console.error(error);
  }

  scanSuccess = this.scanSuccess$.pipe(
    map((result) => result),
  ).subscribe(id => {
    if (id !== undefined && id !== null && id !== '') {
      this.eventService.getTicketInfo(10, id)
        .subscribe(data => {
          this.ticketInfo = data;
          this.startDate = data.startDate;
          this.eventName = data.eventName;
          this.ticketId = data.externalId;
          this.showButton = true;
        });
      this.toggleCamera$.next(false);
    }
  });

  validateTicket() {
    this.eventService.validateTicket(10, this.ticketId).subscribe(
      () => {
        this.showButton = false;
        this.showNextScanButton = true;
      },
      error => {
        console.log(error);
      }
    )
  }

  newScan() {
    this.showNextScanButton = false;
    this.ticketInfo = undefined;
    this.toggleCamera$.next(true);
  }

  protected readonly formatDate = formatDate;
  protected readonly window = window;
}
