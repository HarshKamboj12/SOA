/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BookapigatewayTestModule } from '../../../test.module';
import { RatingComponent } from '../../../../../../main/webapp/app/entities/rating/rating.component';
import { RatingService } from '../../../../../../main/webapp/app/entities/rating/rating.service';
import { Rating } from '../../../../../../main/webapp/app/entities/rating/rating.model';

describe('Component Tests', () => {

    describe('Rating Management Component', () => {
        let comp: RatingComponent;
        let fixture: ComponentFixture<RatingComponent>;
        let service: RatingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [RatingComponent],
                providers: [
                    RatingService
                ]
            })
            .overrideTemplate(RatingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Rating(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ratings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
