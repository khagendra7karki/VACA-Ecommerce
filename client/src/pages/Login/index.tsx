import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';

import { State, actionCreators } from "../../state";


import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./Signin.module.css";
import Layout from "../../Layout/Layout";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";


export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // auth provider for google
  const Provider = new GoogleAuthProvider();
  const auth = getAuth();

  const redirectTo = location.search;
  const { login } = bindActionCreators(actionCreators, dispatch);

  const { userInfo, loading, error } = useSelector(
    (state: State) => state.userLogin
  );

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    // validate: {
    //   email: (value) => /^\S+@\S+$/.test(value),
    //   password: (value) => value.trim().length >= 6,
    // },
    // errorMessages: {
    //   email: "Email is not valid",
    //   password: "Password is not valid",
    // },
  });

  useEffect(() => {
    if (userInfo) {
      if (redirectTo === "?redirect=shipping") {
        navigate("/shipping");
      } else {
        navigate("/");
      }
    }
    // eslint-disable-next-line
  }, [userInfo]);

  const handlerLogin = (values: any) => {
    
    const { email, password } = values;
    console.log(email, password, "email and password")
    login(email, password);
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Oh no!",
        message: error && error.message,
        color: "red",
      });
    }
    // eslint-disable-next-line
  }, [error]);

  const googleLogin = ( e: React.MouseEvent ) =>{
    e.preventDefault()
    signInWithPopup( auth, Provider ).then( ( result ) =>{
      const userInfo = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL
      }
    })

    

  }

  return (
    <Layout>
      <form
       onSubmit={form.onSubmit((values) => handlerLogin(values))}
       //onSubmit={form.onSubmit(console.log)}
       >
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title
              order={2}
              className={classes.title}
              ta="center"
              mt="md"
              mb={50}
            >
              Welcome back to VACA
            </Title>

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
            <Button fullWidth type="submit" mt="xl" size="md">
              Login
            </Button>

            <Button fullWidth onClick = { googleLogin }>
              Login With Google
            </Button>

            <Text ta="center" mt="md">
              Don&apos;t have an account?{" "}
              <Anchor
               // href="/signup"
                //target="_blank"
                underline="hover"
                onClick={(event) => {
                 // event.preventDefault()
                  navigate("/signup")
                }
              }
              >
                Register
              </Anchor>
            </Text>
          </Paper>
        </div>
      </form>
    </Layout>
  );
}
