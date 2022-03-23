import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/search/api.service';

import { Category, PaginationItem, SearchCourse } from '../../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  nameCourse!: string
  resultsList: SearchCourse[] | undefined;
  courseList: SearchCourse[] | undefined;
  renderedList: PaginationItem[] = [];
  categoryList: Category[] | undefined;
  outstandingCoursesList: SearchCourse[] | undefined;
  category = '';
  level= '';
  price = '';
  empty!: boolean;
  paginationList: PaginationItem[] = [];
  currentPage: number;

  constructor(private _activatedRoute: ActivatedRoute, private _apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this._apiService.paginate(3,7));
    
    //get parameter from url 
    this._activatedRoute.queryParams.subscribe((data: Params) => {
      this.nameCourse = data['nameCourse'];
    });

    //get and render category list for filter
    this._apiService.getCategory().subscribe(resp => {
      this.categoryList = resp.data;
    });
    
    //search courses by input value
    this.filter();

    //get and render outstanding courses
    this._apiService.getOutstandingCourses().subscribe(resp => {
      this.outstandingCoursesList = resp.data;
    })
  }

  searchByEnter($event: KeyboardEvent) {
    if($event.key === 'Enter'){
      this.filter();
    }
  }

  filter() {
    this._apiService.search(this.nameCourse, this.level, this.price)
    .subscribe({
      next: resp => {
        console.log(resp);
        
        // check if it's the first time then skip filter resultList by category
        this.resultsList = ( this.category === '' ? resp.data : resp.data.filter(item => item.hashCategory === this.category) );
        if(this.resultsList.length === 0) {
          this.empty = true;
          return;
        };
        this.empty = false; 
        
        // divide resultList into lists of 5 items to paginate
        this.paginationList = [];
        let page = 1;
        for(let i = 0; i < this.resultsList.length; i++) {
          this.paginationList.push({page: page, data: this.resultsList.slice(i,i+3)});
          i+=2; // 0-4, 5-9, 10-14,...
          page++;
        };

        // get a list of page numbers based on the current page and total page
        this.currentPage = 1;
        this.resetRenderedList()
        this.courseList = this.renderedList[0].data;
      },
      error: err => {
        this.empty = true;
        this.resultsList = [];
      }
    });
  }
  resetRenderedList() {
    const pageNumbers = this._apiService.paginate(this.currentPage,this.paginationList.length);
        
    // filter and remove pages that dont need to be renderred
    this.renderedList = [];
    for(let i = 0; i < pageNumbers.length; i++) {
      this.renderedList.push(this.paginationList.find(item => item.page == pageNumbers[i]));
    }
  }
  choosePage(pageNumber: number) {
    console.log(this.renderedList);
    this.renderedList.find(item => {
      if(item.page === pageNumber){
        this.courseList = item.data;
      }
    });
    this.currentPage = pageNumber+1;
    this._apiService.paginate(this.currentPage,this.paginationList.length);
    this.resetRenderedList()
  }
  goNext() {
    if(this.currentPage > this.renderedList.length) {
      return;
    }
    this.currentPage++;
    this.courseList = this.renderedList[this.currentPage-1].data;
    this._apiService.paginate(this.currentPage,this.paginationList.length);
    this.resetRenderedList()
  }
  goPrevious() {
    if(this.currentPage <= 1) {
      return;
    }
    this.currentPage--;
    this.courseList = this.renderedList[this.currentPage-1].data;
    this._apiService.paginate(this.currentPage,this.paginationList.length);
    this.resetRenderedList();
  }
}
