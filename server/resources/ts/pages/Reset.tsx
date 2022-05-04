import { LoadingButton } from "@mui/lab";
import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";

export const Reset = ({ match }: { match: any }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = match.params.token;

    await axios.post("reset", {
      token,
      password,
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
      <h1 className="h3 mb-3 font-weight-normal">Reset your password</h1>

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
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
        Reset Password
      </LoadingButton>
    </form>
  );
};
