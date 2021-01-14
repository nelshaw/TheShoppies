import { Component } from '@angular/core';
import { OmdbApiService } from './service/omdb-api.service';
import { Movie } from './model/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'The Shoppies';
  subtitle = 'Movie Awards for Entrepreneurs';
  moviesList : Movie[];
  word: String;

  constructor(private apiService: OmdbApiService) {
    
  }

  ngOnInit(){
  }

  getMovies(){
    console.log(this.word);
    this.apiService.getMovies(this.word).subscribe(
      data => {
        console.log(data);
        this.moviesList = data.Search;
      }
    );
  }

}
