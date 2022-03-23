import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetLessionDetailVideo } from './actions';

@Injectable()
@State<any>({
  name: 'lessionDetail',
  defaults: {},
})
export class LessionDetailState {
    @Action(GetLessionDetailVideo)
    getLessionDetailVideo({ setState }: StateContext<any>,
                    { payload }: GetLessionDetailVideo
        ) {
        setState(payload);
    }

    @Selector()
    static getLinkVideo(res: any) {
        return res;
        }
}