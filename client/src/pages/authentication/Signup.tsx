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
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useNavigate } from 'react-router-dom';
  
  export function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
//    const notifications = useNotifications();
    const { register } = bindActionCreators(actionCreators, dispatch);
  
    const form = useForm({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      // validationRules: {
      //   name: (value) => value.trim().length > 1,
      //   email: (value) => /^\S+@\S+$/.test(value),
      //   password: (value) => value.trim().length >= 6,
      //   confirmPassword: (confirmPassword, values) =>
      //     confirmPassword === values?.password,
      // },
      // errorMessages: {
      //   name: "Name should be more than 2 characters or longer",
      //   email: "Email is not valid",
      //   password: "Password should be 6 characters or longer",
      //   confirmPassword: "Passwords does not match",
      // },
    });
  
    const { userInfo, loading, error } = useSelector(
      (state: RootStateOrAny) => state.userRegister
    );
  
    const handlerRegister = (values: any) => {
      const { name, email, password } = values;
      register(name, email, password)
      //dispatch(register(name, email, password));
    };
  
    // useEffect(() => {
    //   if (error) {
    //     notifications.showNotification({
    //       title: "Oh no!",
    //       message: error && error.message,
    //       color: "red",
    //     });
    //   } // eslint-disable-next-line
    // }, [error]);
  
    useEffect(() => {
      if (userInfo) {
        navigate("/");
      } // eslint-disable-next-line
    }, [userInfo]);
    return (
      <form onSubmit={form.onSubmit((values) => handlerRegister(values))}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Vaca
          </Title>
  
          <TextInput label="Name" placeholder="Your Name" size="md"  {...form.getInputProps("name")} />
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md" {...form.getInputProps("email")} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"   {...form.getInputProps("password")} />
          <PasswordInput label="Confirmation" placeholder="Confirm Password" mt="md" size="md"   {...form.getInputProps("confirmPassword")} />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md"   type="submit">
          Sign Up
          </Button>
  
          <Text ta="center" mt="md">
          Already have an account?{' '}
            <Anchor<'a'> href="/login" fw={700} 
            //onClick={(event) => event.preventDefault()}
            >
            Log in
            </Anchor>
          </Text>
        </Paper>
      </div>
      </form>
    );
  }