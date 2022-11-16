import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Rating } from './rating.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RatingService {

    private resourceUrl = '/ratingmicroservice/api/ratings';

    constructor(private http: Http) { }

    create(rating: Rating): Observable<Rating> {
        const copy = this.convert(rating);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rating: Rating): Observable<Rating> {
        const copy = this.convert(rating);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Rating> {
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
     * Convert a returned JSON object to Rating.
     */
    private convertItemFromServer(json: any): Rating {
        const entity: Rating = Object.assign(new Rating(), json);
        return entity;
    }

    /**
     * Convert a Rating to a JSON which can be sent to the server.
     */
    private convert(rating: Rating): Rating {
        const copy: Rating = Object.assign({}, rating);
        return copy;
    }
}
