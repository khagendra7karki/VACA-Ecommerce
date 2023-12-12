import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

import { State, actionCreators } from "../../state";

import img1 from "../../assets/img/img1.jpg";

import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Grid,
  Image,
  Divider,
  Space,
} from "@mantine/core";
import classes from "./Signin.module.css";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

function GoogleIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      style={{ width: "0.9rem", height: "0.9rem" }}
      {...props}
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
}

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // auth provider for google
  const Provider = new GoogleAuthProvider();
  const auth = getAuth();

  const { login } = bindActionCreators(actionCreators, dispatch);

  const { isLoggedIn, loading, error } = useSelector(
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
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const handlerLogin = (values: any) => {
    const { email, password } = values;
    console.log(email, password, "email and password");
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

  const googleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithPopup(auth, Provider).then((result) => {
      const userInfo = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };
    });
  };

  return (
    <Container fluid  pl={0} ml={0} mb={50}>
      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 100 }}>
        <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
          <Image src={img1} className={classes.imageSize} />
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 12, lg: 4 }}
          style={{
            display: "flex",
            justifyContent: " center",
            alignItems: "center",
          }}
        >
          <form onSubmit={form.onSubmit((values) => handlerLogin(values))}>
            <div className={classes.wrapper}>
              <Paper className={classes.form} radius={0} p={30}>
                <Title
                  order={2}
                  className={classes.title}
                  ta="left"
                  mt="md"
                  mb={5}
                >
                  Log In
                </Title>
                <Text size="xs">Enter your details below</Text>
                <Space h="xl"></Space>

                <TextInput
                  variant="unstyled"
                  placeholder="Email or Phone "
                  size="md"
                  {...form.getInputProps("email")}
                />
                <Divider my="sm" />
                <PasswordInput
                  variant="unstyled"
                  placeholder="Password"
                  mt="md"
                  size="md"
                  {...form.getInputProps("password")}
                />
                <Divider my="sm" />
                {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
                <Grid>
                  <Grid.Col
                    span={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    {" "}
                    <Button fullWidth type="submit" size="md" color="#DB4444">
                      Login
                    </Button>
                  </Grid.Col>
                  <Grid.Col
                    span={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text fw={500}>Forget Password ? </Text>
                  </Grid.Col>
                </Grid>
                <Space h="xl" />
                <Text ta="center" size="xs">
                  Or, Login with
                </Text>

                <Button
                  fullWidth
                  mt="md"
                  leftSection={<GoogleIcon />}
                  variant="default"
                  onClick={googleLogin}
                >
                  Login With Google
                </Button>

                <Text ta="center" mt="md">
                  Don&apos;t have an account?{" "}
                  <Anchor
                    underline="hover"
                    onClick={(event) => {
                      // event.preventDefault()
                      navigate("/signup");
                    }}
                  >
                    Register
                  </Anchor>
                </Text>
              </Paper>
            </div>
          </form>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
