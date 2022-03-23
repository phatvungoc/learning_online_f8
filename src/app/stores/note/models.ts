// Note
export interface NoteModel {
  userName: string;
  hashCodeLession: string;
  lessionName: string;
  content: string;
  timeLine: string;
  hashCode: string;
}

export interface NoteResponseModel {
  data?: NoteModel[];
  message?: string;
  statusCode?: number;
}
