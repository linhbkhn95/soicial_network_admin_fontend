import React from 'react';
import { TextField, translate } from 'react-admin';
import LabelField from '~/ui/commons/LabelField';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import TextShow from '~/ui/commons/TextShow';

const exampleFormMeta = {
  header: 'label.form.header.vehicle_info',
  subtitle: 'label.form.subtitle.vehicle_info',
  numOrder: 1,
  fields: [
    {
      source: 'vehicle_owner',
      label: 'label.field.owner_name',
    },
  ],
};

const styles = {
  formHeader: {},
  subtitle: {},
};

class FormalInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log(`this.props.infoMeta`, props);
  }

  render() {
    const {
      infoMeta = {},
      classes,
      record,
      overrideOrder,
      translate,
    } = this.props;
    const { numOrder, header, fields } = infoMeta;
    return (
      <React.Fragment>
        <h3 style={{ marginTop: 0 }}>
          {`${
            overrideOrder !== undefined ? overrideOrder : numOrder
          }. ${translate(header)}`}
        </h3>

        {fields.map(({ label, ...rest }) => (
          <TextShow
            {...rest}
            resource="vehicles"
            label={translate(label)}
            record={record}
            key={`show-filed-${label}`}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default compose(
  translate,
  withStyles(styles),
)(FormalInfo);
