import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const MyForm = ({ values, errors, touched, status }) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);
  
    const [user, setUser] = useState([]);
  
    useEffect(() => {
      console.log("status has changed!", status);
      
      status && setUser(user => [...user, status]);
    }, [status]);
    return (
      <div className="form">
       
        <Form>
          <label htmlFor="name" className="name">
            Name <br/>
            <Field
              id="name"
              type="text"
              name="name"
              placeholder="name"
            />
            {touched.name && errors.name && (
              <p className="errors">{errors.name}</p>
            )}
          </label>
          <label htmlFor="email" className="email">
            Email<br/>
            <Field id="email" type="email" name="email" placeholder="email" />
            {touched.email && errors.email && (
              <p className="errors">{errors.email}</p>
            )}
          </label>
          <label htmlFor="password" className="password">
            Password <br/>
            <Field id="password" type="password" name="password" placeholder="password" />
            {touched.password && errors.password && (
                <p className="errors">{errors.password}</p>
            )}
          </label>
          <label className="terms-container">
            Agree to Terms?
            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
            />
            <span className="checkmark" />
          </label>
          <button type="submit">Submit!</button>
        </Form>
        {user.map(user => {
          return (
            
            <ul key={user.id}>
              <li>Name: {user.name}</li>
              <li>Email: {user.email}</li>
            </ul>
          );
        })}
      </div>
    );
  };
  
  const FormikMyForm = withFormik({
  
    mapPropsToValues(props) {
      return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        terms: props.terms || false
      };
    },
  
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required("EMAIL IS MANDATORY")
    }),
  

    handleSubmit(values, { setStatus, resetForm }) {
      console.log("submitting", values);
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          console.log("success", res);
          
          setStatus(res.data);
  
          resetForm();
        })
        .catch(err => console.log(err.response));
    }
  })(MyForm);
  export default FormikMyForm;
  