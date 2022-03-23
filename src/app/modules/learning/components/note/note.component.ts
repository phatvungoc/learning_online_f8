import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { async, Observable } from 'rxjs';
import { NoteService } from 'src/app/services/note/note.service';
import { GetNoteByLession } from 'src/app/stores/note/actions';
import { NoteModel } from 'src/app/stores/note/models';
import { NoteState } from 'src/app/stores/note/states';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  isCreateNoteBtn = false;
  isTypingNotes = false;
  noteContent = '';
  selectedText = 'Normal';
  menuOpen: boolean = false;
  menuBtnClick: boolean = false;
  selectedTextArray = ['Normal', 'H4', 'Blockquote', 'Code'];
  isChangeStyleNote = false;

  userHashCode: string = '32a3384a-92d4-45f7-bf2f-a3457dfc08da';
  lessionHashCode: string = '49feaadb-b2cc-4116-a7e7-6310076fb378';

  isDisplayingNote = true;

  @Input() videoProg: number = 0;
  @Output() pause = new EventEmitter();
  @Output() play = new EventEmitter();
  @Output() setVideoProg = new EventEmitter();

  notes!: NoteModel[];
  @Select(NoteState.getNoteState) note$!: Observable<NoteModel[]>;

  handlePauseVideo() {
    this.pause.emit();
  }

  handlePlayVideo() {
    this.play.emit();
  }

  constructor(
    private renderer: Renderer2,
    private _store: Store,
    private _api: NoteService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.menuBtnClick) {
        this.menuOpen = false;
      }
      this.menuBtnClick = false;
    });
  }

  ngOnInit(): void {
    this.getListNote(this.lessionHashCode, this.userHashCode);
    this.note$.subscribe((note: NoteModel[]) => {
      this.notes = note;
    });
  }

  changeTimeLineToSeconds(timeLine: string) {
    const arr = timeLine.split(':');
    const totalSeconds =
      parseInt(arr[0], 10) * 60 * 60 +
      parseInt(arr[1], 10) * 60 +
      parseInt(arr[2], 10);
    this.videoProg = totalSeconds;
    this.setVideoProg.emit(this.videoProg);
    console.log(this.videoProg);
  }

  displayTimeLine(note: NoteModel) {
    const time = note.timeLine;
    const arr = time.split(':');
    const totalSeconds = +arr[0] * 60 * 60 + +arr[1] * 60 + +arr[2];
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes.toString().length < 2) {
      if (seconds.toString().length < 2) {
        return `0${minutes}` + ':' + `0${seconds}`;
      } else {
        return `0${minutes}` + ':' + seconds;
      }
    }

    return minutes + ':' + seconds;
  }

  getListNote(hashCodeLession: string, hashCodeUser: string) {
    this._store.dispatch(new GetNoteByLession(hashCodeLession, hashCodeUser));
  }

  handleCreateNote() {
    if (this.noteContent.length > 0) {
      console.log(this.noteContent);
      this._api
        .posttNote(
          this.userHashCode,
          this.lessionHashCode,
          this.noteContent,
          this.changeSecondToTimeLine(this.videoProg)
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.getListNote(this.lessionHashCode, this.userHashCode);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }

    console.log(this.videoProg);
  }

  changeSecondToTimeLine(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  preventCloseOnClick() {
    this.menuBtnClick = true;
  }

  handleOpenNoteEditor() {
    this.isCreateNoteBtn = true;
    setTimeout(function () {
      (document.querySelector('.input-editor') as HTMLElement).focus();
    }, 0);
  }

  handleInputEditor(e: any) {
    if (e.target.innerText.trim().length > 0) {
      this.isTypingNotes = true;
      this.noteContent = e.target.innerText;
    } else {
      this.isTypingNotes = false;
    }
  }

  handleChooseOption(option: string) {
    this.selectedText = option;
    this.menuOpen = false;
  }

  handleChooseStyleNote(cmd: string) {
    document.execCommand(cmd, false, '');
    this.isChangeStyleNote = !this.isChangeStyleNote;
    setTimeout(function () {
      (document.querySelector('.input-editor') as HTMLElement).focus();
    }, 0);
    const btnStyle = document.querySelectorAll('.btn-option');
    for (let i = 0; i < btnStyle.length; i++) {
      if (btnStyle[i].classList.contains('style-active')) {
        btnStyle[i].classList.remove('style-active');
      }
    }
  }

  changeToTime(num: number) {
    let minutes = Math.floor(num / 60);
    let seconds = num % 60;
    if (minutes.toString().length < 2) {
      if (seconds.toString().length < 2) {
        return `0${minutes}` + ':' + `0${seconds}`;
      } else {
        return `0${minutes}` + ':' + seconds;
      }
    }

    return minutes + ':' + seconds;
  }
}
