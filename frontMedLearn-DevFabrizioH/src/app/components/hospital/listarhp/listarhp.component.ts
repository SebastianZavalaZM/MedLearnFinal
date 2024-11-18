/// <reference types="@types/google.maps" />

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/Hospital';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-listarhp',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listarhp.component.html',
  styleUrl: './listarhp.component.css'
})
export class ListarhpComponent implements OnInit{

  datasource: Hospital[]=[];
  private AdvancedMarkerElement: any;
  private map!: google.maps.Map; // "!" evita que se identifique como null en algun momento porque si no sale error
  private currentMarker: any = null;
  constructor(private hS: HospitalService) {}

  async ngOnInit() {
    await this.initMap();
    this.hS.list().subscribe((data) => {
      this.datasource = data;
    });
    this.hS.getList().subscribe((data) => {
      this.datasource = data;
    });
  }

  async initMap(): Promise<void> {
    const loader = new Loader({
      apiKey: 'AIzaSyBZh2cyhd2ssPB8mLAGJ_3VGQxBB_Bcbpw',
      version: 'weekly',
    });

    try {
      // Usa importLibrary para cargar la biblioteca de mapas
      const { Map } = await loader.importLibrary("maps");
      this.map = new Map(document.getElementById("map") as HTMLElement,{
        center: { lat: -12.0874459, lng: -77.0525224 },
        zoom: 17,
        mapId: 'ccf6582ae4f960d4'
      });
      // Importa la biblioteca de marcadores avanzados
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");
      this.AdvancedMarkerElement = AdvancedMarkerElement;
      console.log('Map initialized:', this.map);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  }

  onCardClick(hospital: Hospital) {
    console.log('Card clicked:', hospital);
    if (this.map) {
      this.addMarker(this.map, hospital);
    }
  }

  addMarker(map: google.maps.Map, hospital: Hospital) {
    if (this.currentMarker) {
      this.currentMarker.map = null;
    }

    const marker = new this.AdvancedMarkerElement({
      map: map,
      position: { lat: hospital.latitudeHospital, lng: hospital.longitudeHospital },
      title: hospital.nameHospital,
    });

    this.currentMarker = marker;

    map.setCenter({ lat: hospital.latitudeHospital, lng: hospital.longitudeHospital });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.toLowerCase();
    this.hS.searchByName(filterValue).subscribe((data) => {
      this.datasource = data;
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.applyFilter((event.target as HTMLInputElement).value);
    }
  }

  clearFilter(input: HTMLInputElement) {
    input.value = '';
    this.applyFilter(' ');
  }
}
