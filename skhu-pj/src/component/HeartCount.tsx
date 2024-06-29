import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface HeartCountProps {
  initialCount?: number;
}

const HeartCount: React.FC<HeartCountProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLike = () => {
    if (liked) {
      setCount((prevCount) => prevCount - 1);
    } else {
      setCount((prevCount) => prevCount + 1);
    }
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <>
      <button onClick={toggleLike} style={{ background: "none", border: "none", cursor: "pointer" }}>
        {liked ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
      </button>
      <span style={{ marginLeft: 10 }}>{count}</span>
      </>
  );
};

export default HeartCount;
