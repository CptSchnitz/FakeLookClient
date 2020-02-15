import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tag',
  template: `
    <div class="border rounded-lg text-center p-1 mr-1">
      <span>{{ content }}</span
      ><button
        *ngIf="!disabled"
        type="button"
        (click)="tagClick.next()"
        class="btn p-0 mx-1"
        [disabled]="disabled"
      >
        <fa-icon [icon]="faTimes" class="text-danger"></fa-icon>
      </button>
    </div>
  `,
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input()
  content: string;
  @Input()
  disabled = false;

  @Output()
  tagClick = new EventEmitter<void>();

  faTimes = faTimes;
  constructor() {}

  ngOnInit() {}
}
