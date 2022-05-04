import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const Login = ({ setLogin, user }: { setLogin: Function; user: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
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

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    await axios.post("login", {
      email,
      password
    });

    setRedirect(true);
    setLogin();
    setLoading(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

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

      <div className="mb-3">
        <Link to="/forgot">Forgot Password?</Link>
      </div>

      <LoadingButton
        loading={loading}
        variant="contained"
        fullWidth
        type="submit"
      >
        Sign in
      </LoadingButton>
    </form>
  );
};

export default Login;
