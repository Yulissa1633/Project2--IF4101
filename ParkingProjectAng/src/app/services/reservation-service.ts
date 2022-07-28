import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

const endpoint = 'http://localhost:8081/api/';
const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { 



  }

  get(): Observable<any> {

    return this.http.get(endpoint + 'reservation/reservations').pipe(catchError(this.handleError<any>('list reservations')));

  }

  delete(id: number): Observable<any> {
    return this.http.delete(endpoint+'reservation/delete/'+id,httpOptions)
    .pipe(
      catchError(this.handleError('deleteReservations'))
    );
  }

  add(reservations: any){
    return this.http.post(endpoint+'reservation/add', reservations, httpOptions)
  }

  getById(id:any): Observable<any> {
    return this.http.get(endpoint+'reservation/reservations'+id,httpOptions)
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  
  }


}