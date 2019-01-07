import React from 'react';
import AvatarStatus from '~/ui/commons/AvatarStatus';
import { models } from 'data-generator';

const PlateAvatarStatus = ({ record, picSource, statusSource, textSrc }) => {
    const warningMessage =
        Math.random() < 0.5
            ? `The registration will be outdated in ${
                  record[models.vehicle.registrationExpireDate]
              }`
            : null;
    const errorMessage =
        Math.random() < 0.5 ? 'The insurance is outdated' : null;
    return (
        <AvatarStatus
            warningMessage={warningMessage}
            errorMessage={errorMessage}
            picSource={picSource}
            record={record}
            statusSource={statusSource}
            textSrc={textSrc}
        />
    );
};

export default PlateAvatarStatus;
