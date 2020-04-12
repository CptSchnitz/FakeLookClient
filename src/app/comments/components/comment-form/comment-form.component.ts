import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentsService } from '../../services/comments-service/comments.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

const AtLeastOneCommentValue: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const tags = control.get('tags');
  const text = control.get('text');
  const userTags = control.get('userTags');
  if (text.value || tags.value.length > 0 || userTags.value.length > 0) {
    return null;
  } else {
    return { atLeastOneRequired: true };
  }
};

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup = new FormGroup(
    {
      text: new FormControl('', [Validators.maxLength(500)]),
      tags: new FormControl([]),
      userTags: new FormControl([])
    },
    [AtLeastOneCommentValue]
  );

  @Input()
  postId: number;
  constructor(
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private commentService: CommentsService
  ) {}

  get text() {
    return this.commentForm.get('text');
  }
  ngOnInit() {}

  onSubmit() {
    const formValue = this.commentForm.value;
    const comment = {
      ...formValue,
      userTags: formValue.userTags.map(ut => ut.userId)
    };
    this.commentService.createComment(comment, this.postId).subscribe({
      next: comment => {
        this.activeModal.close(comment);
      },
      error: () => {
        this.toastr.error('failed adding a comment');
      }
    });
  }
}
