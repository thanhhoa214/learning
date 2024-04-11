import { NgModule } from '@angular/core';
import { environment } from '../../src/environments/environment';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, DefaultOptions } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { Store } from '@ngxs/store';
import { LoginState } from './auth/login/store';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const getJoinedLink = (store: Store) =>
  ApolloLink.from([
    setContext(() => {
      const token = store.selectSnapshot(LoginState.getToken);
      return {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
    }),
    // createUploadLink is obliged to upload file
    createUploadLink({ uri: `${environment.API_URL}/api/graphql/` }),
  ]);

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (store: Store) => ({
        cache: new InMemoryCache({
          addTypename: false,
        }),
        link: getJoinedLink(store),
        defaultOptions: defaultOptions,
      }),
      deps: [Store],
    },
  ],
})
export class GraphQLModule {}
