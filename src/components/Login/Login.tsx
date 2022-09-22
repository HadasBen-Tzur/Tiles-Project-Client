import classes from "./Login.module.scss";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user.model";
import authService from "../../services/auth.service";
import { TilesContext } from "../../context/tokenAndTile.context";
import { useContext } from "react";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("שדה חובה"),
  password: Yup.number()
    .min(8, "Too Short!")
    //.max(10, "Too Long!")
    .required("שדה חובה"),
});

export const Login: React.FC = () => {
  const { setToken } = useContext(TilesContext);
  const navigate = useNavigate();
  const login = async (event: User) => {
    try {
      await authService.login(event.email, event.password, setToken);
      navigate("/tiles");
    } catch {
      alert("erorr");
    }
  };
  const signUp = () => {
    navigate("/signUp");
  };
  return (
    <div className={classes.LoginForm}>
      <div className={classes.LoginCardForm}>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(
              values: User,
              { setSubmitting }: FormikHelpers<User>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                login(values);
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ errors, touched }) => (
              <Form className={classes.inputLogin}>
                <i
                  className="fa fa-user-circle"
                  aria-hidden="true"
                  id={classes.i}
                ></i>
                <div className={classes.pAndInputStryleLogin}>
                  <p className={classes.pStryleLogin}>Email</p>
                  <Field
                    name="email"
                    type="email"
                    placeholder="email"
                    className={classes.inpotStryleLogin}
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <p className={classes.pStryleLogin}>Password</p>
                  <Field
                    name="password"
                    type="password"
                    placeholder="password"
                    className={classes.inpotStryleLogin}
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
                <div className={classes.buttonLogin}>
                  <button type="submit" className={classes.buttonStryleLogin}>
                    Login
                  </button>
                  <button
                    onClick={signUp}
                    className={classes.buttonStryleSingUpInLogin}
                  >
                    SignUp
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  );
};
