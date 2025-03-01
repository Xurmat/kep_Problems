import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolveDialog, SolveDialogRequest } from '../../interface/solveDialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolveDialogService {

   private baseUrl = 'https://kep.uz/api/problems';
  
    constructor(private http: HttpClient) { }
  
    getSolveDialogs(request: SolveDialogRequest): Observable<{ items: SolveDialog[], total: number }> {
      const { first, rows, sortField, sortOrder, filter } = request;
      const page = (first / rows) + 1;
      let urlParams = `_page=${page}&_limit=${rows}`;
      if (sortField) {
        urlParams += `&_sort=${sortField}&_order=${sortOrder === 1 ? 'asc' : 'desc'}`;
      }
    
      if (filter && filter.firstName) {
        urlParams += `&firstName_like=${filter.firstName}`;
      }
    
      return this.http.get<{ items: SolveDialog[], total: number }>(`${this.baseUrl}?${urlParams}`).pipe(
        catchError(error => {
          console.error('API Error:', error);
          return throwError(() => new Error('Ma\'lumotlarni yuklashda xatolik yuz berdi.'));
        })
      );
    }
}
