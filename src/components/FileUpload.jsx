import React, { useState } from 'react';
import { useGlobalContext } from '../context/global';
import uploadFileToBlob from '../helpers/azureBlob';
import styled from 'styled-components';
import { colors, fonts } from '../style';
import Loading from './Loading';
import Loader from 'react-loader-spinner';

const FileUpload = () => {
   const { username } = useGlobalContext();
   const [fileSelected, setFileSelected] = useState(null);

   const [uploading, setUploading] = useState(false);
   const [inputKey, setInputKey] = useState(Math.random().toString(36));

   const onFileChange = (event) => {
      console.log(event.target.files[0]);
      setFileSelected(event.target.files[0]);
   };

   const onFileUpload = async () => {
      setUploading(true);
      await uploadFileToBlob(fileSelected);
      setFileSelected(null);
      setUploading(false);
      setInputKey(Math.random().toString(36));
   };

   const DisplayForm = () => (
      <>
         <input type="file" onChange={onFileChange} key={inputKey || ''} />
         <button type="submit" onClick={onFileUpload}>
            Wyślij!
         </button>
      </>
   );

   return (
      <Style>
         <h2>Zmień swoje zdjęcie profilowe</h2>
         {!uploading && DisplayForm()}
         {uploading && <Loader type="Bars" color={colors.green} height={70} width={70} />}
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;

export default FileUpload;
