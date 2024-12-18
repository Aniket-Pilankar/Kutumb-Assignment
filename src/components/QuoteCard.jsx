import React from 'react';

import { Box, Card, CardContent, CardMedia, styled, Typography } from '@mui/material';

export const StyledTypography = styled((props) => <Typography {...props} />)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'red',
  fontWeight: 'bold',
  textAlign: 'center',
}));

function QuoteCard({ quote }) {
  return (
    <Card style={{ position: 'relative' }}>
      <Box style={{ position: 'relative', height: 150 }}>
        <CardMedia
          component="img"
          height="150"
          image={quote.mediaUrl}
          alt="Quote Image"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        <StyledTypography variant="h6">{quote.text?.slice(0, 10)}</StyledTypography>
      </Box>{' '}
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {quote.username}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {quote.createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default QuoteCard;
