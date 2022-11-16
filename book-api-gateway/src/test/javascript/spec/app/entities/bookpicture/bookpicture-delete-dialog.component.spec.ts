/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BookapigatewayTestModule } from '../../../test.module';
import { BookpictureDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture-delete-dialog.component';
import { BookpictureService } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.service';

describe('Component Tests', () => {

    describe('Bookpicture Management Delete Component', () => {
        let comp: BookpictureDeleteDialogComponent;
        let fixture: ComponentFixture<BookpictureDeleteDialogComponent>;
        let service: BookpictureService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [BookpictureDeleteDialogComponent],
                providers: [
                    BookpictureService
                ]
            })
            .overrideTemplate(BookpictureDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookpictureDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookpictureService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
