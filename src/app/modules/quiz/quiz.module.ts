import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { BackbuttonDirective } from 'src/app/directives/goback/backbutton.directive';

@NgModule({
  declarations: [QuizComponent, BackbuttonDirective],
  imports: [CommonModule, QuizRoutingModule],
  exports: [QuizComponent],
})
export class QuizModule {}
