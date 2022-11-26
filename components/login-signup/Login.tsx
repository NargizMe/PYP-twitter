import React, { useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import userService from "../../services/user.service";
import { useRouter } from "next/router";
import { useUserState } from "../../state/user.state";
import loginScss from './logSign.module.scss';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  email: Yup.string().email("Invalid email").required("Required")
});

// const formContainer = {
//     display: 'flex',
//     flexDirection: "column",
// }

export default function Login() {
  const [loading, setLoading] = useState(false);

  const userStore = useUserState();
  const router = useRouter();

  async function onSubmit(values: FormikValues) {
    setLoading(true);
    const { data, error } = await userService.signin(values);

    if (error) {
      alert(JSON.stringify(error));
      return;
    }
    if (data && data.user) {
      const { userData, userError } = await userService.getUser(data.user.email as string);

      if (userData) {
        userStore.saveUser({
          id: userData[0].user_id,
          email: userData[0].email,
          name: userData[0].name,
          role: userData[0].role,
          image: userData[0].image
        });
        await router.push("/");
      }
    }
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={loginScss.logSignForm}>
          <div className={loginScss.logSignInputContainer}>
            <MdEmail />
            <Field name="email"
                   className={loginScss.logSignInput}
                   placeholder="Your email address"
            />
            {touched.email && errors.email && <span className={loginScss.logSignErrorSpan}>{errors.email}</span>}
          </div>
          <div className={loginScss.logSignInputContainer}>
            <RiLockPasswordFill />
            <Field name="password"
                   className={loginScss.logSignInput}
                   placeholder="Your password"
                   type="password"
            />
            {touched.password && errors.password && <span className={loginScss.logSignErrorSpan}>{errors.password}</span>}
          </div>
          <button type="submit" className={loginScss.loginSignButton} disabled={loading}>
            {
              loading? 'Submiting' : 'Submit'
            }
          </button>
        </Form>
      )}
    </Formik>
  );
}