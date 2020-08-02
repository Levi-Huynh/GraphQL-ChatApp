import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Flex,
  Text, 
  Image
} from "@chakra-ui/core";

import landing from '../../assets/login.png'

import {css, csx} from '@emotion/core'

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const LOGIN_USER = gql`
  mutation InsertUsers($name: String!, $password: String!) {
    insert_users(objects: { name: $name, password: $password }) {
      returning {
        id
        name
      }
    }
  }
`;

const Login = ({ history }) => {
  const [state, setState] = useState({
    name: "",
    password: ""
  });

  const [insert_users, { data }] = useMutation(LOGIN_USER);

  useEffect(() => {
    const user = data && data.insert_users.returning[0];
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/chat");
    }
  }, [data]);
  const { handleSubmit, errors, register, formState } = useForm();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error || true;
  }

  function validatePassword(value) {
    let error;
    if (value.length <= 4) {
      error = "Password should be 6 digit long";
    }

    return error || true;
  }

  const onInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    insert_users({ variables: { name: state.name, password: state.password } });

    setState({ name: "", password: "" });
  };

  return (

    <Flex
    direction="row"
    justify="center"
   border='1px'
    >
  
 
<Box 
mt={100}
w="45%"

>

    <Text
 color="#5243C0"
mb={0}
    fontSize={45}
   
    >GraphQL ChatApp. Connect.</Text>  
<Image src={landing} alt="landing"></Image>
</Box>




    
<Flex
       direction="column"
       align="center"
       justify="center"
       
       w="50%"
       mt={50}
       >
 


      
    <Box
     mt={300}
    w="50%"
    h="70vh"
   
    >
    
      <form 
  
      
      onSubmit={handleSubmit(onSubmit)}>
        <FormControl 
        mt={30}
        
        isInvalid={errors.name}>
          <FormLabel  color="#5243C0" htmlFor="name">Name</FormLabel>
          <Input
            name="name"
            placeholder="name"
            onChange={onInputChange}
            ref={register({ validate: validateName })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel color="#5243C0" htmlFor="name">Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={onInputChange}
            ref={register({ validate: validatePassword })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          bg="#5243C0"
          color="white"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
    </Flex>
    {/* </Box> */}
    </Flex>
  );
};

export default Login;