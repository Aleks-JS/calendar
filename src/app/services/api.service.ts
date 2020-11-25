import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { Event } from './../interfaces/event.interface';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    data$ = new BehaviorSubject([])

    data = this.httpClient.get('/api/all').subscribe(e => this.data$.next(e))

    obsData$ = this.data$.asObservable().pipe(
        map((val) => val.reduce((prev, current) => {
            const key = `${new Date(current.startDate).getDate()}.${new Date(current.startDate).getMonth()}.${new Date(current.startDate).getFullYear()}`;

            if (!prev[key]) {
                prev[key] = [current];
            } else {
                prev[key].push(current);
            }
            return prev;
        }, {}))
    );


    constructor(private httpClient: HttpClient) { }


    getData() {
        return this.obsData$
    }


    postData(event: Event) {

        const body = { startDate: event.startDate, endDate: event.endDate, text: event.text }
        this.httpClient.post('/api/events', body).subscribe(data => data)

        return this.data = this.httpClient.get('/api/all').subscribe(e => this.data$.next(e))

    }

    removeData(id: string) {
        this.httpClient.delete(`/api/${id}`, {
            params: new HttpParams().set('id', String(id))
        }).subscribe(e => e)
        return this.data = this.httpClient.get('/api/all').subscribe(e => this.data$.next(e))

    }
}