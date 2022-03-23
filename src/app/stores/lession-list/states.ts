import { Injectable } from '@angular/core';
import { LesstionListService } from 'src/app/services/lession-list/lesstion-list.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CourseResponseModel } from './models';
import { GetSection, GetSectionFail, GetSectionSuccess } from './actions';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
@State<CourseResponseModel>({
  name: 'sectionList',
  defaults: {},
})
export class CourseDetailState {
    constructor(private _lesstionService: LesstionListService) { }

    @Action(GetSection)
    getSection(
        { dispatch }: StateContext<CourseResponseModel>,
        { payload }: GetSection
    ) {
        return this._lesstionService.getSection(payload).pipe(
            tap((courses) => {
                if (courses) {
                  dispatch(new GetSectionSuccess(courses));
                } else {
                  dispatch(new GetSectionFail());
                }
              }),
            catchError((err) => err)
        );
    }

    @Action(GetSectionSuccess)
    getSectionSuccess({ setState }: StateContext<CourseResponseModel>,
                    { payload }: GetSectionSuccess
        ) {
        setState(payload);
    }

    @Selector()
    static getSection(res: CourseResponseModel) {
        return res;
        }
}