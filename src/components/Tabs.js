import React, { useState } from 'react';
import LogoTable from './LogoTable';
import ImageUpload from './ImageUpload';
import { useLogoActions } from '../store/LogoContext';

function Tabs() {
  const [activeTab, setActiveTab] = useState('view');
  const { fetchLogos } = useLogoActions();

  const tabButtonStyle = (isActive) => ({
    padding: '10px 16px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: isActive ? '2px solid #000000' : '2px solid transparent',
    background: 'transparent',
    color: '#000000',
    fontWeight: isActive ? '600' : '400'
  });

  const containerStyle = {
    maxWidth: 720,
    margin: '40px auto',
    color: '#000000'
  };

  const tabBarStyle = {
    display: 'flex',
    gap: 8,
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    marginBottom: 16
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 8,
    padding: 16
  };

  return (
    <div style={containerStyle}>
      <div style={tabBarStyle}>
        <button
          type="button"
          onClick={() => { fetchLogos(); setActiveTab('view'); }}
          style={tabButtonStyle(activeTab === 'view')}
        >
          View Logo
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          style={tabButtonStyle(activeTab === 'upload')}
        >
          Upload Image
        </button>
      </div>

      <div style={cardStyle}>
        {activeTab === 'view' ? (
          <div>
            <h2 style={{ marginTop: 0 }}>View Logo</h2>
            <LogoTable />
          </div>
        ) : (
          <ImageUpload onUploadSuccess={() => {
            setActiveTab('view');
            fetchLogos();
          }} />
        )}
      </div>
    </div>
  );
}

export default Tabs;


