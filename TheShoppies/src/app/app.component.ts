import { Component } from '@angular/core';
import { OmdbApiService } from './service/omdb-api.service';
import { Movie } from './model/movie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'The Shoppies';
  subtitle = 'Movie Awards for Entrepreneurs';
  moviesList: Movie[] = [];
  searchText: String = '';
  nominationList: Movie[] = [];
  public displayAlert = false;
  public maxNom = false;
  public disabled = true;

  constructor(private apiService: OmdbApiService,
    private modalService: NgbModal) { }

  ngOnInit() { }

  // Method to retrieve movies based on search 
  getMovies() {

    // Refresh movies list every time a search is made (avoid page long results and repetitive options)
    this.moviesList = [];

    console.log("Searching for movie containing " + this.searchText);

    // API call to search for movie title
    this.apiService.getMovies(this.searchText).subscribe(
      data => {

        // Create new movie object for each result -> important to enable the nominate button
        if (data.Search != null) {
          data.Search.forEach(movie => {
            let newMovie: Movie = {
              Title: movie.Title,
              Year: movie.Year,
              Poster: movie.Poster,
              isDisabled: false
            };

            this.moviesList.push(newMovie);
            console.log("Added new movie: " + newMovie);
          });
        }
      }
    );

  }

  // Method to nominate movies based on search results
  nominate(movie) {

    // Check if max nominations is true (4 since it is 0-indexed)
    if (this.nominationList.length > 4) {
      this.maxNom = true;
      // Display alert that max number of nominations has been reached
      this.displayAlert = true;

      // Timeout to remove alert after 5s
      setTimeout(function () {
        this.displayAlert = false;
      }.bind(this), 5000);

    }
    else {
      this.maxNom = false;
      console.log("Nominating movie: " + movie.Title);
      // Disable nomination button for movie
      movie.isDisabled = true;
      this.nominationList.push(movie);
    }

  }

  // Method to remove movie from nominated list
  remove(movie) {

    console.log("Removing movie: " + movie.Title);

    // Check to see if movie exists in nomination list
    if (this.nominationList != null) {
      this.nominationList.forEach((value, index) => {

        if (value == movie) {
          this.nominationList.splice(index, 1);
          // Enable nominate button again in order to re-add 
          movie.isDisabled = false;
          console.log("Removed movie: " + movie.Title);
        }
      });
    }

  }

  open(content) {
    this.modalService.open(content, {
      centered: true,
      scrollable: true
    });
  }
}
