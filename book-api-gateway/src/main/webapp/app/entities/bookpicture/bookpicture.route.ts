import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BookpictureComponent } from './bookpicture.component';
import { BookpictureDetailComponent } from './bookpicture-detail.component';
import { BookpicturePopupComponent } from './bookpicture-dialog.component';
import { BookpictureDeletePopupComponent } from './bookpicture-delete-dialog.component';

@Injectable()
export class BookpictureResolvePagingParams implements Resolve<any> {

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

export const bookpictureRoute: Routes = [
    {
        path: 'bookpicture',
        component: BookpictureComponent,
        resolve: {
            'pagingParams': BookpictureResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookpictures'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bookpicture/:id',
        component: BookpictureDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookpictures'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookpicturePopupRoute: Routes = [
    {
        path: 'bookpicture-new',
        component: BookpicturePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookpictures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bookpicture/:id/edit',
        component: BookpicturePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookpictures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bookpicture/:id/delete',
        component: BookpictureDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookpictures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
