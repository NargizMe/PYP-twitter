import React, { ChangeEvent, MouseEvent, useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import { MdEmail, MdOutlineImage, MdOutlineCancelPresentation } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import userService from "../../services/user.service";
import { useUserState } from "../../state/user.state";
import { useRouter } from "next/router";
import signScss from './logSign.module.scss';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
});

export default function SignUp() {
  const router = useRouter();
  const userStore = useUserState();

  const[url, setUrl] = useState('');
  const [imgVal, setImgVal] = useState('');
  const [imageSupa, setImageSupa] = useState<File | null>(null);

  function onUploadImage(e: ChangeEvent<HTMLInputElement>){
    setImgVal(e.target.value);
    const file = Array.from(e.target.files as FileList)[0]
    const localUrl = URL.createObjectURL(file);
    setUrl(localUrl);
    setImageSupa(file);
  }

  function handleCancelImage(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    setImgVal('');
    setUrl('');
  }

  async function onSubmit(values: FormikValues) {

    const { data, error } = await userService.createUser(values);

    if (error) {
      alert(JSON.stringify(error));
      return;
    }

    // save to my users table
    const { userData, userError} = await userService.saveUserToDB(values, imageSupa, data.user!.id)

    if (userError) {
      alert(JSON.stringify(userError));
      return;
    }

    let check;
    if(userData || imageSupa?.name){
      check = userData.find((item) => item.image?.includes(imageSupa!.name.replaceAll(" ", '')));
    }
    console.log('chec', check);
    if(check && check.image){
      console.log('mmmm');
      // if image selected and users table is success -> upload an image
      const { status, imageData, imageError } = await userService.uploadImage(imageSupa, check.image );

      if(data && data.user){
        userStore.saveUser({
          id: data.user.id,
          email: data.user.email as string,
          name: userData[0].name,
          role: data.user.role || null,
          image: status === 'success' ? imageData!.path: null
        })
        await router.push('/');
      }
    } else{
      console.log('hghghg');
      if(data && data.user){
        userStore.saveUser({
          id: data.user.id,
          email: data.user.email as string,
          name: userData[0].name,
          role: data.user.role || null,
          image: null
        })
        await router.push('/');
      }
    }
  }

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: ""
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={signScss.logSignForm}>
          <div className={signScss.logSignInputContainer}>
            <BsFillPersonFill />
            <Field name="fullName"
                   className={signScss.logSignInput}
                   placeholder="Your full name"
            />
            {touched.email && errors.email && <span className={signScss.logSignErrorSpan}>{errors.email}</span>}
          </div>
          <div className={signScss.logSignInputContainer}>
            <MdEmail />
            <Field name="email"
                   className={signScss.logSignInput}
                   placeholder="Your email address"
            />
            {touched.email && errors.email && <span className={signScss.logSignErrorSpan}>{errors.email}</span>}
          </div>
          <div className={signScss.logSignInputContainer}>
            <RiLockPasswordFill />
            <Field name="password"
                   className={signScss.logSignInput}
                   placeholder="Your password"
                   type="password"
            />
            {touched.password && errors.password && <span className={signScss.logSignErrorSpan}>{errors.password}</span>}
          </div>
          <label className={signScss.signUpLabel} htmlFor='img'>
            <MdOutlineImage/>
            <span>Your profile picture</span>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              value ={imgVal}
              onChange={onUploadImage}
            />
          </label>
          <div className={signScss.signUpButtonContainer}>
            {
              url?
                <div>
                  <Image src={url} alt='blah' width={200} height={100} />
                  <button onClick={handleCancelImage}>
                    <MdOutlineCancelPresentation/>
                  </button>
                </div>
                :null
            }
            <button type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}