import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-update-course-detail',
  templateUrl: './update-course-detail.component.html',
  styleUrls: ['./update-course-detail.component.scss']
})
export class UpdateCourseDetailComponent implements OnInit {
  courseHashCode: string;
  sectionHashCode: string;
  lessionHashCode: string;
  sectionList: any;
  isEditOn: boolean = true;
  sectionForm: FormGroup;
  lessionForm: FormGroup;
  addSectionForm: FormGroup;
  addLessionForm: FormGroup;
  title: string = '';
  description: string = '';
  isEditLessionOn: boolean = false;
  isEditSectionOn: boolean = false;
  isAddLessionOn: boolean = false;
  isAddSectionOn: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _course: CourseService,
    private _http: HttpClient
    ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.pipe(concatMap(params => {
      this.courseHashCode = params.get('hashCode')
      return this._course.getCourseByHashcode(this.courseHashCode)
    }))
    .pipe(map(resp => {
      console.log(resp.data.sections);
      
      return resp.data.sections
    }))
    .subscribe(resp => {
      console.log('resp',resp);
      this.sectionList = resp;
    });
    
  }

  get sectionTitle() {
    return this.sectionForm.controls['title'];
  }
  get lessionTitle() {
    return this.lessionForm.controls['title'];
  }
  get sectionDescription() {
    return this.sectionForm.controls['description'];
  } 
  get lessionVideo() {
    return this.lessionForm.controls['video'];
  }

  
  editSection(title: string, description: string, sectionHashCode: string) {
    this.sectionForm = new FormGroup({
      title: new FormControl(title,{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      }),
      description: new FormControl(description,{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      })
    })
    this.sectionHashCode = sectionHashCode;
    this.isEditSectionOn = true;
  }
  
  editLession(title: string, description: string, sectionHashCode: string, lessionHashCode: string) {
    this.lessionForm = new FormGroup({
      title: new FormControl(title,{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      }),
      video: new FormControl(description,{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      })
    })
    this.sectionHashCode = sectionHashCode;
    this.lessionHashCode = lessionHashCode;
    this.isEditLessionOn = true;
  }
  
  onSubmitSection() {
    this._http.put<any>(`https://localhost:5001/api/1.0/Section/editsection?sectionHashcode=${this.sectionHashCode}`,
      {
        title: this.sectionTitle.value,
        description: this.sectionDescription.value,
        courseHashCode: this.courseHashCode,
        priority: 0
      }
    ).subscribe(resp => {
      alert(resp.message);
      this.isEditSectionOn = false;
      this.sectionList.find(item => {
        if(item.hashCode === this.sectionHashCode) {
          item.title = this.sectionTitle.value;
        }
      })
      
    })
  }

  onSubmitLession() {
    this._http.put<any>(`https://localhost:5001/api/1.0/Lession/update-lession?lessionHashCode=${this.lessionHashCode}`,
      {
        sectionHashCode: this.sectionHashCode,
        title: this.lessionTitle.value,
        duration: "10:10:10",
        link: this.lessionVideo.value,
        priority: 0,
        status: 0
      }).subscribe(resp => {
        alert(resp.message);
        this.sectionList.find(section => {
          if(section.hashCode === this.sectionHashCode) {
            section.lessions.find(lession => {
              if(lession.hashCode === this.lessionHashCode) {
                lession.title = this.lessionTitle.value;
              }
            })
          }
        })
        this.isEditLessionOn = false;
      })
  }

  turnOffLession() {
    this.isEditLessionOn = false;
  }
  turnOffSection() {
    this.isEditSectionOn = false;
  }
  addSection() {
    this.addSectionForm = new FormGroup({
      title: new FormControl('',{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      }),
      description: new FormControl('',{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      })
    })
    this.isAddSectionOn = true;
  }

  addLession(sectionHashCode: string) {
    this.addLessionForm = new FormGroup({
      title: new FormControl('',{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      }),
      video: new FormControl('',{
        validators: [
          Validators.required,
          Validators.pattern(''),
          Validators.maxLength(100)
        ]
      })
    })
    this.sectionHashCode = sectionHashCode;
    this.isAddLessionOn = true;
  }

  get addSectionTitle() {
    return this.addSectionForm.controls['title']
  }

  get addSectionDescription() {
    return this.addSectionForm.controls['description']
  }

  get addLessionTitle() {
    return this.addLessionForm.controls['title']
  }

  get addLessionVideo() {
    return this.addLessionForm.controls['video']
  }

  get addLessionDuration() {
    return this.addLessionForm.controls['duration']
  }

  turnOffAddSection() {
    this.isAddSectionOn = false;
  }
  turnOffAddLession() {
    this.isAddLessionOn = false;
  }
  onSubmitAddSection() {
    this._http.post<any>('https://localhost:5001/api/1.0/Section/addsection', {
      "title": this.addSectionTitle.value,
      "description": this.addSectionDescription.value,
      "courseHashCode": this.courseHashCode,
      "priority": 0
    }).subscribe(resp => {
      alert(resp.message);
      this.isAddLessionOn = false;
      this.sectionList.push(
        {
          title: this.addSectionTitle,
          priority: 0,
          lessions: [],
          hashCode: ""
        }
      )
    })
  }

  // add lession api didnt work

  onSubmitAddLession() {
    
    this._http.post<any>('https://localhost:5001/api/1.0/Lession/add-lession',
    {
      sectionHashCode: this.sectionHashCode,
      title: this.addLessionTitle.value,
      duration: "10:10:10",
      link: this.addLessionVideo.value,
      priority: 0,
      status: 0
    }).subscribe(resp => {
      alert(resp.message)
      this.isAddLessionOn = false;
      this.sectionList.find(item => {
        if(item.hashCode === this.sectionHashCode) {
          const lessions  = item.lessions;
          lessions.push({
            title: this.addLessionTitle.value,
            duration: "10:10:10",
            link: this.addLessionVideo.value,
            status: 0,
            priority: 0,
            hashCode: ""
          })
        }
      })
    })
  }
  
  deleteSection(sectionHashCode: string) {
    if(confirm('bạn có muốn xóa chương học này') == true ) {
      this._http.delete<any>(`https://localhost:5001/api/1.0/Section/deletesection?sectionHashCode=${sectionHashCode}`)
      .subscribe(resp => {
        alert(resp.message);
        this.sectionList.find((item,index) => {
          if(item?.hashCode == sectionHashCode) {
            this.sectionList.splice(index,1);
          }
        })
      })
    }
  }

  deleteLession(lessionHashCode: string, sectionHashCode: string) {
    if(confirm('bạn có muốn xóa bài học này không') === true ) {
      this._http.put<any>(`https://localhost:5001/api/1.0/Lession/delete-lession?lessionHashCode=${lessionHashCode}`,{})
      .subscribe(resp => {
        alert(resp.message);
        this.sectionList.find(item => {
          if(item.hashCode == sectionHashCode){
            const lessions = item.lessions;
            lessions.find((item,index) => {
              if(item.hashCode == lessionHashCode) {
                lessions.splice(index,1)
              }
            })
          }
        })
        
      })
    }
  }
}
