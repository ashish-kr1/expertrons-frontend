import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Services {
    constructor(private http: HttpClient) { }
    header() {
        return new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }
    addMentor(data): Observable<any> {
        return this.http.post(`${environment.API}/addMentor`, data, { headers: this.header() });
    }
    getMentors(): Observable<any> {
        return this.http.get(`${environment.API}/getMentors`, { headers: this.header() });
    }
    updateMentor(data): Observable<any> {
        return this.http.put(`${environment.API}/updateMentor`, data, { headers: this.header() });
    }
    deleteMentor(id): Observable<any> {
        return this.http.delete(`${environment.API}/deleteMentor/${id}`, { headers: this.header() });
    }
    addTask(data): Observable<any> {
        return this.http.post(`${environment.API}/addTask`, data, { headers: this.header() });
    }
    getTask(id): Observable<any> {
        return this.http.get(`${environment.API}/getTask/${id}`, { headers: this.header() });
    }

}