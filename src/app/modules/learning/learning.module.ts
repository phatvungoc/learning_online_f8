import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { GeneralLayoutComponent } from './components/general-layout/general-layout.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NoteComponent } from './components/note/note.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { RelatedComponent } from './components/related/related.component';
import { YouTubePlayerModule } from '@angular/youtube-player';



@NgModule({
  declarations: [
    GeneralLayoutComponent,
    OverviewComponent,
    NoteComponent,
    LessonListComponent,
    RelatedComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    YouTubePlayerModule
  ]
})
export class LearningModule { }
