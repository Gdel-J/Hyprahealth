import { gql } from '@apollo/client';


export const MEAL = gql`
  query Meal($id: ID!) {
    meal(id: $id) {
      id
      name
      description
      calories
      // Include any other fields you're interested in
    }
  }
`;