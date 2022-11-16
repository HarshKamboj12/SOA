/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BookapigatewayTestModule } from '../../../test.module';
import { RatingDetailComponent } from '../../../../../../main/webapp/app/entities/rating/rating-detail.component';
import { RatingService } from '../../../../../../main/webapp/app/entities/rating/rating.service';
import { Rating } from '../../../../../../main/webapp/app/entities/rating/rating.model';

describe('Component Tests', () => {

    describe('Rating Management Detail Component', () => {
        let comp: RatingDetailComponent;
        let fixture: ComponentFixture<RatingDetailComponent>;
        let service: RatingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [RatingDetailComponent],
                providers: [
                    RatingService
                ]
            })
            .overrideTemplate(RatingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Rating(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rating).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
