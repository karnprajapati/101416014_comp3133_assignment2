import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees() {
    const EMPLOYEES_QUERY = gql`
      query {
        getAllEmployees {
          id
          name
          email
          position
          department
        }
      }
    `;

    return this.apollo.watchQuery<any>({
      query: EMPLOYEES_QUERY,
    }).valueChanges.pipe(map((result) => result.data.getAllEmployees));
  }
  deleteEmployee(id: string) {
    const DELETE_EMPLOYEE_MUTATION = gql`
      mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id) {
          id
        }
      }
    `;
  
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: { id },
    });
  }
  getEmployeeById(id: string) {
    const GET_EMPLOYEE_QUERY = gql`
      query GetEmployee($id: ID!) {
        getEmployeeById(id: $id) {
          id
          name
          email
          position
          department
          profilePic
        }
      }
    `;
  
    return this.apollo.watchQuery<any>({
      query: GET_EMPLOYEE_QUERY,
      variables: { id },
    }).valueChanges.pipe(map(result => result.data.getEmployeeById));
  }
updateEmployee(id: string, data: any) {
  const UPDATE_EMPLOYEE_MUTATION = gql`
    mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
      updateEmployee(id: $id, input: $input) {
        id
        name
        email
        position
        department
      }
    }
  `;

  return this.apollo.mutate({
    mutation: UPDATE_EMPLOYEE_MUTATION,
    variables: {
      id,
      input: data,
    },
  });
}
addEmployee(data: any) {
  const ADD_EMPLOYEE_MUTATION = gql`
    mutation AddEmployee($input: EmployeeInput!) {
      addEmployee(input: $input) {
        id
        name
        email
        position
        department
      }
    }
  `;

  return this.apollo.mutate({
    mutation: ADD_EMPLOYEE_MUTATION,
    variables: {
      input: data,
    },
  });
}
}
