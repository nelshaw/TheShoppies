import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  constructor(private client: HttpClient) { }

  // Method to cal GET request of OMdB API based on movie title
  getMovies(title): Observable<any> {
    // Allow search to include * in order to find movies that contain that title 
    let params = new HttpParams()
        .set('apikey', environment.apikey)
        .set('type', 'movie')
        .set('s', title + '*');

    console.log(environment.apiUrl);
    return this.client.get(environment.apiUrl, {
      params: params
    });
  }
}
