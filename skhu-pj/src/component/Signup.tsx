import React, { useState, ChangeEvent, FormEvent } from "react";
import AxiosBase from "./AxiosBase";
import "../css/Signup.scss";

AxiosBase.defaults.withCredentials = true;

interface RegisterData {
  loginId: string;
  pw: string;
  name: string;
}

interface RegisterModalProps {
  onRegister: () => void; // Placeholder function for successful registration handling
}

const Signup: React.FC<RegisterModalProps> = ({ onRegister }) => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    loginId: "",
    pw: "",
    name: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
formdata.append("loginId", registerData.loginId);
formdata.append("pw",registerData.pw);
formdata.append("name", registerData.name);

const response = await AxiosBase.post(`/new`, formdata);


      // formData, {
      //   withCredentials: true, // Ensure credentials are sent with the request
      // });
      console.log(response);
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        onRegister();
        window.location.href = "/";
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 처리 중 오류가 발생하였습니다.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="registerGround">
      <div className="registerModalContainer">
        <div className="registerModalHeader">회원가입</div>
        <form className="registerInputContainer" onSubmit={handleSubmit}>
          <div>
            <input
              className="registerInput"
              name="loginId"
              type="text"
              value={registerData.loginId}
              onChange={handleChange}
              placeholder="ID"
            />
            <label className="registerLabel" htmlFor="loginId">
              ID
            </label>
          </div>
          <div>
            <input
              className="registerInput"
              name="pw"
              type="password"
              value={registerData.pw}
              onChange={handleChange}
              placeholder="PW"
            />
            <label className="registerLabel" htmlFor="pw">
              PW
            </label>
          </div>
          <div>
            <input
              className="registerInput"
              name="name"
              type="text"
              value={registerData.name}
              onChange={handleChange}
              placeholder="닉네임"
            />
            <label className="registerLabel" htmlFor="name">
              닉네임
            </label>
          </div>
          <input className="registerSubmit" type="submit" value="회원가입" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
