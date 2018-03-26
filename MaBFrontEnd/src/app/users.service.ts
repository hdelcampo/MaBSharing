import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { tap, catchError, map } from 'rxjs/operators';
import { FriendshipRequest } from './FriendshipRequest';

@Injectable()
export class UsersService {

  private usersUrl = 'http://localhost:10011/user';
  private currentEmail = '';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Saves current user's email.
   * @param email of the current user.
   */
  saveCurrentUser(email: string) {
    this.currentEmail = email;
  }

  /**
   * Retrieves current user's email.
   */
  getCurrentUserEmail(): string {
    return this.currentEmail;
  }

  /**
   * Search users whose name contains search term.
   * @param term to search
   */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.post<User[]>(`${this.usersUrl}/search`, { term: term })
      .pipe(
        tap(user => user),
        catchError(error => of([]))
      );
  }

  /**
   * Retrieves an user from the server.
   * @param id of the user.
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`).pipe(
      map(user => user["user"]),
      catchError(error => of({} as User))
    )
  }

  /**
   * Retrieves current user from the server.
   */
  getCurrentUserFromServer(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/profile`).pipe(
      map(user => user["user"]),
      catchError(error => of({} as User))
    )
  }

  /**
   * Retrieves pending friendship requests for the logged user.
   */
  getFriendShipRequests(): Observable<FriendshipRequest[]> {
    return this.http.get<FriendshipRequest[]>(`${this.usersUrl}/friendship_requests`).pipe(
      map(response => {
        let requests: FriendshipRequest[] = [];
      
        for (let request of response["friendship_requests"]) {
          requests.push({
            authorId: +request["orig_author_id"],
            authorEmail: request["email"],
            creationDate: request["creation_date"]
          });
        }

        return requests;
      }),
      catchError(error => of([{authorId: -1} as FriendshipRequest]))
    );
  }

  /**
   * Creates a new friend request.
   * @param userId of the target user.
   */
  createFriendshipRequest(userId: number): Observable<number> {
    return this.http.post<number>(`${this.usersUrl}/friendship_requests/`, {dest_user_id: userId}).pipe(
      map(response => response["id"]),
      catchError(error => of(-1))
    );
  }

  /**
   * Accepts or refueses a friend request.
   * @param authorId id of the user who created the request.
   * @param accept true to accept, false to refuse.
   */
  dispatchFriendshipRequest(authorId: number, accept: boolean): Observable<number> {
    return this.http.patch<number>(`${this.usersUrl}/friendship_requests/${authorId}`, {accepted: accept}).pipe(
      map(response => response["id"]),
      catchError(error => of(-1))
    );
  }

}
