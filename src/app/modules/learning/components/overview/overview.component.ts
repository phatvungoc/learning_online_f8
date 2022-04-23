import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { OverviewService } from 'src/app/services/overview/overview.service';
import { User } from 'src/app/services/user/models';
import { GetUserDetail } from 'src/app/stores/overview/actions';
import { UserDetailModel } from 'src/app/stores/overview/models';
import { UserDetailState } from 'src/app/stores/overview/states';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private _store: Store, private apiService: OverviewService) {}

  isComments = false;
  isTyping = false;
  isTypingReply = false;
  isLiked = false;
  isHideReplies = true;
  isReplyComments = false;
  isReplyCommentBox = false;

  userDetail!: UserDetailModel;
  @Select(UserDetailState.getUserDetailState)
  userDetail$!: Observable<UserDetailModel>;

  username: string = '';
  comments!: any;

  userList: Array<any> = [];
  hashCodeUserList: any = [];
  @ViewChild('commentInput') commentInput!: ElementRef;

  userHashCode: string = '';
  @Input() lessionHashCode: string = '';

  ngOnInit(): void {
    const currentUser: User = JSON.parse(localStorage.getItem('auth')).user;
    this.userHashCode = currentUser['HashCode'];
    this.apiService
      .getLessionsByHashCode(this.lessionHashCode, this.userHashCode)
      .pipe(map((data: any) => data.data.comments))
      .subscribe((comments: any) => {
        this.comments = comments.map((comment: any) => ({
          ...comment,
          activeReply: false,
          activeLike: false,
          isTypingReply: false,
        }));
        console.log(this.comments);
        this.comments.map((comment: any) => {
          this.hashCodeUserList.push(comment.userHashCode);
        });
        this.comments.reverse();
        for (let hashCodeUser of this.hashCodeUserList) {
          this.apiService
            .getUserDetailByHashCode(hashCodeUser)
            .pipe(map((data: any) => data.data))
            .subscribe((user: any) => {
              this.userList.push(user);
            });
        }
      });

    this.getUserDetailByHashCode(this.userHashCode);
    this.userDetail$.subscribe(
      (user: UserDetailModel) => (this.userDetail = user)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('lessionHashCode' in changes) {
      this.apiService
        .getLessionsByHashCode(this.lessionHashCode, this.userHashCode)
        .pipe(map((data: any) => data.data.comments))
        .subscribe((comments: any) => {
          this.comments = comments.map((comment: any) => ({
            ...comment,
            activeReply: false,
            activeLike: false,
            isTypingReply: false,
          }));
          console.log(this.comments);
          this.comments.map((comment: any) => {
            this.hashCodeUserList.push(comment.userHashCode);
          });
          this.comments.reverse();
          for (let hashCodeUser of this.hashCodeUserList) {
            this.apiService
              .getUserDetailByHashCode(hashCodeUser)
              .pipe(map((data: any) => data.data))
              .subscribe((user: any) => {
                this.userList.push(user);
              });
          }
        });

      this.getUserDetailByHashCode(this.userHashCode);
      this.userDetail$.subscribe(
        (user: UserDetailModel) => (this.userDetail = user)
      );
    }
  }

  displayUserNameComment(hashCode: string) {
    for (let user of this.userList) {
      if (user.hashCode == hashCode) {
        this.username = `${user.firstName} ${user.lastName}`;
      }
    }
    return this.username;
  }

  getUserDetailByHashCode(hascode: string) {
    this._store.dispatch(new GetUserDetail(hascode));
  }

  handleComment(e: any) {
    if (e.target.innerText.trim().length > 0) {
      this.isTyping = true;
    } else {
      this.isTyping = false;
    }
  }

  handleSubmitComment() {
    this.apiService
      .postComment(
        this.userHashCode,
        this.lessionHashCode,
        this.commentInput.nativeElement.innerText
      )
      .subscribe((commentData: any) => {
        const comment = commentData.data;
        this.hashCodeUserList.push(comment.userHashCode);
        this.userList.push(this.userDetail);
        console.log(this.userList);
        this.comments.unshift(comment);
        this.displayUserNameComment(commentData.data.userHashCode);
      });
    this.commentInput.nativeElement.innerText = '';
    this.isComments = false;
    this.isTyping = false;
  }

  handleReplyComment(e: any, comment: any) {
    if (e.target.innerText.trim().length > 0) {
      comment.isTypingReply = true;
    } else {
      comment.isTypingReply = false;
    }
  }

  handleCancelReplyComment(comment: any) {
    comment.activeReply = false;
    comment.isTypingReply = false;
  }

  handleOpenReplyBox(comment: any) {
    comment.activeReply = !comment.activeReply;
    setTimeout(() => {
      (
        document.querySelector('.discussion-input-reply') as HTMLInputElement
      ).focus();
    }, 0);
  }
}
