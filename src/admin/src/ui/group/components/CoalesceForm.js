import React from 'react';
import FormalForm from './FormalForm';
import Grid from '@material-ui/core/Grid';
import PaddingPaper from '~/ui/commons/PaddingPaper';
import BulkImageForm from './BulkImageForm';
import withStyles from '@material-ui/core/styles/withStyles';
import { history } from '~/utils';

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
// var objectUrl_no}

@withStyles(styles)
export default class CoalesceForm extends React.Component {
 
  render() {
    const { metas, id, classes, resource, dataProvider, record } = this.props;

    return (
      <Grid container spacing={3}>
   
        {metas.map(({ formMeta, imageBoxMeta }, index) => {
          let mdxform = imageBoxMeta && imageBoxMeta.length > 0 ? 4 : 12;
          return (
            <React.Fragment key={`${id}-form-${index}}`}>
              <Grid
                item
                md={mdxform}
                lg={mdxform}
                className={classes.gridItemLeft}
              >
                <PaddingPaper>
                  <FormalForm
                    record={record}
                    dataProvider={dataProvider}
                    resource={resource}
                    formMeta={formMeta}
                    key={`${id}-form-${index}`}
                    fullWidth={
                      imageBoxMeta && imageBoxMeta.length > 0 ? true : false
                    }
                  />
                </PaddingPaper>
              </Grid>
              {imageBoxMeta &&
                imageBoxMeta.length > 0 && (
                  <Grid item md={8} lg={8} className={classes.gridItemRight}>
                    <PaddingPaper style={{ flexGrow: 1 }}>
                      {imageBoxMeta.map(({ label, pictures }, idx) => (
                        <BulkImageForm
                          label={label}
                          pictures={pictures}
                          key={`${id}-img-bulk-${idx}`}
                          keyAsId={`${id}-img-bulk-${idx}`}
                          record={record}
                        />
                      ))}
                    </PaddingPaper>
                  </Grid>
                )}
            </React.Fragment>
          );
        })}
      </Grid>
    );
  }
}
