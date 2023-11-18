import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Grid,
  Image,
  Container,
  Space,
  Divider,
} from "@mantine/core";
import img1 from "../../assets/img/img2.jpg";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
interface credential {
  email: string;
  password: string;
  fullName: string;
}
export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register } = bindActionCreators(actionCreators, dispatch);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });
  const handleSubmit = (values: credential) => {
    register(values.fullName, values.email, values.password);

    // console.log(`A user has been register \n`, values)
  };

  return (
    <Container fluid h={800} bg="var(--mantine-color-blue-light)" pl={0} ml={0} mb = {50}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 100 }}>
        <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
          <Image  src={img1} h={781} w = 'auto' fit="contain" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 4 }} style = {{display:'flex', justifyContent  :' center' , alignItems :'center'}}>
          <form
            onSubmit={form.onSubmit((values) => {
              handleSubmit(values);
            })}
          >
            <div className={classes.wrapper}>
              <Paper className={classes.form} radius={0} p={30}>
                <Title
                  order={2}
                  className={classes.title}
                  ta="left"
                  mt="md"
                  mb={5}
                >
                Create an account
                </Title>
                <Text size="xs">Enter your details below</Text>
                <Space h= 'xl'></Space>

                <TextInput
                variant="unstyled"
                 // label="Email address"
                  placeholder="Name"
                  size="md"
                  {...form.getInputProps("fullName")}
                />
                <Divider my="sm" />

                <TextInput
                variant="unstyled"
                 // label="Email address"
                  placeholder="Email or Phone Number"
                  size="md"
                  {...form.getInputProps("email")}
                />
 <Divider my="sm" />

                <PasswordInput
                variant="unstyled"
                 // label="Password"
                  placeholder="Password"
                  mt="md"
                  size="md"
                  {...form.getInputProps("password")}
                />
                <Divider my="sm" />

                {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
                <Button fullWidth mt="xl" size="md" type="submit" color = '#DB4444'>
                  Register
                </Button>

                <Text ta="center" mt="md">
                  Alread have an account?{" "}
                  <Anchor<"a">
                    href="#"
                    fw={700}
                    onClick={(event) => navigate("/login")}
                  >
                    Login
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
