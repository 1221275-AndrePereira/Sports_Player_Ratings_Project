import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Team, TeamFilter } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})

export class FootballPlayerService {
    private apiUrl = 'https://localhost:7096/api/teams';

    constructor(private http: HttpClient) { }

    //============================================================================

    getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
    }

    getTeamsByFilter(filter: TeamFilter): Observable<TeamFilter[]> {
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
      return this.http.get<Team[]>(url, { params })
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
            errorMessage = 'Team not found';
            break;
          case 409:
            errorMessage = 'Conflict - team with this name may already exist';
            break;
          case 500:
            errorMessage = 'Internal server error - please try again later';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }

      console.error('TeamService Error:', error);
      return throwError(() => new Error(errorMessage));
    }

  

}