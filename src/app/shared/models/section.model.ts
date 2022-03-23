import { Lesson } from './lesson.model';

export interface Section {
  description: string;
  hashCode: string;
  lessions: Lesson[];
  priority: number;
  title: string;
}
