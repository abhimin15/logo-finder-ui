import React from 'react';
import { useLogoState } from '../store/LogoContext';

function LogoTable({ rows }) {
  const { logos, loading, error } = useLogoState();
  const containerStyle = {
    overflowX: 'auto'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0
  };

  const thTdBase = {
    padding: '10px 12px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  };

  const thStyle = {
    ...thTdBase,
    color: '#000000',
    fontWeight: 600,
    background: 'rgba(0,0,0,0.04)'
  };

  const tdStyle = {
    ...thTdBase,
    color: '#000000'
  };

  const emptyStyle = {
    padding: 16,
    color: 'rgba(0,0,0,0.7)'
  };

  const displayRows = Array.isArray(rows) && rows.length ? rows : logos;

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Size</th>
            <th style={thStyle}>Location</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td style={emptyStyle} colSpan={3}>Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td style={emptyStyle} colSpan={3}>Error: {error}</td>
            </tr>
          ) : displayRows.length === 0 ? (
            <tr>
              <td style={emptyStyle} colSpan={3}>No logos found.</td>
            </tr>
          ) : (
            displayRows.map((row, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{row.name}</td>
                <td style={tdStyle}>{row.size}</td>
                <td style={tdStyle}>{row.location}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LogoTable;
