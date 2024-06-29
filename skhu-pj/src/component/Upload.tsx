import { ChangeEvent, useRef, useState } from "react";
import AxiosBase from "./AxiosBase";
import "../index.css";

interface Upload {
  id: number;
  post_id: number;
  like: number;
  title: string;
}

const PhotoWrite: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [input, setInput] = useState<Upload>({
    id: 0,
    post_id: 0,
    like: 0,
    title: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.title || !imageFile) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (window.confirm("추가하시겠습니까?")) {
      try {
        const formData = new FormData();
        if (imageFile) {
          formData.append("file", imageFile);
        }
        formData.append("title", input.title);

        const response = await AxiosBase.post(`/gallery/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);

        alert("추가되었습니다.");
        setInput({
          id: 0,
          title: "",
          like: 0,
          post_id: 0,
        });
        setImageFile(null);

        window.location.href = "/Main";
      } catch (error) {
        console.error(error);
        alert("추가에 실패하였습니다. 다시 시도해주세요.");
      }
    }
  };

  const showImage = imageFile ? (
    <img className="imageSize" src={URL.createObjectURL(imageFile)} alt="미리보기" />
  ) : (
    <div className="emptyProfile" onClick={() => handleClickFileInput()}>
      클릭해서 이미지를 업로드하세요.
    </div>
  );

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      setImageFile(fileList[0]);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="freeContainer">
      <header className="freeWriteHeader">
        제목
        <input
          type="text"
          name="title"
          className="freeWriteTitleInput"
          value={input.title}
          onChange={handleChange}
        />
        <button type="submit" className="NoticeWriteLink" onClick={handleSubmit}>
          추가
        </button>
      </header>
      <main className="freeWriteMain">
        <div className="imageSize">{showImage}</div>
        <input
          type="file"
          accept=".jpg, .mp3, .jpeg, .png, .gif, .bmp, .tif, .tiff|image/*"
          ref={fileInputRef}
          onChange={uploadFile}
          style={{ display: "none" }}
        />
      </main>
    </div>
  );
};

export default PhotoWrite;
