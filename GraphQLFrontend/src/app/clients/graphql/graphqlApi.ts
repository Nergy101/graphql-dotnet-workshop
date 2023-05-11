import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  UUID: any;
};

export type AddAuthorError = CreateAuthorError;

export type AddAuthorInput = {
  books?: InputMaybe<Array<CreateBookInput>>;
  fullName: Scalars['String'];
};

export type AddAuthorPayload = {
  __typename?: 'AddAuthorPayload';
  author?: Maybe<Author>;
  errors?: Maybe<Array<AddAuthorError>>;
};

export type AddBookError = CreateBookError;

export type AddBookInput = {
  book: CreateBookInput;
};

export type AddBookPayload = {
  __typename?: 'AddBookPayload';
  book?: Maybe<Book>;
  errors?: Maybe<Array<AddBookError>>;
};

export type Author = {
  __typename?: 'Author';
  bookCount: Scalars['Int'];
  books: Array<Book>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

export type AuthorFilterInput = {
  and?: InputMaybe<Array<AuthorFilterInput>>;
  books?: InputMaybe<ListFilterInputTypeOfBookFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<AuthorFilterInput>>;
};

export type AuthorSortInput = {
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type Authors2Connection = {
  __typename?: 'Authors2Connection';
  /** A list of edges. */
  edges?: Maybe<Array<Authors2Edge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Author>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type Authors2Edge = {
  __typename?: 'Authors2Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Author;
};

/** A connection to a list of items. */
export type AuthorsConnection = {
  __typename?: 'AuthorsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AuthorsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Author>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type AuthorsEdge = {
  __typename?: 'AuthorsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Author;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  title?: Maybe<Scalars['String']>;
};

export type BookFilterInput = {
  and?: InputMaybe<Array<BookFilterInput>>;
  author?: InputMaybe<AuthorFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<BookFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type BookSortInput = {
  author?: InputMaybe<AuthorSortInput>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type Books2Connection = {
  __typename?: 'Books2Connection';
  /** A list of edges. */
  edges?: Maybe<Array<Books2Edge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Book>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type Books2Edge = {
  __typename?: 'Books2Edge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Book;
};

/** A connection to a list of items. */
export type BooksConnection = {
  __typename?: 'BooksConnection';
  /** A list of edges. */
  edges?: Maybe<Array<BooksEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Book>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type BooksEdge = {
  __typename?: 'BooksEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Book;
};

export type BooksResult = {
  __typename?: 'BooksResult';
  books: Array<Book>;
  count: Scalars['Int'];
};

export type BooksResultSortInput = {
  count?: InputMaybe<SortEnumType>;
};

export type CreateAuthorError = Error & {
  __typename?: 'CreateAuthorError';
  message: Scalars['String'];
};

export type CreateBookError = Error & {
  __typename?: 'CreateBookError';
  message: Scalars['String'];
};

export type CreateBookInput = {
  authorId: Scalars['UUID'];
  title: Scalars['String'];
};

export type CustomBookFilterInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  titleContains: Scalars['String'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type DeleteAuthorInput = {
  id: Scalars['ID'];
};

export type DeleteAuthorPayload = {
  __typename?: 'DeleteAuthorPayload';
  uuid?: Maybe<Scalars['UUID']>;
};

export type DeleteBookInput = {
  id: Scalars['UUID'];
};

export type DeleteBookPayload = {
  __typename?: 'DeleteBookPayload';
  uuid?: Maybe<Scalars['UUID']>;
};

export type Error = {
  message: Scalars['String'];
};

export type HealthPayload = {
  __typename?: 'HealthPayload';
  string?: Maybe<Scalars['String']>;
};

export type ListFilterInputTypeOfBookFilterInput = {
  all?: InputMaybe<BookFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<BookFilterInput>;
  some?: InputMaybe<BookFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor: AddAuthorPayload;
  addBook: AddBookPayload;
  deleteAuthor: DeleteAuthorPayload;
  deleteBook: DeleteBookPayload;
  health: HealthPayload;
};


export type MutationAddAuthorArgs = {
  input: AddAuthorInput;
};


export type MutationAddBookArgs = {
  input: AddBookInput;
};


export type MutationDeleteAuthorArgs = {
  input: DeleteAuthorInput;
};


export type MutationDeleteBookArgs = {
  input: DeleteBookInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authors?: Maybe<AuthorsConnection>;
  authors2?: Maybe<Authors2Connection>;
  book?: Maybe<Book>;
  books?: Maybe<BooksConnection>;
  books2?: Maybe<Books2Connection>;
  books3: BooksResult;
};


export type QueryAuthorArgs = {
  id: Scalars['UUID'];
};


export type QueryAuthorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<AuthorSortInput>>;
  where?: InputMaybe<AuthorFilterInput>;
};


export type QueryAuthors2Args = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<AuthorSortInput>>;
  where?: InputMaybe<AuthorFilterInput>;
};


export type QueryBookArgs = {
  id: Scalars['UUID'];
};


export type QueryBooksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<BookSortInput>>;
  where?: InputMaybe<BookFilterInput>;
};


export type QueryBooks2Args = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<BookSortInput>>;
  where?: InputMaybe<BookFilterInput>;
};


export type QueryBooks3Args = {
  filter: CustomBookFilterInput;
  order?: InputMaybe<Array<BooksResultSortInput>>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  bookAdded: Book;
  bookDeleted: Scalars['UUID'];
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
  ngt?: InputMaybe<Scalars['UUID']>;
  ngte?: InputMaybe<Scalars['UUID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  nlt?: InputMaybe<Scalars['UUID']>;
  nlte?: InputMaybe<Scalars['UUID']>;
};

export type AddBookMutationVariables = Exact<{
  bookInput: AddBookInput;
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'AddBookPayload', book?: { __typename?: 'Book', id: any } | null } };

export type DeleteBookMutationVariables = Exact<{
  deleteBook: DeleteBookInput;
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook: { __typename?: 'DeleteBookPayload', uuid?: any | null } };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename?: 'Query', books?: { __typename?: 'BooksConnection', nodes?: Array<{ __typename?: 'Book', id: any, title?: string | null, createdAt: any }> | null } | null };

export type BooksSortedQueryVariables = Exact<{
  sorting?: InputMaybe<Array<BookSortInput> | BookSortInput>;
}>;


export type BooksSortedQuery = { __typename?: 'Query', books2?: { __typename?: 'Books2Connection', nodes?: Array<{ __typename?: 'Book', id: any, title?: string | null, createdAt: any }> | null } | null };

export type PaginatedAuthorsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type PaginatedAuthorsQuery = { __typename?: 'Query', authors?: { __typename?: 'AuthorsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges?: Array<{ __typename?: 'AuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, fullName?: string | null, books: Array<{ __typename?: 'Book', id: any, title?: string | null }> } }> | null } | null };

export type BooksAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BooksAddedSubscription = { __typename?: 'Subscription', bookAdded: { __typename?: 'Book', id: any, title?: string | null } };

export const AddBookDocument = gql`
    mutation AddBook($bookInput: AddBookInput!) {
  addBook(input: $bookInput) {
    book {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddBookMutationService extends Apollo.Mutation<AddBookMutation, AddBookMutationVariables> {
    override document = AddBookDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteBookDocument = gql`
    mutation DeleteBook($deleteBook: DeleteBookInput!) {
  deleteBook(input: $deleteBook) {
    uuid
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBookMutationService extends Apollo.Mutation<DeleteBookMutation, DeleteBookMutationVariables> {
    override document = DeleteBookDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BooksDocument = gql`
    query Books {
  books {
    nodes {
      id
      title
      createdAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BooksQueryService extends Apollo.Query<BooksQuery, BooksQueryVariables> {
    override document = BooksDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BooksSortedDocument = gql`
    query BooksSorted($sorting: [BookSortInput!]) {
  books2(order: $sorting) {
    nodes {
      id
      title
      createdAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BooksSortedQueryService extends Apollo.Query<BooksSortedQuery, BooksSortedQueryVariables> {
    override document = BooksSortedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PaginatedAuthorsDocument = gql`
    query PaginatedAuthors($first: Int, $last: Int, $before: String, $after: String) {
  authors(first: $first, last: $last, before: $before, after: $after) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        fullName
        books {
          id
          title
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PaginatedAuthorsQueryService extends Apollo.Query<PaginatedAuthorsQuery, PaginatedAuthorsQueryVariables> {
    override document = PaginatedAuthorsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BooksAddedDocument = gql`
    subscription BooksAdded {
  bookAdded {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BooksAddedSubscriptionService extends Apollo.Subscription<BooksAddedSubscription, BooksAddedSubscriptionVariables> {
    override document = BooksAddedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

  interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

  interface MutationOptionsAlone<T, V> extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}

  interface SubscriptionOptionsAlone<V> extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class GraphQLClient {
    constructor(
      private addBookMutationService: AddBookMutationService,
      private deleteBookMutationService: DeleteBookMutationService,
      private booksQueryService: BooksQueryService,
      private booksSortedQueryService: BooksSortedQueryService,
      private paginatedAuthorsQueryService: PaginatedAuthorsQueryService,
      private booksAddedSubscriptionService: BooksAddedSubscriptionService
    ) {}
      
    addBook(variables: AddBookMutationVariables, options?: MutationOptionsAlone<AddBookMutation, AddBookMutationVariables>) {
      return this.addBookMutationService.mutate(variables, options)
    }
    
    deleteBook(variables: DeleteBookMutationVariables, options?: MutationOptionsAlone<DeleteBookMutation, DeleteBookMutationVariables>) {
      return this.deleteBookMutationService.mutate(variables, options)
    }
    
    books(variables?: BooksQueryVariables, options?: QueryOptionsAlone<BooksQueryVariables>) {
      return this.booksQueryService.fetch(variables, options)
    }
    
    booksWatch(variables?: BooksQueryVariables, options?: WatchQueryOptionsAlone<BooksQueryVariables>) {
      return this.booksQueryService.watch(variables, options)
    }
    
    booksSorted(variables?: BooksSortedQueryVariables, options?: QueryOptionsAlone<BooksSortedQueryVariables>) {
      return this.booksSortedQueryService.fetch(variables, options)
    }
    
    booksSortedWatch(variables?: BooksSortedQueryVariables, options?: WatchQueryOptionsAlone<BooksSortedQueryVariables>) {
      return this.booksSortedQueryService.watch(variables, options)
    }
    
    paginatedAuthors(variables?: PaginatedAuthorsQueryVariables, options?: QueryOptionsAlone<PaginatedAuthorsQueryVariables>) {
      return this.paginatedAuthorsQueryService.fetch(variables, options)
    }
    
    paginatedAuthorsWatch(variables?: PaginatedAuthorsQueryVariables, options?: WatchQueryOptionsAlone<PaginatedAuthorsQueryVariables>) {
      return this.paginatedAuthorsQueryService.watch(variables, options)
    }
    
    booksAdded(variables?: BooksAddedSubscriptionVariables, options?: SubscriptionOptionsAlone<BooksAddedSubscriptionVariables>) {
      return this.booksAddedSubscriptionService.subscribe(variables, options)
    }
  }