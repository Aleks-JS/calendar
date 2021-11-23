import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MetaWeatherService {

  constructor(private http: HttpClient) {
  }

  getWeather(): Observable<unknown> {
    const params = new HttpParams({
      fromObject: {
        query: 'london'
      }
    });
    return this.http.get<unknown>(`${baseUrl}/weather/api/location/search/`, {params});
  }
}
