import { Injectable } from '@angular/core';
import { MockBlog } from '../blog/mock-blog';
import { Blog } from '../blog/blog';
import { of, Observable } from 'rxjs';
import { MockPackage } from '../package/mock-package';
import { Package } from '../package/package';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  blogsUrl = 'api/blogs';

  constructor(
    private http: HttpClient
  ) { }

  /** GET heroes from the server */
  getPosts(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl)
      .pipe(
        tap(_ => this.log('fetched blogs')),
        catchError(this.handleError<Blog[]>('getBlogs', []))
      );
  }

  getBlogs(): Observable<Blog[]> {
    const blogs: Blog[] = [];
    MockBlog.forEach(blog => {
      blogs.push({
        id: blog.id,
        author: blog.author,
        tags: blog.tags,
        img: blog.img,
        title: blog.title,
        excert: blog.excert.length > 80 ? blog.excert.substring(0, 80) : blog.excert,
        content: blog.content,
        date: blog.date,
        hour: blog.hour,
        views: blog.views,
        comments: blog.comments
      });
    });
    return of(blogs);
  }

  getDestinations(): Observable<Package[]> {
    return of(MockPackage);
  }

  /*getPackagesOptions() {
    return 
  }*/

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BlogService message with the MessageService */
  private log(message: string) {
    console.log(`BlogService: ${message}`);
  }
}
