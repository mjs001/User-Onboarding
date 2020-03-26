import React from "react";

const formSubmit = e => {
    e.preventDefault();
    console.log("submitted")
};

const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: ""
});

function Form() {
    return (
        <form>
            <label htmlFor="name">
                Name
            <input type="email" name="email" placeholder="Email" />
            />
            <label htmlFor="email">
            <input type="password" name="password" placeholder="Password"/>
            <label htmlFor="terms">
            Do you agree to the terms?
            <input type="checkbox">
            <button>Submit</button>
            />
        </form>
    );
}