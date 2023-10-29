import {
    Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
  } from '@mantine/core';
import classes from './Signup.module.css';
import createNewUser from '../../firebase/createNewUser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, actionCreators } from '../../state'
  
interface credential {
  email: string,
  password: string,
  fullName: string,
}
export function Signup() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register } = bindActionCreators( actionCreators , dispatch )

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password:"",
      fullName: "",

    }
  })
  const handleSubmit = (values: credential ) =>{
    register( values.fullName, values.email, values.password )

    // console.log(`A user has been register \n`, values)
  }

  return (
    <form onSubmit = { form.onSubmit(( values ) => { handleSubmit( values )})}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Mantine!
          </Title>

          <TextInput 
            label="Email address" 
            placeholder="Ram Sharma" 
            size="md"
            {...form.getInputProps("fullName")}
             />
          
          <TextInput 
            label="Email address" 
            placeholder="hello@gmail.com" 
            size="md"
            {...form.getInputProps("email")}
             />
          
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            mt="md"
            size="md"
            {...form.getInputProps("password")} 
            />
          
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button 
            fullWidth mt="xl" 
            size="md"
            type = 'submit'
            >
                    
            Register
          </Button>

          <Text ta="center" mt="md">
            Alread have an account?{' '}
            <Anchor<'a'> href="#" fw={700} onClick={(event) => navigate('/login')}>
              Login
            </Anchor>
          </Text>
        </Paper>
      </div>
    </form>
  );
}