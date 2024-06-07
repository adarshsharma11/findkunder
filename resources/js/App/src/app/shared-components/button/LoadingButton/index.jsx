import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Box } from '@mui/material';

const LoadingButton = ({ onClick, disabled, isLoading, text, sx, buttonProps, circularProgressProps, variant, color, size }) => {
  return (
    <Box sx={sx}>
      <Button onClick={onClick} disabled={disabled || isLoading} variant={variant} color={color} size={size} {...buttonProps}>
        {text}
      </Button>
      {isLoading && (
        <CircularProgress
          sx={{
            ...circularProgressProps.sx,
          }}
          size={circularProgressProps.size || 24}
          {...circularProgressProps}
        />
      )}
    </Box>
  );
};

LoadingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  sx: PropTypes.object,
  buttonProps: PropTypes.object,
  variant: PropTypes.string,
  color: PropTypes.string,
  circularProgressProps: PropTypes.shape({
    sx: PropTypes.object,
    size: PropTypes.number,
  }),
};

LoadingButton.defaultProps = {
  disabled: false,
  isLoading: false,
  sx: {},
  buttonProps: {},
  circularProgressProps: {},
  variant: "",
  color: "",
  size: "",
};

export default LoadingButton;
