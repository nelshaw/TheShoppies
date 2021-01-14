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
  searchText : String;
  nominationList : Movie[] = [];

  constructor(private apiService: OmdbApiService) {
    
  }

  ngOnInit(){
  }

  getMovies(){
    
    console.log("Searching for movie containing " + this.searchText);
    
    this.apiService.getMovies(this.searchText).subscribe(
      data => {
        console.log(data);
        this.moviesList = data.Search;
      }
    );

  }

  nominate(movie){

    console.log("Nominating movie:" + movie.Title);
    this.nominationList.push(movie);

  }

  remove(movie){

    console.log("Removing movie: " + movie.Title);

    this.nominationList.forEach((value, index) => {

      if(value == movie){
        this.nominationList.splice(index, 1); 
        console.log("Removed movie: " + movie.Title);
        console.log(this.nominationList);
      }
    });

  }
}
