import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) {

  }

  private URL_SERVICE = "http://localhost:8888/";

  public sendGetRequest(endPoint: string) {
    return this.httpClient.get(this.URL_SERVICE + endPoint);
  }

  public sendPostRequest(endPoint: string, par: any){
    let options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    return this.httpClient.post(this.URL_SERVICE + endPoint, par, options);
  }
}
