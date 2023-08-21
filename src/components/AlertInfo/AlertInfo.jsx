import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function AlertInfo({open,handleClose,text}) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
    <Alert  onClose={handleClose} severity="info" sx={{ width: '100%' }}> 
      {text}
    </Alert>
  </Snackbar> 
  )
}


