import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { FootballPlayer, FootballPlayerFilter } from '../models/football-player.model';

@Injectable({
  providedIn: 'root'
})

export class FootballPlayerService {
    private apiUrl = 'https://localhost:7096/api/football';

    constructor(private http: HttpClient) { }

    //============================================================================

    getAllFootballPlayers(): Observable<FootballPlayer[]> {
    return this.http.get<FootballPlayer[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
    }

    getFootballPlayersByGame(game: string): Observable<FootballPlayer[]> {
    return this.http.get<FootballPlayer[]>(`${this.apiUrl}/game/${game}`)
      .pipe(
        catchError(this.handleError)
      )
    }

    getFootballPlayersByFilter(filter: FootballPlayerFilter): Observable<FootballPlayerFilter[]> {
      let params = new HttpParams();
      
      if (filter) {
        Object.keys(filter).forEach(key => {
          const value = (filter as any)[key];
          if (value === null || value === undefined || value === '') return;

          if (Array.isArray(value)) {
            value.forEach(v => {
              if (v !== null && v !== undefined && v !== '') {
                params = params.append(key, v.toString());
              }
            });
          } else {
            params = params.set(key, value.toString());
          }
        });
      }

      const url = `${this.apiUrl}/search`;
      return this.http.get<FootballPlayer[]>(url, { params })
        .pipe(
          catchError(this.handleError)
        );
    }

    //============================================================================


    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An unknown error occurred';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Backend returned unsuccessful response code
        switch (error.status) {
          case 400:
            errorMessage = 'Bad request - please check your input';
            break;
          case 401:
            errorMessage = 'Unauthorized - please log in';
            break;
          case 403:
            errorMessage = 'Forbidden - insufficient permissions';
            break;
          case 404:
            errorMessage = 'Football player not found';
            break;
          case 409:
            errorMessage = 'Conflict - football player with this name may already exist';
            break;
          case 500:
            errorMessage = 'Internal server error - please try again later';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }

      console.error('FootballPlayerService Error:', error);
      return throwError(() => new Error(errorMessage));
    }

  

}