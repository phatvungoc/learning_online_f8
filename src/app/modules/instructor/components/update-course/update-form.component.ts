import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';


@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  updateCourse: FormGroup;
  imageFile: File;
  isPayment!: boolean;
  fd = new FormData;
  instructorHashcode: string;
  isData: boolean;
  @Input() courseHashCode: string;
  @Input() index: number;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onUpdate = new EventEmitter<{index: number, title: string, image: string}>();
  constructor(
    private _http: HttpClient,
    private _course: CourseService,
    private _activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.instructorHashcode = this._activatedRoute.snapshot.queryParamMap.get('id');
    this._course.getCourseByHashcode(this.courseHashCode).subscribe({
      next: resp => {
        console.log(resp);
        this.isData = true;
        this.updateCourse = new FormGroup({
          title: new FormControl(resp.data.title,{
            validators: [
              Validators.required,
              Validators.pattern(''),
              Validators.maxLength(100)
            ]
          }),
          description: new FormControl(resp.data.description,{
            validators: [
              Validators.required,
              Validators.pattern(''),
              Validators.maxLength(100)
            ]
          }),
          image: new FormControl(null),
          level: new FormControl(resp.data.level),
          price: new FormControl(resp.data.price, {
            validators: [
              Validators.required,
              Validators.pattern('^[0-9][0-9]*$')
            ], 
            
          }),
          category: new FormControl('', {
            validators: [Validators.required]
          })
        })
        console.log(this.updateCourse);
        
      }
    })
  }

  get title() {
    return this.updateCourse.controls['title'];
  }
  get image() {
    return this.updateCourse.controls['image'];
  }
  get description() {
    return this.updateCourse.controls['description'];
  }
  get level() {
    return this.updateCourse.controls['level'];
  }
  get price() {
    return this.updateCourse.controls['price'];
  }
  get category() {
    return this.updateCourse.controls['category'];
  }

  onFileSelected($event: any) {
    this.imageFile = $event.target.files[0];
    console.log(this.imageFile);
    
  }
  onSubmit() {
    console.log(1);
    
    this.isPayment = (this.price.value > 0);
    this.fd.append('Title', this.title.value);
    this.fd.append('InstructorHashCode', this.instructorHashcode)
    this.fd.append('Image', this.imageFile, this.imageFile.name);
    this.fd.append('Description', this.description.value);
    this.fd.append('Level', this.level.value);
    this.fd.append('IsPayment', JSON.stringify(this.isPayment));
    this.fd.append('Price', this.price.value);
    this.fd.append('CategoryHashCode', this.category.value);

    this._http.put<any>(`https://localhost:5001/api/1.0/Course/updatecourse?hashCode=${this.courseHashCode}`, this.fd)
    .subscribe({
      next: data => {
        alert(data.message);
        this.updateCourseOnTemplate(this.index, this.title.value, this.imageFile.name);
      },
      error: err => {
        alert(err.message)
      }
    })
  }

  turnOff() {
    this.onClose.emit(false);
  }
  updateCourseOnTemplate(index: number, title: string, image: string) {
    this.onUpdate.emit({index: index, title: title, image: image});
  }
}
