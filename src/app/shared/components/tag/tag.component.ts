import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
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
