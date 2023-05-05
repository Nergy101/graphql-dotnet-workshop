import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:64148/graphql',
  documents: './src/**/*.graphql',
  generates: {
    './src/app/clients/graphql/graphqlApi.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
    }
  }
}
export default config
