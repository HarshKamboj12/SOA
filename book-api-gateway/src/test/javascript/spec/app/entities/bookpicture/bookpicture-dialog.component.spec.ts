/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BookapigatewayTestModule } from '../../../test.module';
import { BookpictureDialogComponent } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture-dialog.component';
import { BookpictureService } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.service';
import { Bookpicture } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.model';

describe('Component Tests', () => {

    describe('Bookpicture Management Dialog Component', () => {
        let comp: BookpictureDialogComponent;
        let fixture: ComponentFixture<BookpictureDialogComponent>;
        let service: BookpictureService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [BookpictureDialogComponent],
                providers: [
                    BookpictureService
                ]
            })
            .overrideTemplate(BookpictureDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookpictureDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookpictureService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Bookpicture(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bookpicture = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookpictureListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Bookpicture();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bookpicture = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookpictureListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
