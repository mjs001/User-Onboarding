import React, { useState, useEffect } from "react";
import * as Yup from "yup";

function Form() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const formSubmit = e => {
    e.preventDefault();
    console.log("submitted");
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

  const inputChange = e => {
    e.persist();
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
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

    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  return (
    <form>
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
      <button>Submit</button>
    </form>
  );
}

export default Form;
