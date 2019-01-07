import React from 'react';
import { translate as translateDeco } from 'react-admin';
import Button from '@material-ui/core/Button';

const CancelBtn = translateDeco(({ history, translate }) => (
  <Button variant="contained" onClick={() => history.goBack()}>
    {translate('label.button.cancel')}
  </Button>
));

export default CancelBtn;
