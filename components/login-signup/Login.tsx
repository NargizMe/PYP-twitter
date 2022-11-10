"use client";
import React from 'react';
import styled from '@emotion/styled';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    email: Yup.string().email('Invalid email').required('Required'),
});

// const formContainer = {
//     display: 'flex',
//     flexDirection: "column",
// }

const formInput = {
    padding: '10px 25px',
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    width: '100%'
}

const buttonStyle = {
    padding: '15px 25px',
    border: 'none',
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '5px',
    width: '100px',
    fontSize: '16px',
    alignSelf: "end",
}

export default function Login(){
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form
                    style = {{display: "flex", flexDirection: "column", padding: "30px 0", gap:"30px", width: "320px"}}
                >
                    <InputContainer>
                        <MdEmail/>
                        <Field name="email"
                               style={formInput}
                               placeholder='Your email address'
                        />
                    {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <RiLockPasswordFill/>
                        <Field name="password"
                               style={formInput}
                               placeholder='Your password'
                               type='password'
                        />
                    {touched.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    </InputContainer>
                    <button type="submit" style={buttonStyle}>Submit</button>
                </Form>
            )}
        </Formik>
    );
}


// -----------------style-----------------

const InputContainer = styled.div`
  position: relative;
  
  svg{
    position: absolute;
    top: 9px;
  }
`

const ErrorMessage = styled.span`
  color: tomato;
  font-size: 12px;
`