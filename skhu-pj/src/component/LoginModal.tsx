import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import AxiosBase from "./AxiosBase";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Navigate } from "react-router"; // Not sure if this is needed

interface UserData {
  loginId: string;
  pw: string;
  name: string;
}

interface LoginModalProps {
  onLogin: (userData: UserData) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [userData, setUserData] = useState<UserData>({
    loginId: "",
    pw: "",
    name: "",
  });

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("user");
    if (isLoggedIn === "true") {
      const userDataFromStorage = JSON.parse(
        sessionStorage.getItem("userData") || "{}"
      );
      onLogin(userDataFromStorage);
    }
  }, [onLogin]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const formdata = new FormData();
      // formdata.append("loginId", userData.loginId);
      // formdata.append("pw", userData.pw);
      // formdata.append("name", "HWANG");

      const formdata = new FormData();
formdata.append("loginId", userData.loginId);
formdata.append("pw",userData.pw);

      const response = await AxiosBase.post("/login", formdata);

      if (response.status === 200) {
        const userDataFromBackend: UserData = response.data;
        onLogin(userDataFromBackend);
        sessionStorage.setItem("user", "true");
        sessionStorage.setItem("userData", JSON.stringify(userDataFromBackend));
        window.location.href = "/Main";
      } else {
        alert("로그인에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 처리 중 오류가 발생하였습니다.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="loginGround">
      <div className="loginModalContainer">
        <div className="loginModalHeader">로그인</div>
        <form className="loginInputContainer" onSubmit={handleSubmit}>
          <div>
            <input
              className="loginInput"
              name="loginId"
              type="text"
              value={userData.loginId}
              onChange={handleChange}
              placeholder="ID"
            />
            <label className="loginLabel" htmlFor="id">
              <br />
              ID
            </label>
          </div>
          <div>
            <input
              className="loginInput"
              name="pw"
              type="password"
              value={userData.pw}
              onChange={handleChange}
              placeholder="PW"
            />
            <label className="loginLabel" htmlFor="pw">
              PW
            </label>
          </div>

          <input className="loginSubmit" type="submit" value="로그인" />
          {/* Use navigate function to navigate to SignUp page */}
          <div style={{ display: "flex" }}>
            <div style={{ color: "white" }}>회원이 아니신가요?</div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => navigate("/SignUp")}>회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
