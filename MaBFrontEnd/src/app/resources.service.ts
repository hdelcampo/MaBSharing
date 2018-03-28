import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Movie } from './Movie';
import { Book } from './Book';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import { Resource } from './Resource';
import { Comment } from './Comment';

@Injectable()
export class ResourcesService {

  private resourcesUrl = 'http://192.168.98.3:10011/resources';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Search users whose name contains search term
   * @param term to search
   */
  searchResources(term: string): Observable<Movie[] | Book[]> {

    if (!term.trim()) {
      return of();
    }

    return this.http.post<any>(`${this.resourcesUrl}/search`, { term: term })
      .pipe(
        tap(json => {
          var movies = new Array<Movie>();
          json.movies.forEach(movie => {
            movies.push(Object.assign(new Movie, movie));
          });

          var books = new Array<Book>();
          json.books.forEach(book => {
            books.push(Object.assign(new Book, book));
          });

          var result: Array<Movie | Book> = [];
          result.concat(movies);
          result.concat(books);

          return result;
        }),
        catchError(error => {
          return of();
        })
      );
  }

  /**
   * Retrieves a book from the server.
   * @param id of the book.
   */
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.resourcesUrl}/book/${id}`).pipe(
      map(book => book["book"]),
      catchError(error => of({} as Book))
    )
  }

  /**
   * Retrieves a movie from the server.
   * @param id of the movie.
   */
  getMovie(id: number): Observable<Movie> {
    return this.http.get<Book>(`${this.resourcesUrl}/movie/${id}`).pipe(
      map(movie => movie["movie"]),
      catchError(error => of({} as Movie))
    )
  }

  /**
   * Gets the list of comments of a resource.
   * @param id of the resource.
   */
  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.resourcesUrl}/${id}/comments`).pipe(
      map(comments => comments["comments"]),
      catchError(error => of(['error']))
    )
  }

  /**
   * Posts a comment to a resource, returning the ID if successful, -1 otherwise.
   * @param id of the resource.
   * @param comment the comment to post.
   */
  postComment(id: number, comment: string): Observable<number> {
    return this.http.post<any>(`${this.resourcesUrl}/${id}/comments`, { comment: comment }).pipe(
      map(id => id),
      catchError(error => of(-1))
    )
  }

}
