import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class ApiService {
  private baseUrl = "https://localhost:7096/api";    
  
  private httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
  };    

  constructor(private http: HttpClient) {}

    get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {

    let errorMessage = "Something went wrong.";

    if (error.error instanceof ErrorEvent) {

    // A client-side or network error occurred.
        errorMessage = `Error: ${error.error.message}`;
    } else {

    // The backend returned an unsuccessful response code.
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);

  }
}