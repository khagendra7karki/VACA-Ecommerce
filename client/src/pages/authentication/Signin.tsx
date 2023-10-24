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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../state";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
    dispatch(login(email, password));
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
