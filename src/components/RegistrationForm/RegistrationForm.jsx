import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { register } from "../../redux/auth/operations";

export default function RegistrationPage() {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("İsim zorunludur"),
    email: Yup.string().email("Geçerli email giriniz").required("Email zorunludur"),
    password: Yup.string().min(6, "Şifre en az 6 karakter olmalıdır").max(12,"Şifre en fazla 12 karakter olmalıdır").required("Zorunludur!"),
  });
  

  const registerSubmit = (values)=>{
    dispatch(register(values))
  }


  return <div>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={registerSubmit}>
        <Form>
        <Field type="text" id="username" name="username" placeholder="İsim giriniz" />
        <Field type="email" id="email" name="email" placeholder="e-mail giriniz" />
            <Field type="password" id="password" name="password" placeholder="parolayı giriniz" />
            <button type="submit" >Kayıt Ol</button>
        </Form>
    </Formik>
  </div>;
}
