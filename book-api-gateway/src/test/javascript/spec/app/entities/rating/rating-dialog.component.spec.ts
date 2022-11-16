/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BookapigatewayTestModule } from '../../../test.module';
import { RatingDialogComponent } from '../../../../../../main/webapp/app/entities/rating/rating-dialog.component';
import { RatingService } from '../../../../../../main/webapp/app/entities/rating/rating.service';
import { Rating } from '../../../../../../main/webapp/app/entities/rating/rating.model';

describe('Component Tests', () => {

    describe('Rating Management Dialog Component', () => {
        let comp: RatingDialogComponent;
        let fixture: ComponentFixture<RatingDialogComponent>;
        let service: RatingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [RatingDialogComponent],
                providers: [
                    RatingService
                ]
            })
            .overrideTemplate(RatingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Rating(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rating = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ratingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Rating();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rating = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ratingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
