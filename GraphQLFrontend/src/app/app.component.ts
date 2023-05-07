import { Component, OnInit } from '@angular/core';
import {
  AddBookMutationVariables,
  GraphQLClient,
} from './clients/graphql/graphqlApi';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GraphQLFrontend';
  bookTitles$: Observable<string[]>;
  bookTitlesWatch$: Observable<string[]>;
  lastAddedBook$: Observable<string | undefined | null>;

  constructor(private readonly graphqlClient: GraphQLClient) {
    this.bookTitles$ = this.graphqlClient
      .books()
      .pipe(
        map(
          (result) =>
            result.data.books?.nodes?.map((book) => book.title) as string[]
        )
      );

    this.bookTitlesWatch$ = this.graphqlClient
      .booksWatch()
      .valueChanges.pipe(
        map(
          (result) => result.data.books?.nodes?.map((b) => b.title) as string[]
        )
      );

    this.lastAddedBook$ = this.graphqlClient
      .booksAdded()
      .pipe(map((result) => result.data?.bookAdded.title));
  }

  ngOnInit(): void {}

  async addBook(): Promise<void> {
    this.graphqlClient
      .addBook({
        bookInput: {
          id: '801a40fb-9c64-4ebf-8e4b-0f6fd29176ca',
          title: 'AngularTest!',
        },
      } as AddBookMutationVariables)
      .subscribe((b) => console.log('new book', b.data?.addBook));
  }
}
