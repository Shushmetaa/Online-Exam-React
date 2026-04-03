import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutLoginWrapper, LoginWrapper, LoginRow, ErrorText,
         LeftContent, RightContent, LoginBox,
         LoginBtn, SignUpBtn, 
         LeftSideText} from "./Login";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "",email: "",password: "", confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!form.firstName) 
        newErrors.firstName = "First name is required";
    else if (!nameRegex.test(form.firstName)) 
        newErrors.firstName = "Enter a valid name";

    if (!form.lastName) 
        newErrors.lastName = "Last name is required";
    else if (!nameRegex.test(form.lastName)) 
        newErrors.lastName = "Enter a valid name";

    if (!form.email) 
        newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email))
         newErrors.email = "Enter a valid email";

    if (!form.password) 
        newErrors.password = "Password is required";
    else if (!passwordRegex.test(form.password))
         newErrors.password = "Min 8 chars, 1 uppercase, 1 number, 1 special char";

    if (!form.confirmPassword) 
        newErrors.confirmPassword = "Please confirm password";
    else if (form.password !== form.confirmPassword) 
        newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const res = await fetch("/exam/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });
      const result = await res.json();
      if (result.responseMessage === "success") {
        alert("Account Created Successfully!");
        navigate("/");
      } else {
        alert("Error: " + result._ERROR_MESSAGE_);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <OutLoginWrapper style={{ alignItems: "center", padding: "40px 20px"}}>
        <LoginWrapper style={{ height: "650px" }}>
           <LeftContent>
                  <LeftSideText>Welcome To Sphinx admin<br></br><span style={{color:"#72e2ce"}}>Signup Page</span></LeftSideText>
            </LeftContent>

          <RightContent>
            <LoginBox style={{ width: "420px", gap: "8px", padding: "26px 32px" }}>
              <h3>Create Account</h3>

              <div style={{ display: "flex", gap: "12px" }}>
                <LoginRow style={{ gap: "4px" }}>
                  <label>First Name <span>*</span></label>
                  <input style={{ height: "40px" }} name="firstName"
                    placeholder="First name" onChange={handleChange} />
                  {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
                </LoginRow>
                <LoginRow style={{ gap: "4px" }}>
                  <label>Last Name <span>*</span></label>
                  <input style={{ height: "40px" }} name="lastName"
                    placeholder="Last name" onChange={handleChange} />
                  {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                </LoginRow>
              </div>

              <LoginRow style={{ gap: "4px" }}>
                <label>Email <span>*</span></label>
                <input style={{ height: "40px" }} type="email" name="email"
                  placeholder="Enter your email" onChange={handleChange} />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </LoginRow>

              <LoginRow style={{ gap: "4px" }}>
                <label>Password <span>*</span></label>
                <input style={{ height: "40px" }} type="password" name="password"
                  placeholder="Enter password" onChange={handleChange} />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </LoginRow>

              <LoginRow style={{ gap: "4px" }}>
                <label>Confirm Password <span>*</span></label>
                <input style={{ height: "40px" }} type="password" name="confirmPassword"
                  placeholder="Confirm password" onChange={handleChange} />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
              </LoginRow>

              <LoginBtn onClick={handleSignIn}>Create Account</LoginBtn>
              <p>Already have an account?</p>
              <SignUpBtn onClick={() => navigate("/")}>Log In</SignUpBtn>
            </LoginBox>
          </RightContent>
        </LoginWrapper>
      </OutLoginWrapper>
  );
}