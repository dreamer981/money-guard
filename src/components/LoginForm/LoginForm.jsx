import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    passowrd: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli e-mail giriniz")
      .required("Zorunlu Alan"),
    passowrd: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .max(12, "Şifre en fazla 12 karakter olmalıdır")
      .required("Zorunlu Alan"),
  });

  const loginSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginSubmit}
      >
        <Form>
          <Field
            type="email"
            name="email"
            id="email"
            placeholder="e-mail giriniz"
          />
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="parolayı giriniz"
          />
          <button type="submit">Giriş Yap</button>
          <button type="button" onClick={() => navigate("/register")}>
            Kayıt Ol
          </button>
        </Form>
      </Formik>
    </div>
  );
}
