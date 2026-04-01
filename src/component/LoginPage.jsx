import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 30px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 15px rgb(0 0 0 / 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-weight: 600;
`;

const Message = styled.p`
  text-align: center;
  color: red;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Form = styled.form``;

const FieldWrapper = styled.div`
  margin-bottom: 18px;
`;

const ErrorText = styled.p`
  margin: 0 0 4px 0;
  font-size: 13px;
  color: black;
  height: 18px;
  font-weight: 500;
`;

const RedStar = styled.span`
  color: red;
  margin-left: 4px;
  font-weight: 700;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #555;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 16px;
  padding-right: 45px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background: #a0cfff;
    cursor: not-allowed;
  }
`;

const ForgotLink = styled.div`
  text-align: right;
  margin-bottom: 18px;

  a {
    font-size: 13px;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #555;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validate()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/onlineexam/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.responseMessage === "success") {
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ " + (result.errorMessageList?.[0] || "Login failed"));
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderErrorMessage = (field) => {
    const errorMsg = errors[field];
    if (submitted) {
      return errorMsg ? (
        <>
          {errorMsg}
          <RedStar>*</RedStar>
        </>
      ) : null;
    }
    return null;
  };

  return (
    <Container>
      <Title>Login</Title>

      {message && <Message>{message}</Message>}

      <Form onSubmit={handleSubmit} noValidate>
        <FieldWrapper>
          <ErrorText>{renderErrorMessage("email")}</ErrorText>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </FieldWrapper>

        <FieldWrapper>
          <ErrorText>{renderErrorMessage("password")}</ErrorText>
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <EyeButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </EyeButton>
          </PasswordWrapper>
        </FieldWrapper>

        <ForgotLink>
          <a href="#">Forgot password?</a>
        </ForgotLink>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </SubmitButton>
      </Form>

      <FooterText>
        Don't have an account? <Link to="/register">Register here</Link>
      </FooterText>
    </Container>
  );
};

export default LoginPage;