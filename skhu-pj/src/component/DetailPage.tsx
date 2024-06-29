import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AxiosBase from './AxiosBase';
import styled from 'styled-components';
import { Photo } from './type';
import HeartCount from './HeartCount';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const DetailImage = styled.img`
  width: 80%;
  max-width: 800px;
  height: auto;
  border: 1px solid black;
`;

const DeleteButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!photo || !photo.id) {
      setError('No photo to delete');
      return;
    }

    try {
      console.log(`Attempting to delete photo with id: ${photo.id}`);
      const response = await AxiosBase.delete(`/photo/delete/${photo.id}`);
      console.log('Delete response:', response);
      if (response.status === 200) {
        // Navigate to the main page or another page after deletion
        navigate('/');
      } else {
        setError('Failed to delete photo');
      }
    } catch (error) {
      console.error('Error during delete:', error);
      setError('Error deleting photo');
    }
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        console.log(`Fetching photo with id: ${id}`);
        const response = await AxiosBase.get(`/photo/find/${id}`);
        console.log('Fetch response:', response);
        if (response.status === 200 && response.data) {
          setPhoto(response.data);
        } else {
          setError('Failed to fetch photo details');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setError('Error fetching photo details');
      }
    };

    fetchPhoto();
  }, [id]);

  return (
    <DetailContainer>
      {error ? (
        <div>{error}</div>
      ) : photo ? (
        <>
          <DetailImage src={photo.imagePath} alt={photo.title} />
          <h2>{photo.title}</h2>
          <div>좋아요 수: {photo.like_count} <HeartCount initialCount={photo.like_count} /></div>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </DetailContainer>
  );
};

export default DetailPage;
