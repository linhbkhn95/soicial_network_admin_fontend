import { GET_ONE } from 'react-admin';
import { models } from 'data-generator';
import { GET_OPTION } from '~/dataProvider/apiClient/common';

export const SAVE_OPTION = '/SETTINGS/SAVE_OPTION';
export const SAVE_COMPANY_DETAIL = '/SETTINGS/SAVE_COMPANY_DETAIL';
export const SAVE_MAP = '/SETTINGS/SAVE_MAP';
export const CRUD_GET_COMPANY_DETAIL = '/CRUD/GET_COMPANY_DETAIL';
export const CRUD_GET_OPTION = 'CRUD/GET_OPTION';
export const SET_COMMON_DIALOG_AND_OPEN = 'SET_COMMON_DIALOG_AND_OPEN';
export const OPEN_COMMON_DIALOG = 'OPEN_COMMON_DIALOG';
export const CLOSE_COMMON_DIALOG = 'CLOSE_COMMON_DIALOG';

export const saveCompanyDetail = ({ data }) => ({
  type: SAVE_COMPANY_DETAIL,
  payload: data,
});

export const setCommonDialogAndOpen = ({
  content,
  title,
  confirmActions,
  confirmCb,
  cancelCb,
  confirmLabel,
  cancelLabel,
}) => ({
  type: SET_COMMON_DIALOG_AND_OPEN,
  payload: {
    content,
    title,
    confirmActions,
    confirmCb,
    cancelCb,
    confirmLabel,
    cancelLabel,
    isOpen: true,
  },
});

export const closeCommonDialog = () => ({
  type: CLOSE_COMMON_DIALOG,
});

export const openCommonDialog = () => ({
  type: OPEN_COMMON_DIALOG,
});

export const saveOption = (key, { data }) => ({
  type: SAVE_OPTION,
  payload: data,
  meta: {
    key,
  },
});

export const saveMap = (key, labelSrc, valueSrc, { data }) => ({
  type: SAVE_MAP,
  payload: data,
  meta: {
    key,
    labelSrc,
    valueSrc,
  },
});

export const getCompanyDetailFromUserData = ({ data: meData }) => ({
  type: CRUD_GET_COMPANY_DETAIL,
  payload: { id: meData[models.me.companyId] },
  meta: {
    resource: 'fleets',
    fetch: GET_ONE,
    onSuccess: {
      successActionCreators: [saveCompanyDetail],
    },
  },
});

export const getOptionAC = (key, labelSrc, valueSrc) => ({
  type: CRUD_GET_OPTION,
  payload: { key },
  meta: {
    fetch: GET_OPTION,
    onSuccess: {
      successActionCreators: [
        payload => saveOption(key, payload),
        payload => saveMap(key, labelSrc, valueSrc, payload),
      ],
    },
  },
});

export const getCompanyDetail = id => ({
  type: CRUD_GET_COMPANY_DETAIL,
  payload: { id },
  meta: {
    resource: 'fleet',
    fetch: GET_ONE,
    onSuccess: {
      successActionCreators: [saveCompanyDetail],
    },
  },
});
