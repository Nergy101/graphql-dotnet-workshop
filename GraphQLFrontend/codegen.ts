import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:64148/graphql',
  documents: './src/app/clients/graphql/*.graphql',
  generates: {
    './src/app/clients/graphql/graphqlApi.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
      config: {
        serviceName: 'GraphQLClient',
        sdkClass: true,
        querySuffix: 'QueryService',
        mutationSuffix: 'MutationService',
        subscriptionSuffix: 'SubscriptionService',
        addExplicitOverride: true,
      },
    },
  },
};
export default config;
