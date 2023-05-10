import { Component, OnInit } from '@angular/core';
import {
  AddBookMutationVariables,
  Author,
  AuthorsConnection,
  Book,
  BooksSortedQuery,
  GraphQLClient,
  SortEnumType,
} from './clients/graphql/graphqlApi';
import { Observable, BehaviorSubject, Subscription, map, Subject, lastValueFrom } from 'rxjs';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  onDestroy: Subject<void> = new Subject<void>();

  loading = true;

  bookTitle?: string;

  books$: Observable<Book[]>;

  authorPage$: Subject<AuthorsConnection> = new Subject<AuthorsConnection>();

  authorsOfPage$: Observable<Author[]> = this.authorPage$.pipe(map(page => page.edges?.map(edge => edge.node) as Author[]));
  hasPreviousPage$: Observable<boolean> = this.authorPage$.pipe(map(page => page.pageInfo.hasPreviousPage));
  hasNextPage$: Observable<boolean> = this.authorPage$.pipe(map(page => page.pageInfo.hasNextPage));

  lastAuthorCursor: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  firstAuthorCursor: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

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
        this.bookWatch$.next(data.books2?.nodes as Book[]);
      });

    this.lastAddedBookTitle$ = this.graphqlClient
      .booksAdded()
      .pipe(map((result) => result.data?.bookAdded.title));
  }

  async ngOnInit(): Promise<void> {
    await this.fetchBookPage(3);
  }

  async fetchBookPage(amount: number): Promise<void> {

    console.log(this.firstAuthorCursor.getValue() ?? "nope", this.lastAuthorCursor.getValue() ?? "nope")

    const queryParams = amount > 0 ? { first: amount, after: this.lastAuthorCursor.getValue() } : { last: Math.abs(amount), before: this.firstAuthorCursor.getValue() };

    console.log('fetchBookPage', queryParams)

    const pageResult = await lastValueFrom(this.graphqlClient.paginatedAuthors(queryParams)
      .pipe(map(page => page.data.authors as AuthorsConnection)));

    console.log('fetchBookPage result', pageResult.pageInfo.startCursor, pageResult.pageInfo.endCursor);

    this.firstAuthorCursor.next(pageResult.pageInfo.startCursor ?? null);
    this.lastAuthorCursor.next(pageResult.pageInfo.endCursor ?? null);
    this.authorPage$.next(pageResult);
  }

  async fetchBooks(): Promise<void> {
    this.bookWatchQuery.refetch();
  }

  async addBook(): Promise<void> {
    this.graphqlClient
      .addBook({
        bookInput: {
          book: {
            title: this.bookTitle,
          }
        },
      } as AddBookMutationVariables)
      .subscribe();
  }

  async fetchPreviousPage(): Promise<void> {
    await this.fetchBookPage(-3);
  }

  async fetchNextPage(): Promise<void> {
    await this.fetchBookPage(3);
  }
}
