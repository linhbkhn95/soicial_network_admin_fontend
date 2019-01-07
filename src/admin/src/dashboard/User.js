import React from 'react';
import Card from '@material-ui/core/Card';
import UserIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const MonthlyRevenue = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={UserIcon} bgColor="#31708f" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('text.user')}
            </Typography>
            <Typography variant="headline" component="h2">
                {value?value:6}
            </Typography>
        </Card>
    </div>
);

export default translate(withStyles(styles)(MonthlyRevenue));
