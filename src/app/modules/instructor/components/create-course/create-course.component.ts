import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  constructor(
    private _activatedroute: ActivatedRoute, 
    private _http: HttpClient,
    private _router: Router
    ) { }
  imageFile: File;
  instructorHashcode:string = '';
  createCourse!: FormGroup;
  isPayment: boolean = false
  fd = new FormData();
  
  ngOnInit(): void {
    this._activatedroute.queryParamMap.subscribe(params => {
      this.instructorHashcode = params.get('id');
    })
    this.createCourse = new FormGroup({
      title: new FormControl('',{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      }),
      image: new FormControl(null),
      description: new FormControl('',{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      }),
      level: new FormControl(0),
      price: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9][0-9]*$')
        ], 
        
      }),
      category: new FormControl('123456', {
        validators: [Validators.required]
      })

    })
  }
  get title() {
    return this.createCourse.controls['title'];
  }
  get image() {
    return this.createCourse.controls['image'];
  }
  get description() {
    return this.createCourse.controls['description'];
  }
  get level() {
    return this.createCourse.controls['level'];
  }
  get price() {
    return this.createCourse.controls['price'];
  }
  get category() {
    return this.createCourse.controls['category'];
  }

  onFileSelected($event: any) {
    this.imageFile = $event.target.files[0];
    console.log(this.imageFile);
    
  }
  onSubmit() {
    this.isPayment = (this.price.value > 0);
    this.fd.append('Title', this.title.value);
    this.fd.append('InstructorHashCode', this.instructorHashcode)
    this.fd.append('Image', this.imageFile, this.imageFile.name);
    this.fd.append('Description', this.description.value);
    this.fd.append('Level', this.level.value);
    this.fd.append('IsPayment', JSON.stringify(this.isPayment));
    this.fd.append('Price', this.price.value);
    this.fd.append('CategoryHashCode', this.category.value);
    this.fd.forEach(key => console.log(key));

    this._http.post<any>('https://localhost:5001/api/1.0/Course/addcourse', this.fd)
    .subscribe({
      next: data => {
        alert(data.message);
      },
      error: err => {
        alert(err)
      }
    })
  }
  backToDashboard() {
    this._router.navigate(['/instructor/dashboard'], { queryParams: { id: this.instructorHashcode } })
  }
  goToTotalCourses() {
    this._router.navigate(['/instructor/total-courses'], { queryParams: { id: this.instructorHashcode } })
  }
}
