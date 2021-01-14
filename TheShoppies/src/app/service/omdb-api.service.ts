import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  constructor(private client: HttpClient) { }

  getMovies(title): Observable<any> {
    let params = new HttpParams()
        .set('apikey', environment.apikey)
        .set('type', 'movie')
        .set('s', title + '*');

    // todo : update with proper call
    return this.client.get('http://www.omdbapi.com/', {
      params: params
    });
  }
}
