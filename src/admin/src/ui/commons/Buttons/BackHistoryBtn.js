import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { history } from '~/utils';

const BackHistoryBtn = () => (
  <IconButton style={{ marginLeft: -14 }} onClick={() => history.goBack()}>
    <ArrowBack />
  </IconButton>
);

export default BackHistoryBtn;
