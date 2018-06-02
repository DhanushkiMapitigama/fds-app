import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the NetworkEngineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkEngineProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NetworkEngineProvider Provider');
  }

  callGet(river, lati, long): Promise <any>
  {

    let response: Promise<any>;
    console.log("river"+ river);
    console.log("lati" + lati);
    console.log("long" + long);
    let url = "https://flood.codechilli.lk/api/nodes/"+river+"/"+lati+"/"+long;
    response = this.http.get(url).toPromise().then(responseData => responseData);

    return response;
}

}
