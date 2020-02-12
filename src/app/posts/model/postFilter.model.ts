export enum OrderPostBy {
  likes = 'likes',
  date = 'date'
}

export interface PostFilter {
  publishers?: number[];
  tags?: string[];
  userTags?: number[];
  distance?: number;
  lat?: number;
  lng?: number;
  minDate?: Date;
  maxDate?: Date;
  orderBy?: OrderPostBy;
}
