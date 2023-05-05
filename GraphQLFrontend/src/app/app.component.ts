import { Component, OnInit } from '@angular/core';
import { BooksTestingGQL } from './clients/graphql/graphqlApi';
import { Observable, map, pipe, switchMap } from 'rxjs';
import { Book } from './clients/graphql/graphqlApi';
import { Apollo, QueryRef } from "apollo-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GraphQLFrontend';
  bookTitles$: Observable<string[]>;

  constructor(books: BooksTestingGQL) {
    this.bookTitles$ = books.fetch({})
      .pipe(map(result => result.data.books?.nodes?.map(book => book.title) as string[]))
  }

  ngOnInit(): void {
  }
}
