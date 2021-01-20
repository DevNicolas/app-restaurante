import React, { useEffect } from "react";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Button, Input, InputGroup, Label } from "reactstrap";
import { isAuth, setAuth } from "../../utils/globalVariables";
import { useHistory } from "react-router-dom";
import { BiUser, BiLogIn } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

function Index(props) {
  const history = useHistory();

  useEffect(() => {
    if (isAuth()) {
      history.push("/");
    }
  }, []);

  return (
    <div className="container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .matches(
              /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
              "No es un formato de correo"
            )
            .required("Este campo es obligatorio"),
          password: Yup.string()
            .required("Este campo es obligatorio")
            .matches(
              /^(?=.*[A-Z])(?=.*\d)(?=.*)[A-Za-z\d]{7,}$/,
              "Tu contraseña debe tener minimo 7 Caracteres, 1 Mayuscula(inicial) y 1 Numero"
            ),
        })}
        onSubmit={(values) => {
          fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          })
            .then(async (response) => {
              const data = await response.json();

              // check for error response
              if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });

          setAuth(values);
          props.change(true);
          history.push("/");
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <h1>
              Inicia Sesion <BiUser />
            </h1>
            <Label htmlFor="email">
              Email <AiOutlineMail />:{" "}
            </Label>
            <InputGroup>
              <Input
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <div className="field-error">
                    <small className="text-danger">{msg}</small>
                  </div>
                )}
              </ErrorMessage>
            </InputGroup>
            <Label htmlFor="password">
              password <RiLockPasswordFill />:
            </Label>
            <InputGroup>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <div className="field-error">
                    <small className="text-danger">{msg}</small>
                  </div>
                )}
              </ErrorMessage>
            </InputGroup>
            <Button
              color="primary"
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ cursor: "pointer", marginTop: "10px" }}
            >
              Ingresar <BiLogIn />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Index;
