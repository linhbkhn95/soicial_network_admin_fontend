import {
  SAVE_OPTION,
  SAVE_COMPANY_DETAIL,
  SAVE_MAP,
  SET_COMMON_DIALOG_AND_OPEN,
  CLOSE_COMMON_DIALOG,
  OPEN_COMMON_DIALOG,
} from '~/store/actions/general';

const initialState = {
  options: {},
  companyInfo: {},
  commonDialog: {
    isOpen: false,
  },
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case SAVE_OPTION:
      if (meta.key) {
        return {
          ...state,
          options: {
            ...state.options,
            [meta.key]: payload,
          },
        };
      } else {
        return state;
      }
    case SAVE_MAP:
      // console.log(
      //   'payload reducers setting ',
      //   payload,
      //   ' valueSrc ',
      //   meta.valueSrc,
      //   ' labelSrc ',
      //   meta.labelSrc,
      // );
      if (meta.key && meta.labelSrc && meta.valueSrc) {
        const maps =
          (payload &&
            payload.reduce(
              (acc, item) => ({
                ...acc,
                [item[meta.valueSrc]]: item[meta.labelSrc],
              }),
              {},
            )) ||
          null;
        return {
          ...state,
          maps: {
            ...state.maps,
            [meta.key]: maps,
          },
        };
      }
      return state;
    case SAVE_COMPANY_DETAIL:
      return {
        ...state,
        companyInfo: {
          ...payload,
        },
      };
    case SET_COMMON_DIALOG_AND_OPEN:
      return {
        ...state,
        commonDialog: {
          ...payload,
        },
      };
    case CLOSE_COMMON_DIALOG:
      return {
        ...state,
        commonDialog: {
          ...state.commonDialog,
          isOpen: false,
        },
      };
    case OPEN_COMMON_DIALOG:
      return {
        ...state,
        commonDialog: {
          ...state.commonDialog,
          isOpen: true,
        },
      };
    default:
      return state;
  }
};
