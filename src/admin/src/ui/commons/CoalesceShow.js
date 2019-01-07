import React from 'react';
import Grid from '@material-ui/core/Grid';
import PaddingPaper from '~/ui/commons/PaddingPaper';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import FormalInfo from '~/ui/commons/FormalInfo';
import BulkImageShow from '~/ui/commons/BulkImageShow';

const styles = {
  gridItemLeft: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  gridItemRight: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    display: 'flex',
  },
};

const CoalesceShow = ({
  basePath,
  className,
  metas,
  record,
  resource,
  classes,
  version,
  id,
  ...rest
}) => {
  console.log('metas of Show ', metas);
  return (
    <PaddingPaper>
      <Grid container spacing={3}>
        {metas.map(({ infoMeta, imageMeta }, index) => {
          console.log(`render show ${index}`, infoMeta);
          return (
            <React.Fragment key={`${id}-show-${index}`}>
              <Grid item md={6} lg={6} className={classes.gridItemLeft}>
                <div>
                  <FormalInfo infoMeta={infoMeta} record={record} />
                </div>
              </Grid>
              <Grid item md={6} lg={6} className={classes.gridItemRight}>
                <div style={{ flexGrow: 1 }}>
                  {imageMeta.map(({ label, pictureSrcs }, idx) => (
                    <BulkImageShow
                      label={label}
                      record={record}
                      pictureSrcs={pictureSrcs}
                      key={`${id}-img-bulk-${idx}`}
                    />
                  ))}
                </div>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </PaddingPaper>
  );
};

export default compose(withStyles(styles))(CoalesceShow);
