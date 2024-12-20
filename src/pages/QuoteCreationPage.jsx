import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import InputFileUpload from '../components/InputFileUpload';
import { postQuote, uploadFileGetMediaURL } from '../redux/slices/quotesSlice';

function QuoteCreationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUploaded(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newQuote.trim()) {
      alert('Quote text is required');
      return;
    }

    if (!file) {
      alert('File is required');
      return;
    }

    try {
      setIsLoading(true);
      const fileURL = await dispatch(uploadFileGetMediaURL(file)).unwrap();

      const response = await dispatch(postQuote({ newQuote, fileURL })).unwrap();

      if (response.status) {
        setOpen(true);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) navigate('/');

  return (
    <Container maxWidth="sm" style={{ padding: '32px 16px' }}>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        style={{ fontWeight: 'bold', marginBottom: '16px' }}
      >
        CREATE A NEW QUOTE
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        <TextField
          label="Quote Text"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          fullWidth
          margin="normal"
        />
        <InputFileUpload onChange={handleFileChange} isdisabled={fileUploaded} />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          {isLoading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Save Quote'}
        </Button>
      </Box>
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
