import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
function Form() {
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const formSubmit = e => {
    e.preventDefault();
    console.log("submitted");
    axios
      .post("https://reqres.in/api/users", formState, users)
      .then(res => {
        setPost(res.data);
        users(res.data);
        setUsers(users);
        console.log("success", res);
        console.log("users", users);
      })
      .catch(err => console.log(err.response));
  };

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    terms: "",
    password: ""
  });

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Must include your name."),
    email: Yup.string().email("Must be a valid email"),
    password: Yup.string()
      .min(6, "must be atleast 6 characters long")
      .required("Must include a password"),
    terms: Yup.boolean().oneOf([true], "Must accept terms")
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);
  const validateChange = e => {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };
  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        <input
          type="name"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>

      <label htmlFor="password">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={inputChange}
        />
        {errors.password.length > 6 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>

      <label htmlFor="terms">
        Do you agree to the terms?
        <input
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <button disabled={buttonDisabled}>Submit</button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}

export default Form;
