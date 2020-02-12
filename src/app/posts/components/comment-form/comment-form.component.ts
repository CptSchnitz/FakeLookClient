import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentsService } from '../../services/comments-service/comments.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  commentForm: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.maxLength(500)]),
    tags: new FormControl([]),
    userTags: new FormControl([])
  });

  @Input()
  postId: number;
  constructor(private activeModal: NgbActiveModal, private toastr: ToastrService, private commentService: CommentsService) { }

  get text() {
    return this.commentForm.get('text');
  }
  ngOnInit() {
  }

  onSubmit() {
    const formValue = this.commentForm.value;
    const comment = {
      ...formValue,
      userTags: formValue.userTags.map(ut => ut.userId)
    };
    this.commentService.createComment(comment, this.postId).subscribe({
      next: (comment) => {
        this.activeModal.close(comment);
      }, error: () => {
        this.toastr.error('failed adding a comment');
      }
    });
  }

}
