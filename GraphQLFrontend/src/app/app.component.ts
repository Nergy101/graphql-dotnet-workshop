import { Component, OnInit, Signal, signal } from '@angular/core';
import {
  AddBookMutationVariables,
  Author,
  AuthorsConnection,
  Book,
  BooksSortedQuery,
  GraphQLClient,
  SortEnumType,
} from './clients/graphql/graphqlApi';
import { Observable, BehaviorSubject, map, Subject, lastValueFrom } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  onDestroy: Subject<void> = new Subject<void>();

  loading = true;

  bookTitle?: string;
  authorId?: string;

  books: Signal<Book[] | undefined> = signal(undefined);
  lastAddedBookTitle = signal<string | undefined>(undefined);

  pageSize = 5;

  pageNumber = 1;
  paginationLeft = 1;
  paginationRight = this.paginationLeft + this.pageSize;

  authorPage$: Subject<AuthorsConnection> = new Subject<AuthorsConnection>();

  authorsOfPage = toSignal(
    this.authorPage$.pipe(
      map((page) => page.edges?.map((edge) => edge.node) as Author[])
    )
  );
  hasPreviousPage = toSignal(
    this.authorPage$.pipe(map((page) => page.pageInfo.hasPreviousPage))
  );
  hasNextPage = toSignal(
    this.authorPage$.pipe(map((page) => page.pageInfo.hasNextPage))
  );

  lastAuthorCursor: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  firstAuthorCursor: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  totalAuthorCount: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  bookWatchQuery: QueryRef<BooksSortedQuery>;
  bookWatch = signal<Book[]>([]);

  bookSorting = { sorting: { createdAt: SortEnumType.Desc } };

  isDefined<T>(
    arg: T | null | undefined
  ): arg is T extends null | undefined ? never : T {
    return arg !== null && arg !== undefined;
  }

  constructor(private readonly graphqlClient: GraphQLClient) {
    this.books = toSignal(
      this.graphqlClient
        .booksSorted(this.bookSorting)
        .pipe(
          map(
            (result) => result.data.books2?.nodes?.map((book) => book) as Book[]
          )
        )
    );

    this.bookWatchQuery = this.graphqlClient.booksSortedWatch(
      this.bookSorting,
      { pollInterval: 10000 }
    ); // for auto-update after 10s

    this.bookWatchQuery.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.bookWatch.set(data.books2?.nodes as Book[]);
      });

    this.graphqlClient
      .booksAdded()
      .pipe(
        takeUntilDestroyed(),
        map((result) => result.data?.bookAdded.title)
      )
      .subscribe((title) => {
        if (title) {
          this.lastAddedBookTitle.set(title);
        }
      });
  }

  async ngOnInit(): Promise<void> {
    await this.fetchBookPage(this.pageSize);
  }

  async fetchBookPage(amount: number): Promise<void> {
    const queryParams =
      amount > 0
        ? { first: amount, after: this.lastAuthorCursor.getValue() }
        : { last: Math.abs(amount), before: this.firstAuthorCursor.getValue() };

    if (amount > 0) {
      this.pageNumber += 1;
    } else {
      this.pageNumber -= 1;
    }

    this.paginationLeft = (this.pageNumber - 2) * this.pageSize;
    this.paginationRight = (this.pageNumber - 1) * this.pageSize;

    const pageResult = await lastValueFrom(
      this.graphqlClient
        .paginatedAuthors(queryParams)
        .pipe(map((page) => page.data.authors as AuthorsConnection))
    );

    this.firstAuthorCursor.next(pageResult?.pageInfo?.startCursor ?? null);
    this.lastAuthorCursor.next(pageResult?.pageInfo?.endCursor ?? null);
    this.totalAuthorCount.next(pageResult?.totalCount ?? null);

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
            authorId: this.authorId,
          },
        },
      } as AddBookMutationVariables)
      .pipe(takeUntilDestroyed())
      .subscribe();
  }

  async fetchPreviousPage(): Promise<void> {
    await this.fetchBookPage(-this.pageSize);
  }

  async fetchNextPage(): Promise<void> {
    await this.fetchBookPage(this.pageSize);
  }
}
