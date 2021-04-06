import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import styled from 'styled-components';

// import UserForm from '../components/UserForm';
import Button from '../components/Button';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  // set default state
  const [values, setValues] = useState();

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    // update the document title
    document.title = 'Sign Up — Notedly';
  });

  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      console.log(data.signUp);
      // store the token
      localStorage.setItem('token', data.signUp);
      // update the local cache
      client.writeData({ data: { isLoggedIn: true } });
      // redirect the user to the homepage
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <Wrapper>
        <Form
          onSubmit={event => {
            event.preventDefault();
            console.log(values);
            signUp({
              variables: {
                ...values
              }
            });
          }}>

          <label htmlFor="username">Username:</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={onChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={onChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Wrapper>

    </React.Fragment>
  );
};

export default SignUp;
