

export interface SearchResults {
  data?: SearchCourse[],
  message?: string | null,
  statusCode?: number
}

export interface SearchCourse {
  title: string,
  image: string,
  totalStudent: number,
  totalTime: string,
  level: number,
  descriptionDetails: Description[],
  hashCategory: string,
  hashCode: string
}

export interface Description {
  content: string,
  hashCode: string
}

export interface CategoryResults {
  data?: Category[],
  message?: string | null,
  statusCode?: number
}

export interface Category {
  title: string,
  parentHashCode: string,
  isDeleted: boolean,
  createAt: string,
  updateAt: string,
  hashCode: string
}

export interface PaginationItem {
  page: number;
  data: SearchCourse[]
}
