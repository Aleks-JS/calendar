import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { Event } from './../interfaces/event.interface';

const baseUrl = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
})

export class ApiService {


    constructor(private httpClient: HttpClient) { }


    getData() {
        return this.httpClient.get<Array<any>>(`${baseUrl}/all`).pipe(
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
    }


    postData(event: Event) {

        const body = { startDate: event.startDate, endDate: event.endDate, text: event.text }
        return this.httpClient.post(`${baseUrl}/events`, body)
    }

    removeData(id: string) {
        console.log('delete', id)
        return this.httpClient.delete(`${baseUrl}/${id}`)
    }
}
