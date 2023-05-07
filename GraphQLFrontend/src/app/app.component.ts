import { Component, OnInit } from '@angular/core';
import { BooksAddedGQL, BooksAddedSubscriptionVariables, BooksGQL } from './clients/graphql/graphqlApi';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GraphQLFrontend';
  bookTitles$: Observable<string[]>;
  lastAddedBook$: Observable<string | undefined | null>;

  constructor(books: BooksGQL, booksSubscription: BooksAddedGQL) {
    this.bookTitles$ = books.fetch({})
      .pipe(map(result => result.data.books?.nodes?.map(book => book.title) as string[]))

    this.lastAddedBook$ = booksSubscription.subscribe({} as BooksAddedSubscriptionVariables)
      .pipe(tap(b => console.log(b)), map(result => result.data?.bookAdded.title));
  }

  ngOnInit(): void {
  }
}
