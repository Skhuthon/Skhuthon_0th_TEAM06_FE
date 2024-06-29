import { ChangeEvent, useRef, useState } from "react";
import AxiosBase from "./AxiosBase";
import "../index.css";
import NavBar from "./NavBar";

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

  const [secondAudioFile, setSecondAudioFile] = useState<File | null>(null); // State for second audio file

  const fileInputRef = useRef<HTMLInputElement>(null);
  const secondFileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.title || !imageFile || !secondAudioFile) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (window.confirm("추가하시겠습니까?")) {
      try {
        const formData = new FormData();
        if (imageFile) {
          formData.append("file", imageFile);
        }
        if (secondAudioFile) {
          formData.append("file", secondAudioFile); // Append audio file
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
        setSecondAudioFile(null);

        window.location.href = "/Main";
      } catch (error) {
        console.error(error);
        alert("추가에 실패하였습니다. 다시 시도해주세요.");
      }
    }
  };

  const showFile = (file: File | null, section: number) => {
    if (!file) {
      return (
        <div
          className="emptyProfile"
          onClick={() => handleClickFileInput(section)}
        >
          {section === 1
            ? "클릭해서 사진을 업로드하세요."
            : "클릭해서 MP3 파일을 업로드하세요."}
        </div>
      );
    }

    if (section === 1 && file.type.startsWith("image")) {
      return (
        <img
          className="imageSize"
          src={URL.createObjectURL(file)}
          alt="미리보기"
        />
      );
    } else if (section === 2 && file.type.startsWith("audio")) {
      return <p>{file.name}</p>;
    }

    return (
      <div
        className="emptyProfile"
        onClick={() => handleClickFileInput(section)}
      >
        {section === 1
          ? "클릭하여 사진을 업로드하세요."
          : "클릭하여 MP3 파일을 업로드하세요."}
      </div>
    );
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>, section: number) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      if (section === 1 && file.type.startsWith("image")) {
        setImageFile(file);
      } else if (section === 2 && file.type.startsWith("audio")) {
        setSecondAudioFile(file);
      } else {
        alert(
          section === 1
            ? "지원하지 않는 파일 형식입니다. 이미지 파일을 업로드해주세요."
            : "지원하지 않는 파일 형식입니다. MP3 파일을 업로드해주세요."
        );
      }
    }
  };

  const handleClickFileInput = (section: number) => {
    if (section === 1) {
      fileInputRef.current?.click();
    } else if (section === 2) {
      secondFileInputRef.current?.click();
    }
  };

  return (
    <div>
      <NavBar />

      <div className="freeContainer">
        <header className="freeWriteHeader">
          제목
          <input
            type="text"
            name="title"
            className="freeWriteTitleInput"
            placeholder="어디서 찍은 사진인지 작성해주세요.(ex) 정보과학관 농구장)"
            value={input.title}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="NoticeWriteLink"
            onClick={handleSubmit}
          >
            추가
          </button>
        </header>
        <main className="freeWriteMain">
          <div className="filePreview">
            <div>
              <label>사진 파일:</label>
              {showFile(imageFile, 1)}
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff|image/*"
                ref={fileInputRef}
                onChange={(e) => uploadFile(e, 1)}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <label>MP3 파일:</label>
              {showFile(secondAudioFile, 2)}
              <input
                type="file"
                accept=".mp3, .wav, .ogg, .flac, .aac, .wma, .m4a, .aac|audio/*"
                ref={secondFileInputRef}
                onChange={(e) => uploadFile(e, 2)}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PhotoWrite;
