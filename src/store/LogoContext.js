import React, { createContext, useContext, useReducer, useMemo } from 'react';

const LogoStateContext = createContext(null);
const LogoDispatchContext = createContext(null);

const initialState = {
  logos: [],
  loading: false,
  error: null
};

function logoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, logos: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'UPLOAD_START':
      return { ...state, loading: true, error: null };
    case 'UPLOAD_SUCCESS':
      return { ...state, loading: false };
    case 'UPLOAD_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export function LogoProvider({ children }) {
  const [state, dispatch] = useReducer(logoReducer, initialState);

  const API_BASE = 'https://logo-finder.onrender.com';

  async function fetchLogos() {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(`${API_BASE}/getlogo`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      // Expecting an array of { name, size, location }
      const normalized = Array.isArray(data.data)
        ? data.data.map((item) => ({
            name: item.name || 'unknown',
            size: item.size ||'N/A',
            location: item.location || ''
          }))
        : [];
      dispatch({ type: 'FETCH_SUCCESS', payload: normalized });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', error: err.message || 'Unknown error' });
    }
  }

  async function uploadImage(file) {
    if (!file) return;
    dispatch({ type: 'UPLOAD_START' });
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${API_BASE}/upload-image`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
      dispatch({ type: 'UPLOAD_SUCCESS' });
      await fetchLogos();
    } catch (err) {
      dispatch({ type: 'UPLOAD_ERROR', error: err.message || 'Unknown error' });
    }
  }

  const actions = useMemo(() => ({ fetchLogos, uploadImage }), []);

  return (
    <LogoStateContext.Provider value={state}>
      <LogoDispatchContext.Provider value={actions}>
        {children}
      </LogoDispatchContext.Provider>
    </LogoStateContext.Provider>
  );
}

export function useLogoState() {
  const ctx = useContext(LogoStateContext);
  if (!ctx) throw new Error('useLogoState must be used within a LogoProvider');
  return ctx;
}

export function useLogoActions() {
  const ctx = useContext(LogoDispatchContext);
  if (!ctx) throw new Error('useLogoActions must be used within a LogoProvider');
  return ctx;
}


