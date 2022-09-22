import classes from "./SignUp.module.scss";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import { User } from "../../models/user.model";

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    //.min(2, "Too Short!")
    //.max(50, "Too Long!")
    .required("שדה חובה"),
  email: Yup.string().email("Invalid email").required("שדה חובה"),
  password: Yup.number()
    .min(8, "Too Short!")
    //.max(10, "Too Long!")
    .required("שדה חובה"),
});

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const signUp = async (event: User) => {
    try {
      await authService.signUp(event.userName!, event.email, event.password);
      navigate("/");
    } catch {
      alert("erorr");
    }
  };
  const login = () => {
    navigate("/");
  };
  return (
    <div className={classes.signupForm}>
      <div className={classes.signupaCrdForm}>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values: User, { setSubmitting }: FormikHelpers<User>) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 3));
              signUp(values);
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.inputSignup}>
              <p className={classes.WelcomeStryleSignup}>
                Welcome to Tiles Store
              </p>
              <p className={classes.pStryleSignup}>userName</p>
              <Field
                name="userName"
                placeholder="userName"
                className={classes.inpotStryleSingup}
              />
              {errors.userName && touched.userName ? (
                <div>{errors.userName}</div>
              ) : null}
              <p className={classes.pStryleSignup}>Email</p>
              <Field
                name="email"
                type="email"
                placeholder="email"
                className={classes.inpotStryleSingup}
              />
              <p className={classes.pStryleSignup}>Password</p>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <Field
                name="password"
                type="password"
                placeholder="password"
                className={classes.inpotStryleSingup}
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <div className={classes.buttonSignup}>
                <button type="submit" className={classes.buttonStryleSignup}>
                  Sign Up
                </button>
                <button
                  onClick={login}
                  className={classes.buttonStryleLoginInSignup}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
