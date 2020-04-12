import { PostFilter } from '../../model/postFilter.model';
import { PostSimple } from '../../model/postSimple.model';
import { isAfter, isBefore, parseISO } from 'date-fns'
import { Post } from '../../model/post.model';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';

function checkDistance(post: PostSimple, filter: PostFilter): boolean {
  const postLatLng = new google.maps.LatLng(post.location.lat, post.location.lon);
  const filterLatLng = new google.maps.LatLng(this.filter.lat, this.filter.lon);
  const distance = google.maps.geometry.spherical.computeDistanceBetween(postLatLng, filterLatLng);
  return distance <= filter.distance;
}

function checkTags(filterTags: string[], postTags: string[]): boolean {
  for (const tag of filterTags) {
    if (postTags.indexOf(tag) === -1) {
      return false;
    }
  }
  return true;
}

function checkUserTags(filterTags: number[], postTags: SimpleUser[]): boolean {
  for (const id of filterTags) {
    if (postTags.findIndex((user) => user.userId === id) === -1) {
      return false;
    }
  }
  return true;
}

export default function isPostInFilter(post: Post, filter: PostFilter): boolean {
  if (filter.distance) {
    if (!checkDistance(post, filter)) {
      return false;
    }
  }

  if (filter.maxDate && isAfter(post.publishDate, filter.maxDate)) {
    return false;
  }

  if (filter.minDate && isBefore(post.publishDate, filter.minDate)) {
    return false;
  }
  if (filter.publishers && filter.publishers.length > 0) {
    if (filter.publishers.indexOf(post.creator.userId) === -1) {
      return false;
    }
  }
  
  if (filter.tags) {
    if (!checkTags(filter.tags, post.tags)) {
      return false;
    }
  }
  
  if (filter.userTags) {
    if (!checkUserTags(filter.userTags, post.userTags)) {
      return false;
    }
  }

  return true;
}