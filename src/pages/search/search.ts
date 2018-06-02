import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, Marker, CameraPosition, LatLng, GoogleMapsEvent, MarkerOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';

/*
 * Generated class for the SearchPage page.
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild('map') mapElement: ElementRef;
  map:GoogleMap;

  latitude:any;
  longitude:any;
  river:any;
  posts: any;
  netResponse: any;
  watchID: any;
  current_level: any[];
  velocity: any[];

  constructor(public navCtrl: NavController,public network: NetworkEngineProvider , public navParams: NavParams, private _googleMaps: GoogleMaps, public geo: Geolocation, public http:Http) {
    this.latitude = 7.1;
    this.longitude = 79.8;
  }

  ngAfterViewInit(){
    let loc: LatLng;
    this.initMap();
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.getLocation().then( res => {
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
        console.log(res.coords.latitude)
        console.log(res.coords.longitude)
        loc = new LatLng(res.coords.latitude, res.coords.longitude);
        this.moveCamera(loc);
        this.createMarker(loc, "Me");
      }).catch(err => {
        console.log(err);
      });
    });
    
  }

  initMap(){
    let element =this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element)
    //this.map = GoogleMaps.create(element);
  }

  getLocation(){
    return this.geo.getCurrentPosition();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  moveCamera(loc:LatLng){
    let options: CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this.map.moveCamera(options)
  }


  createMarker(loc: LatLng, title: string){
    // let markerOptions: MarkerOptions ={
    //   position: loc,
    //   draggable: true,
    //   title: title
    // };
    // return this.map.addMarker(markerOptions).then(marker => {
    //   marker.on(GoogleMapsEvent.MARKER_DRAG_END)
    //     .subscribe(() => {
          
    //       this.markerlatlong = marker.getPosition();

    //       localStorage.setItem("latt1",this.markerlatlong.lat);
    //       localStorage.setItem("long1",this.markerlatlong.lng);

    //       this.http.get('API URL').map(res => res.json()).subscribe(data => {
    //         console.log(data);
    //       });
           
    //     });
    // });

    this.map.addMarker({
      title: title,
      icon: 'blue',
      animation: 'DROP',
      draggable:true,
      position: loc
    })
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(data => {
          
          //this.markerlatlong = marker.getPosition();

          this.latitude = marker.getPosition().lat;
          this.longitude = marker.getPosition().lng;

         

          // this.http.get('API URL').map(res => res.json()).subscribe(data => {
          //   console.log(data);
          // });
           
        })
    });
  }

  showSelectValue(SelectedValue){ 
    this.river = SelectedValue; 
    this.startGeo();
  }

  startGeo(){
    let geoOption = {enableHighAccuracy : true};
    try{
      this.watchID = this.geo.watchPosition(geoOption).subscribe(data => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
      })

    } catch(err){
      alert("Error "+ err);
    }
  }

  SearchData(){
    let p : Promise<any>;
    p = this.network.callGet(this.river, this.latitude, this.longitude);
    p.then(data => {
      console.log("Recieved: "+JSON.stringify(data));
      this.parseJson(data);
      //this.netResponse = JSON.stringify(data.json.args()); 
    })
    
  //   this.http.get("http://flood.codechilli.lk/api/nodes/"+ river +"/"+this.latitude+"/"+this.longitude).map(res => res.json()).subscribe(data => {
  //     this.posts = data.data.children;
  // });
  }

  parseJson(data){
    this.current_level = [];
    this.velocity= [];
    this.current_level.push(data.current_level);
    this.velocity.push(data.velocity);
    console.log(this.velocity);
    console.log(this.current_level);
  }

  
  
  

}


