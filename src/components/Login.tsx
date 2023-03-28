import { Button, TextField, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../css/login.css";

//form types
interface IValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values: IValues) => {
        navigate("/home");
      }}
    >
      {({ errors, handleChange, values }) => {
        console.log("errors : ", values);

        return (
          <Form className="login_container" autoComplete="off">
            <Typography variant="h5">Log into account</Typography>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              onChange={handleChange}
            />
            {errors.username ? <small>{errors.username}</small> : <></>}
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
            />
            {errors.password ? <small>{errors.password}</small> : <></>}
            <Button
              variant="contained"
              type="submit"
              disabled={
                values.password === "" || values.username === "" ? true : false
              }
              defaultChecked={false}
            >
              Log in
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
