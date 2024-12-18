import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import AddIcon from '@mui/icons-material/Add';
import { CircularProgress, Container, Fab, Pagination, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import QuoteCard from '../components/QuoteCard';
import { fetchQuotes } from '../redux/slices/quotesSlice';

function QuoteListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quotes } = useSelector((state) => state.quotes);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const quotesPerPage = 12;
  const offset = 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const limit = 100;
        await dispatch(fetchQuotes({ limit, offset }));
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setTotalPages(Math.ceil(quotes.length / quotesPerPage));
  }, [quotes, quotesPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedQuotes = quotes.slice((page - 1) * quotesPerPage, page * quotesPerPage);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Quotes
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {paginatedQuotes.map((quote) => (
            <Grid size={{ xs: 12, md: 4, sm: 6, lg: 3 }} key={quote.id}>
              <QuoteCard quote={quote} />
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
        />
      )}
      <Fab
        color="primary"
        onClick={() => navigate('/create-quote')}
        style={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default QuoteListPage;
