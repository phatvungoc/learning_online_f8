import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [QuizComponent],
  imports: [CommonModule, QuizRoutingModule],
  exports: [QuizComponent],
})
export class QuizModule {}
