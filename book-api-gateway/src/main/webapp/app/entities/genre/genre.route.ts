import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GenreComponent } from './genre.component';
import { GenreDetailComponent } from './genre-detail.component';
import { GenrePopupComponent } from './genre-dialog.component';
import { GenreDeletePopupComponent } from './genre-delete-dialog.component';

@Injectable()
export class GenreResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const genreRoute: Routes = [
    {
        path: 'genre',
        component: GenreComponent,
        resolve: {
            'pagingParams': GenreResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'genre/:id',
        component: GenreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const genrePopupRoute: Routes = [
    {
        path: 'genre-new',
        component: GenrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genre/:id/edit',
        component: GenrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genre/:id/delete',
        component: GenreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
