import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import markers from '../../assets/markers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [49.0275, 31.482778],
      zoom: 6,
    });
    const map = this.map;

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 6,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(map);

    const myIcon = L.icon({
      iconUrl: 'assets/images/marker.svg',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
    // popupAnchor: [0, -50],
    });

    function addMarker(
      location: [number, number],
      header: string,
      text: string,
      imgSrc: string,
      link: string
    ) {
      const marker = L.marker(location, { icon: myIcon }).addTo(map);

      marker.bindPopup(`
        <h3>${header}</h3>
        <p>${text}</p>
        <img src="${imgSrc}" width="100%" alt="${header}">
        <a href=${link} target="_blank">Подробнее</a>
    `, {keepInView : true, autoPanPadding: [20, 20]});
    }
    markers.forEach((marker) => {
      addMarker(marker.location, marker.header, marker.text, marker.imgSrc, marker.link);
    });
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
