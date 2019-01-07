import * as moment from 'moment-timezone';
import get from 'lodash/get';
import createHistory from 'history/createBrowserHistory';
import isPlainObject from 'lodash/isPlainObject';
import { momentFormat } from '~/config';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isImage(file, attrKey) {
  if (file.title && typeof file.title === 'string') {
    const titleSplit = file.title.split('.');
    const fileType = titleSplit[titleSplit.length - 1].toLowerCase();
    console.log('fileType file ', fileType);
    if (['jpg', 'png', 'gif', 'jpeg'].includes(fileType)) {
      return true;
    }
  }
  return false;
}

export function checkIfNotNullOrUnd(val) {
  return val !== undefined && val !== null;
}
export function checkIfValidated(
  expiryDate = null,
  resource,
  source,
  translate = m => m,
) {
  const current = moment();
  const now = moment([current.year(), current.month(), current.date()]);

  const _mExpiryDate = moment(expiryDate);
  const mExpiryDate = moment([
    _mExpiryDate.year(),
    _mExpiryDate.month(),
    _mExpiryDate.date(),
  ]).tz(moment.tz.guess()); // remove time

  const messages = {
    warning: [],
    error: [],
  };

  if (!mExpiryDate.isValid()) {
    return messages;
  }

  const expireDays = mExpiryDate.diff(now, 'days') + 1;

  if (expireDays <= 0) {
    messages.error.push(
      capitalizeFirstLetter(
        `${translate('keyword.paper')} ${translate(
          `resources.${resource}.source.${source}`,
        )} ${translate('message.outdated')}`,
      ),
    );
  } else if (expireDays < 30) {
    messages.warning.push(
      capitalizeFirstLetter(
        `${translate('keyword.paper')} ${translate(
          `resources.${resource}.source.${source}`,
        )}  ${translate('keyword.remain')} ${expireDays}  ${translate(
          'keyword.days',
        )} ${translate('keyword.is')} ${translate(
          'message.willOutdated',
        )} ${translate('keyword.at')} ${mExpiryDate.format('DD/MM/YYYY')}`,
      ),
    );
  }

  return messages;
}

export function logArgs({ prefix = '', args = {} }) {
  console.log(
    // eslint-disable-line
    Object.keys(args).reduce(
      (logs, argKey) => ` ${logs} ${argKey}: ${args[argKey]}`,
      `${prefix} `,
    ),
  );
}

export function generalizeListData(list) {
  return list.map((item, index) => {
    const data = { ...item };
    const generalizedData = Object.keys(data).reduce((acc, key) => {
      const keySplit = key.split('_');
      if (keySplit.pop() === 'url') {
        const filePrmKey = keySplit.join('_');
        return { ...acc, [filePrmKey]: data[key] };
      }
      return acc;
    }, {});
    return { ...data, ...generalizedData };
  });
}

export function checkPermissions(permission, userPermission) {
  if (!userPermission) {
    return false;
  }
  return permission.toString() === userPermission.toString();
}

export function translateField(fieldValue, baseSource, valueMap, translate) {
  const label = get(valueMap, [...baseSource, fieldValue]) || fieldValue;
  return translate(label);
}

export const genMetasForEdit = superMeta => {
  const metas = Object.keys(superMeta).map((key, idx) => ({
    formMeta: {
      header: `label.form.header.${key}`,
      subtitle: `label.form.subtitle.${key}`,
      numOrder: idx + 1,
      fields: superMeta[key].fields.map((fieldKey, idx) => ({
        source: fieldKey,
        type: superMeta[key].fieldTypes[idx],
        placeholder: `placeholder.${fieldKey}`,
        label: `label.field.${fieldKey}`,
        parentSrc: superMeta[key].parents && superMeta[key].parents[idx],
        readOnly: superMeta[key].readonly && superMeta[key].readonly[idx],
        parentPath:
          superMeta[key].parentPaths && superMeta[key].parentPaths[idx],
        normalize: superMeta[key].normalizes && superMeta[key].normalizes[idx],
        remoteSrc: superMeta[key].remoteSrcs && superMeta[key].remoteSrcs[idx],
        labelSrc: superMeta[key].labelSrcs && superMeta[key].labelSrcs[idx],
        valueSrc: superMeta[key].valueSrcs && superMeta[key].valueSrcs[idx],
        choices: superMeta[key].choices && superMeta[key].choices[idx],
        defaultValue:
          superMeta[key].defaultValues && superMeta[key].defaultValues[idx],
      })),
    },
    imageBoxMeta: Object.keys(superMeta[key].picture).map(clusterKey => ({
      label: `label.header.${clusterKey}`,
      pictures: superMeta[key].picture[clusterKey].map(picKey => ({
        label: `label.field.${picKey}`,
        source: picKey,
      })),
    })),
  }));

  return metas;
};

