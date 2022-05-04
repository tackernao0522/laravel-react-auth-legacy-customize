import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const Register = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(
    () => {
      console.log(user);

      if (user) {
        history.push("/");
      }
    },
    [user]
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    await axios.post("register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirm: passwordConfirm
    });

    setLoading(false);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

      <input
        className="form-control mb-2"
        placeholder="First Name"
        required
        onChange={e => setFirstName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Last Name"
        required
        onChange={e => setLastName(e.target.value)}
      />

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        required
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password Confirm"
        required
        onChange={e => setPasswordConfirm(e.target.value)}
      />

      <LoadingButton
        loading={loading}
        variant="contained"
        fullWidth
        type="submit"
      >
        Register
      </LoadingButton>
    </form>
  );
};

export default Register;
