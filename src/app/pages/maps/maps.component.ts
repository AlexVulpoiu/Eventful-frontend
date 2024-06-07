import {Component, OnInit} from '@angular/core';
import { environment } from "../../../environments/environment";
import {AsyncPipe} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit {
  safeMapsUrl: SafeResourceUrl = '';

  protected readonly environment = environment;

  constructor(private domSanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    const mapsApiKey = environment.MAPS_API_KEY;
    const location: string = 'Teatrul+National,+Bulevardul+Nicolae+Balcescu+2,Bucuresti';
    const url = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${location}`;
    this.safeMapsUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
