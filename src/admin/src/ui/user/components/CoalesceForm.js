import React from 'react';
import FormalForm from '~/ui/commons/FormalForm';
import Grid from '@material-ui/core/Grid';
import PaddingPaper from '~/ui/commons/PaddingPaper';
// import BulkImageForm from '~/ui/commons/BulkImageForm';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

const styles = {
  gridItemLeft: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 4,
  },
  gridItemRight: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    display: 'flex',
  },
};

const CoalesceForm = ({ metas, id, classes, resource, dataProvider }) => (
  <Grid container spacing={3}>
    {metas.map(({ formMeta, imageBoxMeta }, index) => (
      <React.Fragment key={`${id}-form-${index}}`}>
        <Grid item md={12} lg={12} className={classes.gridItemLeft}>
          <PaddingPaper>
            <Grid item md={6} lg={4} xs={12} className={classes.gridItemLeft}>
              <FormalForm
                dataProvider={dataProvider}
                resource={resource}
                formMeta={formMeta}
                key={`${id}-form-${index}`}
              />
            </Grid>
          </PaddingPaper>
        </Grid>
        {/* <Grid item md={8} lg={8} className={classes.gridItemRight}>
          <PaddingPaper style={{ flexGrow: 1 }}>
            {imageBoxMeta.map(({ label, pictures }, idx) => (
              <BulkImageForm
                label={label}
                pictures={pictures}
                key={`${id}-img-bulk-${idx}`}
                keyAsId={`${id}-img-bulk-${idx}`}
              />
            ))}
          </PaddingPaper>
        </Grid> */}
      </React.Fragment>
    ))}
  </Grid>
);

export default compose(withStyles(styles))(CoalesceForm);
