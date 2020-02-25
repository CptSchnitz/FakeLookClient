import { Component, OnInit, Input } from '@angular/core';
import { PostSimple } from '../../model/postSimple.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-map-info-window',
  templateUrl: './post-map-info-window.component.html',
  styleUrls: ['./post-map-info-window.component.css']
})
export class PostMapInfoWindowComponent implements OnInit {

  @Input() post: PostSimple;

  imageUrlBase = environment.backendUrl + '/images/';

  constructor() { }

  ngOnInit() {
  }

}
