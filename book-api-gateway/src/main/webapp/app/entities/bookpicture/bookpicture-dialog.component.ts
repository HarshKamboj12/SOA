import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Bookpicture } from './bookpicture.model';
import { BookpicturePopupService } from './bookpicture-popup.service';
import { BookpictureService } from './bookpicture.service';

@Component({
    selector: 'jhi-bookpicture-dialog',
    templateUrl: './bookpicture-dialog.component.html'
})
export class BookpictureDialogComponent implements OnInit {

    bookpicture: Bookpicture;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private bookpictureService: BookpictureService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.bookpicture, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bookpicture.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bookpictureService.update(this.bookpicture));
        } else {
            this.subscribeToSaveResponse(
                this.bookpictureService.create(this.bookpicture));
        }
    }

    private subscribeToSaveResponse(result: Observable<Bookpicture>) {
        result.subscribe((res: Bookpicture) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Bookpicture) {
        this.eventManager.broadcast({ name: 'bookpictureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bookpicture-popup',
    template: ''
})
export class BookpicturePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookpicturePopupService: BookpicturePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bookpicturePopupService
                    .open(BookpictureDialogComponent as Component, params['id']);
            } else {
                this.bookpicturePopupService
                    .open(BookpictureDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
