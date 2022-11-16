import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Bookpicture } from './bookpicture.model';
import { BookpictureService } from './bookpicture.service';

@Component({
    selector: 'jhi-bookpicture-detail',
    templateUrl: './bookpicture-detail.component.html'
})
export class BookpictureDetailComponent implements OnInit, OnDestroy {

    bookpicture: Bookpicture;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private bookpictureService: BookpictureService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBookpictures();
    }

    load(id) {
        this.bookpictureService.find(id).subscribe((bookpicture) => {
            this.bookpicture = bookpicture;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBookpictures() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bookpictureListModification',
            (response) => this.load(this.bookpicture.id)
        );
    }
}
