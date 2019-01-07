import { models } from 'data-generator';
import { generalizeVNPhoneNumber } from '~/ui/commons/MaskedInputGen';
// import { required } from '~/utils/validators';
import {
  genMetasForEdit,
  genMetasForShowing,
  genMetasForCreate,
} from '~/utils';
import { maxLength } from 'ra-core/lib/form/validate';

const { me } = models;

const metaForGen = {
  userInfo: {
    fields: [
      me.companyId,
      me.fullName,
      // me.role,
      // me.password,
      // 'passwordConfirm',
      me.userName,
      me.email,
    ],
    fieldTypes: [
      'reactSelect',
      'textInput',
      // 'radioInput',
      'phone',
      'textInput',
      // 'passwordInput',
      // 'passwordInput',
    ],
    validates: [[], [maxLength(260)]],
    // validates: [
    //   // [required('validation.required')],
    //   // [required('validation.required')],

    //   // [required('validation.required')],
    //   // [required('validation.password'), minLength(8, 'validation.minLength8')],
    //   // [isEqualField(me.password, 'validation.passwordMatch')],
    //   // [required('validation.required')],
    //   [],
    // ],
    defaultValues: ['null', undefined],
    remoteSrcs: [null, null],
    choices: [
      undefined,
      undefined,
      // [{ id: '1', name: 'text.admin' }, { id: '2', name: 'text.fleet' }],
    ],
    normalizes: [null, null, generalizeVNPhoneNumber, null],
    contentTypes: [
      'text',
      'text',
      'text',
      // 'text',
      // 'password',
      // 'password',
      'text',
      'text',
    ],
    picture: {
      // profilePicture: [me.avatar],
    },
  },
};
export const userEditMetas = genMetasForEdit(metaForGen);
export const userCreateMetas = genMetasForCreate(metaForGen);
export const userShowMetas = genMetasForShowing(metaForGen);
