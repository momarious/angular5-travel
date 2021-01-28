import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.scss']
})
export class BlogSearchComponent implements OnInit {

  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  form: FormGroup;
  blogs$: Observable<Blog[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder
  ) {}

  // Push a search term into the observable stream.
  search(formData: NgForm): void {
    this.searchTerms.next(formData['term']);
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      term: [null, Validators.required]
    });

    console.log(this.blogs$);

    this.blogs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.blogService.searchBlogs(term)),
    );

  }
}
