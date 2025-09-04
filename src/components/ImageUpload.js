import React, { useState } from 'react';
import { useLogoActions } from '../store/LogoContext';

function ImageUpload({ onUploadSuccess }) {
  const { uploadImage } = useLogoActions();
  const [selectedFile, setSelectedFile] = useState(null);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    fontSize: 14
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        await uploadImage(selectedFile);
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0 }}>Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={inputStyle}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedFile}
        style={{
          ...buttonStyle,
          opacity: selectedFile ? 1 : 0.5,
          cursor: selectedFile ? 'pointer' : 'not-allowed'
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default ImageUpload;
