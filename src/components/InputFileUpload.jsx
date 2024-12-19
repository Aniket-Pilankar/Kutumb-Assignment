import * as React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onChange, isdisabled }) {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      disabled={isdisabled}
    >
      Upload files
      <VisuallyHiddenInput type="file" onChange={onChange} multiple={false} />
    </Button>
  );
}
