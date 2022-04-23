import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LesstionListService } from 'src/app/services/lession-list/lesstion-list.service';
import { LessionDetailState } from 'src/app/stores/general-layout/states';
import { CourseResponseModel } from 'src/app/stores/lession-list/models';
import { CourseDetailState } from 'src/app/stores/lession-list/states';
import { LessonListComponent } from '../lesson-list/lesson-list.component';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.scss'],
})
export class GeneralLayoutComponent implements OnInit, AfterViewInit {
  currentTab!: string;
  innerWidth!: number;
  lessonList!: ElementRef;
  check: any;
  videoId!: string;
  complete!: any;
  detailLession!: any;
  sectionFirstHashCode!: any;
  currentLession: number = 0;
  currentHashCodeLession: string = '';
  titleCourses!: string;
  videoVariable: boolean = false;
  titleLessionScroll!: string;
  durationCurrent!: any;
  durationCurrentTime!: any;
  durationTotal!: any;
  durationTotalTime!: any;

  @ViewChild('player') videoCurrent!: YouTubePlayer;
  @ViewChild('lessionList') lessionList!: LessonListComponent;
  @Select(LessionDetailState.getLinkVideo) getLinkVideo$!: Observable<any>;
  @Select(CourseDetailState.getSection)
  section$!: Observable<CourseResponseModel>;

  constructor(private _lessionService: LesstionListService) {}

  ngOnInit(): void {
    this.section$.subscribe((courses: any) => {
      if (courses.data) {
        console.log(courses.data);
        this.currentHashCodeLession =
          courses?.data?.sections[0]?.lessions[0].hashCode;
        this.titleCourses = courses.data.title;
        this.titleLessionScroll =
          courses?.data?.sections[0]?.lessions[0]?.title;
        this.videoCurrent.height = 532;
        this.videoCurrent.width = 920;
      }
      this.videoId =
        courses?.data?.sections[0]?.lessions[0]?.link.split('/')[4];
      this.sectionFirstHashCode = courses?.data?.sections[0]?.hashCode;
    });

    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1024) this.currentTab = 'content';
    if (this.innerWidth >= 1024) this.currentTab = 'overview';
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.durationCurrent = Math.floor(this.videoCurrent.getCurrentTime());
      this.durationCurrentTime = this._lessionService.convertHMS(
        this.durationCurrent
      );
      this.durationTotal = this.videoCurrent.getDuration();
      this.durationTotalTime = this._lessionService.convertHMS(
        this.durationTotal
      );
      if (
        (this.videoCurrent.getCurrentTime() / this.videoCurrent.getDuration()) *
          100 >
        90
      ) {
        this._lessionService
          .getQuizzDetail(this.sectionFirstHashCode)
          .subscribe((data) => {
            this._lessionService
              .updateLession(data.data[this.currentLession])
              .subscribe((data: any) => {
                if (
                  data.statusCode === 200 &&
                  this.lessionList.videoComplete === false
                ) {
                  this.lessionList.totalLessionComplete += 1;
                  this.lessionList.lessionProgressCompleted =
                    (
                      (this.lessionList.totalLessionComplete /
                        this.lessionList.totalLession) *
                      100
                    ).toFixed() + '%';
                  this.lessionList.lessionProgressCompletedNow = (
                    (this.lessionList.totalLessionComplete /
                      this.lessionList.totalLession) *
                    100
                  ).toFixed();
                  this.lessionList.videoComplete = true;
                }
              });
          });
      }
    }, 1000);
  }

  getLinkLessionCurrent(data: any) {
    this.titleLessionScroll = data.titleLessionCurrent;
    this.videoId = data.link.split('/')[4];
    this.sectionFirstHashCode = data.section.hashCode;
    this.currentLession = data.currentLession;
    this.currentHashCodeLession =
      data.section.lessions[this.currentLession].hashCode;
  }

  // @HostListener('document:scroll')
  // scrollFunction() {
  //   if (
  //     document.body.scrollTop > 300 ||
  //     document.documentElement.scrollTop > 300
  //   ) {
  //     this.videoVariable = true;
  //     this.videoCurrent.height = 202;
  //     this.videoCurrent.width = 355;
  //   } else {
  //     this.videoVariable = false;
  //     this.videoCurrent.height = 532;
  //     this.videoCurrent.width = 920;
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1024) {
      this.currentTab = 'content';
      this.lessonList.nativeElement.style.display = 'block';
    }
    if (this.innerWidth >= 1024) {
      this.currentTab = 'overview';
    }
  }

  onChangeTab(tab: string) {
    this.currentTab = tab;
    if (this.innerWidth < 1024) {
      if (this.currentTab === 'content')
        this.lessonList.nativeElement.style.display = 'block';
      if (this.currentTab !== 'content')
        this.lessonList.nativeElement.style.display = 'none';
    }
  }

  handlePauseVideo() {
    this.videoCurrent.pauseVideo();
  }

  handlePlayVideo() {
    this.videoCurrent.playVideo();
  }

  handleSetVideoProg(currentTime: number) {
    this.videoCurrent.seekTo(currentTime, true);
  }
}
