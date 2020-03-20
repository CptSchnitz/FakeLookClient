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
  lon?: number;
  minDate?: Date;
  maxDate?: Date;
  orderBy?: OrderPostBy;
}
