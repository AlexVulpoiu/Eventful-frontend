import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, scan, shareReplay, startWith} from "rxjs";
import {ZXingScannerComponent, ZXingScannerModule} from "@zxing/ngx-scanner";
import {BarcodeFormat} from "@zxing/library";
import {AsyncPipe, CommonModule, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
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
export class TicketScannerComponent {
  @ViewChild('scanner') scanner!: ZXingScannerComponent;

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

  // scanSuccess = this.scanSuccess$.pipe(
  //   map((result) => result),
  // ).subscribe(id => {
  //   if (id !== undefined && id !== null && id !== '') {
  //     console.log(id);
  //     this.router.navigate(['/events']);
  //   }
  // });
}
