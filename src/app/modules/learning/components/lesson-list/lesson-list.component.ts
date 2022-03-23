import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LesstionListService } from 'src/app/services/lession-list/lesstion-list.service';
import { GetLessionDetailVideo } from 'src/app/stores/general-layout/actions';
import { GetSection } from 'src/app/stores/lession-list/actions';
import { CourseResponseModel, SectionModel } from 'src/app/stores/lession-list/models';
import { CourseDetailState } from 'src/app/stores/lession-list/states';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  coursesHashCode!: any;
  coursesDetail!: CourseResponseModel;
  hashCodeQuiz!: string;
  lessionsList!: any;
  totalLession: number = 0;
  totalLessionComplete: number = 0;
  lessionProgressCompleted!: string;
  lessionProgressCompletedNow!: string;
  listLessionComplete: Array<number> = [];
  videoComplete: boolean = false;
  @Select(CourseDetailState.getSection) section$!: Observable<CourseResponseModel>;
  @Output() sendLinkToGeneral = new EventEmitter();

  constructor(private _store: Store, 
              private _route: ActivatedRoute, 
              private _routers: Router,
              private _lessionService: LesstionListService
              ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.coursesHashCode = params['hashCode'];
      this._store.dispatch(new GetSection(params['hashCode']));
    });
    this.section$.subscribe(data => {
      this.coursesDetail = data;
      this.countTotalLession(data.data?.sections)
      data.data?.sections?.forEach(data => {
        let lessionComplete = this.filterLessionComplete(data.lessions);
        this.listLessionComplete.push(lessionComplete);
      })
    });
  }

  countTotalLession(data: any) {
    for (const section in data) {
      this._lessionService.getQuizzDetail(data[section].hashCode).subscribe(data => {
        this.totalLession = this.totalLession + data.data.length;
        for (let lession of data.data) {
          if(lession.status === 2) {
            this.totalLessionComplete += 1;
          }
        }
        this.lessionProgressCompleted = ((this.totalLessionComplete / this.totalLession) * 100).toFixed() + '%';
        this.lessionProgressCompletedNow = ((this.totalLessionComplete / this.totalLession) * 100).toFixed();
      })
    }
  }

  filterLessionComplete(arr: any) {
    return arr.filter((item: any) => {
      return item.status === 2;
    }).length;
  }

  countTotalTimeLession(arr: any) {
    let totalLessionFinal = 0;
    let totalTimeRender: any;
    arr.forEach((item : any) => {
      let arrSplit = item.duration.split(':');
      let hours = (parseInt(arrSplit[0]) * 3600);
      let minutes = (parseInt(arrSplit[1]) * 60);
      let seconds = parseInt(arrSplit[2]);
      let totalSeconds = hours + minutes + seconds;
      totalLessionFinal += totalSeconds;
      return totalTimeRender = this._lessionService.convertHMS(totalLessionFinal);
    });
    return totalTimeRender
  }

  getLessionLink(section: any, link: string, currentLession: number, currentSection: number, titleLessionCurrent: string) {
    this.videoComplete = false;
    this.sendLinkToGeneral.emit({section, link, currentLession, titleLessionCurrent});

    this._lessionService.getSection(this.coursesHashCode).subscribe((data: any) => {
      this.filterLessionComplete(data?.data?.sections[currentSection]?.lessions);
      this.listLessionComplete[currentSection] = this.filterLessionComplete(data?.data?.sections[currentSection]?.lessions);
    })
  }

  getQuizzDetail(section : any) {
    this._lessionService.getQuizzDetail(section).subscribe(data => {
      this.lessionsList = data.data;
    });
  }

  goQuiz(hashCode: any, id: any) {
    this._lessionService.getHashCodeQuiz(hashCode).subscribe(data => {
      this._routers.navigate(
        ['/quiz'],
        { queryParams: { hashCodeLession: hashCode, hashCodeQuiz: data.data[id].hashCode}}
      );
    })
  }
}