import React, { useState, ChangeEvent, FormEvent } from "react";
import AxiosBase from "./AxiosBase";
import "../css/Signup.scss";

interface RegisterData {
  id: string;
  pw: string;
  nickname: string;
}

interface RegisterModalProps {
  onRegister: () => void; // Placeholder function for successful registration handling
}

const Signup: React.FC<RegisterModalProps> = ({ onRegister }) => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    id: "",
    pw: "",
    nickname: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", registerData.id);
      formData.append("pw", registerData.pw);
      formData.append("name", registerData.nickname);
      

      const response = await AxiosBase.post(`/register`, formData);

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

  // Placeholder functions for duplicate checks
  const handleCheckDuplicateId = () => {
    // Implement logic to check duplicate ID
    alert("중복 체크 - ID");
  };

  const handleCheckDuplicateNickname = () => {
    // Implement logic to check duplicate nickname
    alert("중복 체크 - 닉네임");
  };

  return (
    <div className="registerGround">
      <div className="registerModalContainer">
        <div className="registerModalHeader">회원가입</div>
        <form className="registerInputContainer" onSubmit={handleSubmit}>
          <div>
            <input
              className="registerInput"
              name="id"
              type="text"
              value={registerData.id}
              onChange={handleChange}
              placeholder="ID"
            />
            <label className="registerLabel" htmlFor="id">
              ID
            </label>
            <button
              type="button"
              className="duplicateCheckButton"
              onClick={handleCheckDuplicateId}
            >
              중복 체크
            </button>
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
              name="nickname"
              type="text"
              value={registerData.nickname}
              onChange={handleChange}
              placeholder="닉네임"
            />
            <label className="registerLabel" htmlFor="nickname">
              닉네임
            </label>
            <button
              type="button"
              className="duplicateCheckButton"
              onClick={handleCheckDuplicateNickname}
            >
              중복 체크
            </button>
          </div>

          <input className="registerSubmit" type="submit" value="회원가입" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
