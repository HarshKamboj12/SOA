import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Userpreference } from './userpreference.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserpreferenceService {

    private resourceUrl = '/userpreferencesmicroservice/api/userpreferences';

    constructor(private http: Http) { }

    create(userpreference: Userpreference): Observable<Userpreference> {
        const copy = this.convert(userpreference);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userpreference: Userpreference): Observable<Userpreference> {
        const copy = this.convert(userpreference);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Userpreference> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Userpreference.
     */
    private convertItemFromServer(json: any): Userpreference {
        const entity: Userpreference = Object.assign(new Userpreference(), json);
        return entity;
    }

    /**
     * Convert a Userpreference to a JSON which can be sent to the server.
     */
    private convert(userpreference: Userpreference): Userpreference {
        const copy: Userpreference = Object.assign({}, userpreference);
        return copy;
    }
}
