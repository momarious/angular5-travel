import { Injectable } from '@angular/core';
import { Blog } from 'src/app/blog/blog';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogsUrl = 'api/blogs';

  constructor(
    private http: HttpClient
  ) { }

  /** GET heroes from the server */
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl)
      .pipe(
        tap(_ => this.log('fetched blogs')),
        catchError(this.handleError<Blog[]>('getBlogs', []))
      );
  }
s
  /** GET blog by id. Will 404 if id not found */
  getBlog(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(_ => this.log(`fetched blog id=${id}`)),
      catchError(this.handleError<Blog>(`getBlog id=${id}`))
    );
  }

  /** GET next blog by id. Will 404 if id not found */
  getNextBlog(id: number) {
    id = id + 1;
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      catchError(this.handleError<Blog>(`getNextBlog id=${id}`))
    );
  }

  /** GET previous blog by id. Will 404 if id not found */
  getPreviousBlog(id: number) {
    id = id - 1;
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      catchError(this.handleError<Blog>(`getPreviousBlog id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchBlogs(term: string): Observable<Blog[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Blog[]>(`${this.blogsUrl}/?title=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Blog[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////


  /** POST: add a new blog to the server */
  addBlog(formData: NgForm): Observable<Blog> {
    return this.http.post<Blog>(this.blogsUrl, formData, httpOptions).pipe(
      tap((newBlog: Blog) => this.log(`added blog w/ id=${newBlog.id}`)),
      catchError(this.handleError<Blog>('addBlog'))
    );
  }

  /** DELETE: delete the blog from the server */
  deleteBlog(blog: Blog | number): Observable<Blog> {
    const id = typeof blog === 'number' ? blog : blog.id;
    const url = `${this.blogsUrl}/${id}`;

    return this.http.delete<Blog>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted blog id=${id}`)),
      catchError(this.handleError<Blog>('deleteBlog'))
    );
  }

  /** PUT: update the blog on the server */
  updateBlog(blog: Blog): Observable<any> {
    return this.http.put(this.blogsUrl, blog, httpOptions).pipe(
      tap(_ => this.log(`updated blog id=${blog.id}`)),
      catchError(this.handleError<any>('updateBlog'))
    );
  }


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
