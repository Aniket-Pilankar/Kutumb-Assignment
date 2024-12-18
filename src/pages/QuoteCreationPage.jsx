import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button, Container, Snackbar, TextField } from '@mui/material';

import InputFileUpload from '../components/InputFileUpload';
import { postQuote, uploadFileGetMediaURL } from '../redux/slices/quotesSlice';

function QuoteCreationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('newQuote:', newQuote);
    if (!newQuote.trim()) {
      alert('Quote text is required');
      return;
    }

    console.log('file:', file);
    if (!file) {
      alert('File is required');
      return;
    }

    try {
      const fileURL = await dispatch(uploadFileGetMediaURL(file)).unwrap();
      console.log('fileURL:', fileURL);

      const response = await dispatch(postQuote({ newQuote, fileURL })).unwrap();
      console.log('response:333312312312', response);

      if (response.status) {
        setOpen(true);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Quote Text"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          fullWidth
          margin="normal"
        />
        <InputFileUpload onChange={handleFileChange} />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Save Quote
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={'Successfully created Quote'}
      />
    </Container>
  );
}

export default QuoteCreationPage;
