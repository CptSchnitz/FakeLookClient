import { Component, OnInit, Input } from '@angular/core';
import { PostSimple } from '../../model/postSimple.model';

@Component({
  selector: 'app-post-map-info-window',
  templateUrl: './post-map-info-window.component.html',
  styleUrls: ['./post-map-info-window.component.css']
})
export class PostMapInfoWindowComponent implements OnInit {

  @Input() post:PostSimple
  constructor() { }

  ngOnInit() {
    
  }

}
