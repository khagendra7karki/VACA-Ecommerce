import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import {  actionCreators } from "../../../state";

import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Grid,
  Divider,
  Space,
} from "@mantine/core";
import classes from "./Login.module.css";
import { useForm } from "@mantine/form";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { login } = bindActionCreators(actionCreators, dispatch);


  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handlerLogin = (values: any) => {
    const { email, password } = values;
    console.log(email, password, "email and password");
    login(email, password);
  };


  return (
    <Container fluid  pl={0} mb={50}>
      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 100 }}>
        <Grid.Col
          span={{ base: 12 }}
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
                  ta="center"
                  mt="md"
                  mb={5}
                >
                  Welcome Admin
                </Title>
                <Text size="xs" ta = "center">Enter your credential</Text>
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

                <Text ta="center" mt="md">
                  Don&apos;t have an account?{" "}
                  <Anchor
                    underline="hover"
                    onClick={(event) => {
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
