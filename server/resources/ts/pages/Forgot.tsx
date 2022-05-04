import { LoadingButton } from "@mui/lab";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Forgot = ({ user }: { user: any }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: ""
  });
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

    try {
      await axios.post("forgot", { email });

      setNotify({
        show: true,
        error: false,
        message: "Email was sent!"
      });
    } catch (e) {
      setNotify({
        show: true,
        error: true,
        message: "Email dose not exist!"
      });
    }
    setLoading(false);
  };

  let info;

  if (notify.show) {
    info = (
      <div
        className={notify.error ? "alert alert-danger" : "alert alert-success"}
        role="alert"
      >
        {notify.message}
      </div>
    );
  }
  return (
    <form className="form-signin" onSubmit={submit}>
      {info}
      <h1 className="h3 mb-3 font-weight-normal">Please set your email</h1>

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        required
        onChange={e => setEmail(e.target.value)}
      />

      <LoadingButton
        loading={loading}
        variant="contained"
        fullWidth
        type="submit"
      >
        Send Email
      </LoadingButton>
    </form>
  );
};
