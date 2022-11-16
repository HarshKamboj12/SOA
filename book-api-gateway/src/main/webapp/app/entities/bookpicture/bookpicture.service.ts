import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Bookpicture } from './bookpicture.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BookpictureService {

    private resourceUrl = '/bookpicturemicroservice/api/bookpictures';

    constructor(private http: Http) { }

    create(bookpicture: Bookpicture): Observable<Bookpicture> {
        const copy = this.convert(bookpicture);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bookpicture: Bookpicture): Observable<Bookpicture> {
        const copy = this.convert(bookpicture);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Bookpicture> {
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
     * Convert a returned JSON object to Bookpicture.
     */
    private convertItemFromServer(json: any): Bookpicture {
        const entity: Bookpicture = Object.assign(new Bookpicture(), json);
        return entity;
    }

    /**
     * Convert a Bookpicture to a JSON which can be sent to the server.
     */
    private convert(bookpicture: Bookpicture): Bookpicture {
        const copy: Bookpicture = Object.assign({}, bookpicture);
        return copy;
    }
}
