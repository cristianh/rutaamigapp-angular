import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  // Object that will contain each of the points of the route.
  dataPointsBus = {
    type: 'FeatureCollection',
    features: []
  }

  marker;

  // Variables Mapbox_gl configuration
  private map: mapboxgl.Map;
  private style = 'mapbox://styles/mapbox/streets-v11';

  // Variables  configuration Lat y log distance intro punto
  public to; //lng, lat
  public from; //lng, lat 

  //VARIABLES DE LA RUTA
  public velocidad;
  public distanciaPoint;

  private opcionesRuta = []

  private tiempoGeo;

  private point = 0;
  private pointBus;
  private popup;
  private popupText;

  // Configure the API geolocation options.
  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor() { }
  /* PROBANDO*/
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: any) => {

        this.loadMap(parseFloat(pos.coords.latitude), parseFloat(pos.coords.longitude))
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        }
      }, this.options);
    } else {
      console.log("Your browser doesn't support geolocation.")
    }
  }

  loadMap = (lat, lng) => {

    this.from = [lng, lat]

    mapboxgl as typeof mapboxgl;

    this.map = new mapboxgl.Map({
      accessToken: "pk.eyJ1IjoiY3J1c3RvMjAyMiIsImEiOiJjbDg3c3lmaTExNmg4M3BubGhyMThvMmhsIn0.AhcG868gRKbP-zDiccuMdA",
      container: 'map', // container ID
      style: this.style, // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 14, // starting zoom
      /*  projection: 'globe' */ // display the map as a 3D globe
    });
    this.map.on('style.load', () => {
      this.map.setFog({}); // Set the default atmosphere style
    });

    this.map.on('load', async () => {

      const response = await this.loadPointTest()





      //VALIDAMOS QUE EL MAPA ESTE COMPLETAMENTE CARGADO
      /* this.map.once('idle', () => { */


      //Posicion actual usuario.
      //createMarket(lat, lng,this.map)

      this.marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(this.map);




      //CREAMOS EL DIV QUE CONTIENE EL POPUP
      const el = document.createElement('div');

      el.style.width = "42px"
      el.style.height = "42px"
      el.style.backgroundImage = "url('../../../assets/iconbus.svg')"
      el.style.backgroundSize = "cover"
      el.style.borderRadius = "50%"
      el.style.cursor = "pointer"
      el.id = "popmarketbus"
      el.className = 'marker';

      this.popupText = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(this.dataPointsBus.features[0].geometry.coordinates)
        .setHTML(`<div><h3>${this.dataPointsBus.features[0].properties.title}</h3><br>Dirección:<span>${this.dataPointsBus.features[0].properties.description}</span><br><span>Velocidad: ${this.velocidad}</span></div>`)
        .addTo(this.map);

      // We load the point of the bus on the map with the corridors
      console.log("coordenadas", this.dataPointsBus.features[0].geometry.coordinates)
      this.pointBus = new mapboxgl.Marker(el).setLngLat(this.dataPointsBus.features[0].geometry.coordinates)
        .addTo(this.map)
        .setPopup(this.popupText);

      this.velocidad = this.dataPointsBus.features[0].properties.velocidad;



      // add popups
      /* this.pointBus.setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            this.popupText
        )
      ) */





      this.map.flyTo({
        center: [this.dataPointsBus.features[0].geometry.coordinates[0], this.dataPointsBus.features[0].geometry.coordinates[1]],
        speed: 0.5
      });

      this.animation(this.map, this.point, this.pointBus)
      console.log('Finish carga map')

      //})

    })



    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());


  }

  animation(map, point, pointMarket) {
    this.tiempoGeo = setInterval(() => {
      // We load the bus popup.



      //caramos el popup del bus.
      let popup = document.getElementById('popmarketbus')




      this.velocidad = Math.round(this.dataPointsBus.features[point].properties.velocidad * 3.6)

      /* if (this.dataPointsBus.features[point].properties.velocidad !== null || this.dataPointsBus.features[point].properties.velocidad !== undefined) {
        this.popupText = `<div><h3>${this.dataPointsBus.features[point].properties.title}</h3><span>${this.dataPointsBus.features[point].properties.description}</span><br><span>Velocidad: ${this.velocidad}</span></div>`
      } */

      // units can be degrees, radians, miles, or kilometers, just be sure to change the units in the text box to match. 
      let options: any = {
        units: 'kilometers'
      };


      this.to = [this.dataPointsBus.features[point].geometry.coordinates[0], this.dataPointsBus.features[point].geometry.coordinates[1]]

      let distance = turf.distance(this.to, this.from, options);
      distance = distance * 1000

      this.distanciaPoint = `<br><span>Distancia: ${Math.round(distance)} m</span>`

      //MOSTRAMOS EL MENSAJE ACTUALIZADO.
      if (popup == null) {

      } else {
        if (this.dataPointsBus.features[point].properties.velocidad !== null || this.dataPointsBus.features[point].properties.velocidad !== undefined) {
          this.popupText.setHTML(`<div><h3>${this.dataPointsBus.features[point].properties.title}</h3><br>Dirección:<span>${this.dataPointsBus.features[point].properties.description}</span><br><span>Velocidad: ${this.velocidad} Km/h</span><span>${this.distanciaPoint}</span></div>`)
        }
      }

      console.log(popup.innerHTML)
      // make a marker for each feature and add to the map
      pointMarket.setLngLat(this.dataPointsBus.features[point].geometry.coordinates)
        .addTo(map);
      map.flyTo({
        center: [this.dataPointsBus.features[point].geometry.coordinates[0], this.dataPointsBus.features[point].geometry.coordinates[1]],
        speed: 0.5
      });
      point = point + 1

      if ((this.dataPointsBus.features.length - 1) == point) {
        this.dataPointsBus.features.reverse()
        this.point = 0
      }

    }, 500)
  }

  async loadPointTest(ruta = 'Rutatrabajo') {

    if (this.tiempoGeo) {
      //clearInterval(tiempoGeo)
      this.dataPointsBus = {
        type: 'FeatureCollection',
        features: []
      }
      this.point = 0

    }

    // Make a GET request to the API and return the location of the ISS.
    /* try {
      await fetch(`https://amigaapp-f2f93-default-rtdb.firebaseio.com/dbrutas/${ruta}.json`)
        .then((resp) => resp.json())
        .then((data) => {

          let dataPoints = Object.values(data)
          console.log(dataPoints)
          type Coordenanpoints = {
            Latitude?: number;
            Longitude?: number;
            Speed?: number
          }

          dataPoints.forEach((coordenadas: Coordenanpoints) => {

            const { Latitude, Longitude, Speed } = coordenadas

            this.dataPointsBus.features.push(
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [Longitude, Latitude]
                },
                properties: {
                  title: 'Ruta 18',
                  description: 'Norte/Sur',
                  velocidad: Speed == undefined ? '0' : Speed
                }
              }
            )
          });

        })
    } catch (err) { */
      // If the updateSource interval is defined, clear the interval to stop updating the source.
      //if (updateSource) clearInterval(updateSource);
     /*  throw new Error(err);
    } */
  }

}
