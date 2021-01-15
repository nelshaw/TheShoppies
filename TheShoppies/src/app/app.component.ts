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
  moviesList : Movie[] = [];
  searchText : String;
  nominationList : Movie[] = [];
  public displayAlert = false;
  public maxNom = false;
  public disabled = true;

  constructor(private apiService: OmdbApiService) {
    
  }

  ngOnInit(){
  }

  getMovies(){

    this.moviesList = [];
    
    console.log("Searching for movie containing " + this.searchText);
    
    this.apiService.getMovies(this.searchText).subscribe(
      data => {
        console.log(data);

        data.Search.forEach(movie => {
          let newMovie: Movie = {
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            isDisabled: false
          };

          this.moviesList.push(newMovie);
          console.log("added new movie " + newMovie);

        });

      }
    );

  }

  nominate(movie){
    console.log(this.nominationList.length);

    if(this.nominationList.length > 4) {
      this.maxNom = true;
      this.displayAlert = true;
      
      // timeout to remove alert after 3s
      setTimeout(function() {
        this.displayAlert = false;
      }.bind(this), 3000);

    }
    else {
      this.maxNom = false;
      console.log("Nominating movie:" + movie.Title);
      movie.isDisabled = true;
      this.nominationList.push(movie);
    }

  }

  remove(movie){

    console.log("Removing movie: " + movie.Title);

    this.nominationList.forEach((value, index) => {

      if(value == movie){
        this.nominationList.splice(index, 1); 
        movie.isDisabled = false;
        console.log("Removed movie: " + movie.Title);
        console.log(this.nominationList);
      }
    });

  }
}
