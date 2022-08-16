import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Modal from '../../commonComponents/Modal';
import { Button, SectionTitle, InputLabel, Input, InputContainer, TextArea } from '../../../styledComponents'
import uploadPhoto from '../../../lib/uploadPhoto';
import { usePackStore } from '../Store';

/* TODO : change userId once there is store */
const userid = 1;

export default function AddPack() {
  const [openForm, setOpenForm] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  const renderPacks = usePackStore((state) => state.resetPack);

  useEffect(() => {
    setFormValue({});
  }, [openForm])

  const handleClick = (e) => {
    setOpenForm(true);
  };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get url first
    uploadPhoto(imagePreview)
      .then((url) => {
        const config = {
          method: 'POST',
          url: '/api/packs',
          data: {
            name: formValue.name,
            url,
            description: formValue.description,
            owner_id: userid,
          },
        };
        axios(config)
          .then(() => {
            setOpenForm(false);
            renderPacks(userid);
          })
          .catch((err) => console.log('error posting packs', err));
      })
      .catch((err) => console.log('error uploading photo', err));
  };

  const fileHandler = (e) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setImagePreview(reader.result);
      // const url = await uploadPhoto(reader.result);
    }, false);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>
        Add Pack
      </Button>
      <Modal open={openForm} onClose={() => setOpenForm(false)} title="Add Pack">
        <Form onSubmit={handleSubmit}>
          <SectionTitle>Basic Information</SectionTitle>
          <InputLabel>
            Pack Name*
            <Input type="text" onChange={handleChange} name="name" required />
          </InputLabel>
          <InputLabel>
            About
            <TextArea type="textarea" onChange={handleChange} name="description" style={{ height: '130px' }} />
          </InputLabel>
          <StyleSectionTitle>
            Cover Photo
            <input type="file" id="file-input" hidden onChange={fileHandler} />
            <PlusImg src="https://img.icons8.com/ios/50/ff8700/plus--v1.png" onClick={() => document.getElementById('file-input').click()} />
          </StyleSectionTitle>
          {imagePreview && <CoverPhoto src={imagePreview} />}
          {!imagePreview && <CoverPhoto />}
          <FloatRight>
            <Button type="submit" style={{ fontWeight: 'bold' }}>
              Create
            </Button>
          </FloatRight>
        </Form>
      </Modal>
    </>
  )
}

const Form = styled.form`
  margin: 10px 0;
`;

const CoverPhoto = styled.img`
  width: 100%;
  position: relative;
  border: 1px solid #9F9F9F;
  border-radius: 10px;
  box-shadow: 1px 1px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  background-color: #F5F5F5;
  margin: 5px 0 15px 0
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const PlusImg = styled.img`
  width: 30px;
  height: 30px;
  padding: 0 10px;
`;

const FloatRight = styled.div`
  float: right;
  padding: 20px 0;
`;

const StyleSectionTitle = styled(SectionTitle)`
  display: flex;
  align-items: center;
`;