export const genMetasForShowing = superMeta => {
  const metas = Object.keys(superMeta).map((key, idx) => ({
    infoMeta: {
      header: `label.show.header.${key}`,
      subtitle: `label.show.subtitle.${key}`,
      numOrder: idx + 1,
      fields: superMeta[key].fields.map((fieldKey, idx) => ({
        source: fieldKey,
        label: `label.field.${fieldKey}`,
        contentType: superMeta[key].contentTypes[idx],
        //mapSrc: superMeta[key].remoteSrcs && superMeta[key].remoteSrcs[idx],
        //mapLabelSrc: superMeta[key].labelSrcs && superMeta[key].labelSrcs[idx],
        //mapValueSrc: superMeta[key].valueSrcs && superMeta[key].valueSrcs[idx],
      })),
    },
    imageMeta: Object.keys(superMeta[key].picture).map(clusterKey => ({
      label: `label.header.${clusterKey}`,
      pictureSrcs: superMeta[key].picture[clusterKey].map(picKey => ({
        label: `label.field.${picKey}`,
        source: `${picKey}_url`,
      })),
    })),
  }));

  return metas;
};

export const genMetasForCreate = superMeta => {
  const metas = Object.keys(superMeta).map((key, idx) => ({
    formMeta: {
      header: `label.form.header.${key}`,
      subtitle: `label.form.subtitle.${key}`,
      numOrder: idx + 1,
      fields: superMeta[key].fields.map((fieldKey, idx) => ({
        source: fieldKey,
        type: superMeta[key].fieldTypes[idx],
        placeholder: `placeholder.user.${fieldKey}`,
        label: `label.field.user.${fieldKey}`,
        parentSrc: superMeta[key].parents && superMeta[key].parents[idx],
        validate: superMeta[key].validates && superMeta[key].validates[idx],
        parentPath:
          superMeta[key].parentPaths && superMeta[key].parentPaths[idx],
        normalize: superMeta[key].normalizes && superMeta[key].normalizes[idx],
        choices: superMeta[key].choices && superMeta[key].choices[idx],
        remoteSrc: superMeta[key].remoteSrcs && superMeta[key].remoteSrcs[idx],
        labelSrc: superMeta[key].labelSrcs && superMeta[key].labelSrcs[idx],
        valueSrc: superMeta[key].valueSrcs && superMeta[key].valueSrcs[idx],
        defaultValue:
          superMeta[key].defaultValues && superMeta[key].defaultValues[idx],
      })),
    },
    imageBoxMeta: Object.keys(superMeta[key].picture).map(clusterKey => ({
      label: `label.header.${clusterKey}`,
      pictures: superMeta[key].picture[clusterKey].map(picKey => ({
        label: `label.field.${picKey}`,
        source: picKey,
      })),
    })),
  }));

  return metas;
};

export const history = createHistory();

export const extractRangeDate = filterDateValue => {
  if (typeof filterDateValue !== 'string') {
    return {
      startDate: null,
      endDate: null,
    };
  }

  const split = filterDateValue.split('-');
  const startDate =
    split[0] === undefined ? null : moment(split[0], momentFormat);
  const endDate =
    split[1] === undefined ? null : moment(split[1], momentFormat);
  return {
    startDate: startDate && startDate.isValid() ? startDate : null,
    endDate: endDate && endDate.isValid() ? endDate : null,
  };
};

export const getStringDateRangeSubtitle = (rangeDate, translate) => {
  const translator = translate || (str => str);

  if (!isPlainObject(rangeDate)) return translator('message.invalidDateRange');
  const startDate =
    rangeDate.startDate &&
    rangeDate.startDate instanceof moment &&
    rangeDate.startDate.isValid()
      ? rangeDate.startDate
      : null;

  const endDate =
    rangeDate.endDate &&
    rangeDate.endDate instanceof moment &&
    rangeDate.endDate.isValid()
      ? rangeDate.endDate
      : null;
  const isStartDateNull = startDate === null;
  const isEndDateNull = endDate === null;
  if (isStartDateNull && isEndDateNull) {
    return translator('message.allDay');
  }

  if (isStartDateNull && !isEndDateNull) {
    return `${translator('message.toDay')} ${endDate.format('LL')}`;
  }

  if (!isStartDateNull && isEndDateNull) {
    return `${translator('message.fromDay')} ${startDate.format('LL')}`;
  }

  return `${startDate.format('LL')} - ${endDate.format('LL')}`;
};
