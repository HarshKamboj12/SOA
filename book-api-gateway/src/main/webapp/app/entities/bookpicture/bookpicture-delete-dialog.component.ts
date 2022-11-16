import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bookpicture } from './bookpicture.model';
import { BookpicturePopupService } from './bookpicture-popup.service';
import { BookpictureService } from './bookpicture.service';

@Component({
    selector: 'jhi-bookpicture-delete-dialog',
    templateUrl: './bookpicture-delete-dialog.component.html'
})
export class BookpictureDeleteDialogComponent {

    bookpicture: Bookpicture;

    constructor(
        private bookpictureService: BookpictureService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bookpictureService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bookpictureListModification',
                content: 'Deleted an bookpicture'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bookpicture-delete-popup',
    template: ''
})
export class BookpictureDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookpicturePopupService: BookpicturePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bookpicturePopupService
                .open(BookpictureDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
