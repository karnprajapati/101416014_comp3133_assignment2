const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    token: String
  }

  type Employee {
    id: ID!
    name: String!
    email: String!
    department: String!
    position: String!
    profilePic: String
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User

    addEmployee(input: EmployeeInput!): Employee

    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
  }

  input EmployeeInput {
    name: String!
    email: String!
    department: String!
    position: String!
    profilePic: String
  }
`;
