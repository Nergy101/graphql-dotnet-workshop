import { Component, OnInit } from '@angular/core';
import {
  AddBookMutationVariables,
  Book,
  BooksSortedQuery,
  GraphQLClient,
  SortEnumType,
} from './clients/graphql/graphqlApi';
import { Observable, Subject, BehaviorSubject, Subscription, map } from 'rxjs';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = true;

  bookTitle?: string;

  books$: Observable<Book[]>;
  lastAddedBookTitle$: Observable<string | undefined | null>;

  bookWatchQuery: QueryRef<BooksSortedQuery>;
  bookWatch$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  bookWatchQuerySubscription: Subscription;

  bookSorting = { sorting: { createdAt: SortEnumType.Desc } };

  constructor(private readonly graphqlClient: GraphQLClient) {
    this.books$ = this.graphqlClient
      .booksSorted(this.bookSorting)
      .pipe(
        map(
          (result) => result.data.books2?.nodes?.map((book) => book) as Book[]
        )
      );

    this.bookWatchQuery = this.graphqlClient.booksSortedWatch(
      this.bookSorting,
      { pollInterval: 10000 }
    ); // for auto-update after 10s

    this.bookWatchQuerySubscription =
      this.bookWatchQuery.valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log('new books', data.books2?.nodes as Book[]);
        this.bookWatch$.next(data.books2?.nodes as Book[]);
      });

    this.lastAddedBookTitle$ = this.graphqlClient
      .booksAdded()
      .pipe(map((result) => result.data?.bookAdded.title));
  }

  ngOnInit(): void {}

  async fetchBooks(): Promise<void> {
    this.bookWatchQuery.refetch();
  }

  async addBook(): Promise<void> {
    this.graphqlClient
      .addBook({
        bookInput: {
          title: this.bookTitle,
        },
      } as AddBookMutationVariables)
      .subscribe();
  }
}
