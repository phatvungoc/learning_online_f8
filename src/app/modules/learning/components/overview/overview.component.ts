import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { OverviewService } from 'src/app/services/overview/overview.service';
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

  userHashCode: string = '32a3384a-92d4-45f7-bf2f-a3457dfc08da';
  lessionHashCode: string = '49feaadb-b2cc-4116-a7e7-6310076fb378';

  ngOnInit(): void {
    this.apiService
      .getLessionsByHashCode(this.lessionHashCode, this.userHashCode)
      .pipe(map((data: any) => data.data.comments))
      .subscribe(async (comments: any) => {
        this.comments = await comments.map((comment: any) => ({
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
            .subscribe(async (user: any) => {
              this.userList.push(user);
            });
        }
      });

    this.getUserDetailByHashCode(this.userHashCode);
    this.userDetail$.subscribe(
      (user: UserDetailModel) => (this.userDetail = user)
    );
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
      .subscribe(async (commentData: any) => {
        const comment = await commentData.data;
        this.hashCodeUserList.push(comment.userHashCode);
        this.userList.push(this.userDetail);
        this.comments.unshift(comment);
        this.displayUserNameComment(comment.userHashCode);
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
