import { CourseResponseModel } from "./models";

export class GetSection {
    static readonly type = '[Section List] Get Section';
    constructor(public payload: string) { }
  }

export class GetSectionSuccess {
    static readonly type = '[Section List] Get Section SuccessFull';
    constructor(public payload: CourseResponseModel) { }
    }


export class GetSectionFail {
    static readonly type = '[Section List] Get Section Fail';
    }