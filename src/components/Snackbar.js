import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MuiSnackbar} from '@material-ui/core';

class Snackbar extends React.Component {
  render() {
    const { open, onClose, message } = this.props;
    return (
      <div>
        <MuiSnackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center',}}
          open={open}
          onClose={onClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

Snackbar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string
}

export default Snackbar;