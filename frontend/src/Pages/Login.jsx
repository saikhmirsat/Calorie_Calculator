import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Spinner } from "@chakra-ui/react";
import { BiSolidHide } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";

import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [hide, setHide] = useState(false);

  const Navigate = useNavigate();

  const Login = async () => {
    const obj = {
      email,
      password,
    };
    if (email == "" && password == "") {
      alert("Please fill email and password!");
    } else if (email == "" || password == "") {
      alert("Please check");
    } else {
      setLoading(true);
      await fetch(`https://vast-red-vulture-sock.cyclic.app/users/login`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.success === true) {
            setLoading(false);
            localStorage.setItem("userdetails", JSON.stringify(res.user[0]));
            localStorage.setItem("logintoken", res.token);
            let token = res.token;
            const expirationTime = new Date(new Date().getTime() + 3600 * 6000); // expires in 1 hour
            Cookies.set("token", token, { expires: expirationTime });
            Cookies.set("isAuth", true, { expires: expirationTime });
            Cookies.set("role", res.user[0].role, { expires: expirationTime });
            alert("Login Successful");
            let user = JSON.parse(localStorage.getItem("userdetails"));
            let young = "";
            let mature = "";
            let old = "";
            if (user.gender === "male") {
              if (user.age > 19 && user.age <= 30) {
                young = 3000;
                localStorage.setItem("calories", young);
              } else if (user.age > 31 && user.age <= 60) {
                mature = 2800;
                localStorage.setItem("calories", mature);
              } else if (user.age > 60) {
                old = 2600;
                localStorage.setItem("calories", old);
              }
            } else {
              if (user.age > 19 && user.age <= 30) {
                young = 2400;
                localStorage.setItem("calories", young);
              } else if (user.age > 31 && user.age <= 60) {
                mature = 2200;
                localStorage.setItem("calories", mature);
              } else if (user.age > 60) {
                old = 2000;
                localStorage.setItem("calories", old);
              }
            }

            if (res.user[0].role == "user") {
              Navigate("/");
            } else {
              Navigate("/admin");
            }
            window.location.reload();
          } else {
            alert("something wrong");
            setLoading(false);
          }
        });
    }
  };

  return (
    <div className="login_main_con">
      <div className="loginContainer">
        <h1
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "15px" }}
        >
          Login
        </h1>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="login_password_div">
          <input
            type={!hide ? "Password" : "text"}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <div onClick={() => setHide(!hide)}>
            {!hide ? <BsFillEyeFill /> : <BiSolidHide />}
          </div>
        </div>
        <button onClick={Login}>{loading ? <Spinner /> : "Login"}</button>
      </div>
    </div>
  );
}
