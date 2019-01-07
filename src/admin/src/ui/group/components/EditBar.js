// import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
// import withStyles from '@material-ui/core/styles/withStyles';
// import EditIcon from '@material-ui/icons/Edit';
// import IconDeleteButton from '~/ui/commons/Buttons/IconDeleteButton';
// import SwitchStatus from '~/ui/commons/SwitchStatus';
// import { Link } from 'react-router-dom';
// import { linkToRecord } from 'react-admin';
// import { models } from 'data-generator';

// const STATE_APPROVED = 0;

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   btn: {
//     margin: theme.spacing.unit,
//   },
//   swt: {},
// });

// const EditBar = withStyles(styles)(
//   ({
//     toggleStatusSrc,
//     classes,
//     record = {},
//     basePath,
//     resource,
//     hasDelete,
//     hasEdit,
//     hasSwitch,
//     switchDisabled,
//     editDisabled,
//     deleteDisabled,
//   }) => {
//     return (
//       <div className={classes.root}>
//         {hasSwitch && (
//           <SwitchStatus
//             statusSrc={toggleStatusSrc}
//             resource={resource}
//             record={record}
//             id={record.id}
//             basePath={basePath}
//             disabled={switchDisabled}
//             meta={{
//               ON: 1,
//               OFF: 0,
//             }}
//           />
//         )}
//         {hasEdit && (
//           <IconEditButton
//             record={record}
//             basePath={basePath}
//             disabled={editDisabled}
//           />
//         )}
//         {hasDelete && (
//           <IconDeleteButton
//             record={record}
//             basePath={basePath}
//             resource={resource}
//             disabled={deleteDisabled}
//           />
//         )}
//       </div>
//     );
//   },
// );

// const IconEditButton = ({ basePath = '', record = {}, ...rest }) => (
//   <IconButton component={Link} to={linkToRecord(basePath, record.id)} {...rest}>
//     <EditIcon fontSize="small" />
//   </IconButton>
// );

// export default EditBar;
