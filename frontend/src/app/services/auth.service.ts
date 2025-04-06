import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {
    const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    }).pipe(
      map((result: any) => result.data.login.token)
    );
  }
  
  signup(name: string, email: string, password: string) {
    const SIGNUP_MUTATION = gql`
      mutation Signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
          id
        }
      }
    `;
  
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { name, email, password },
    });
  }
  
}
