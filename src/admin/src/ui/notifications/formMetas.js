import { models } from 'data-generator';
import { generalizeNumberPlate } from '~/ui/commons/MaskedInputGen';
import {
  genMetasForEdit,
  genMetasForShowing,
  genMetasForCreate,
} from '~/utils';

const { vehicle } = models;

// const exampleFormMetas = [
//   {
//     formMeta: {
//       header: 'label.form.header.vehicle_info',
//       subtitle: 'label.form.subtitle.vehicle_info',
//       numOrder: 1,
//       fields: [
//         {
//           source: 'vehicle_owner',
//           type: 'textInput',
//           placeholder: 'placeholder.input_owner_name',
//           label: 'label.field.owner_name',
//         },
//       ],
//     },
//     imageBoxMeta: {},
//   },
// ];

const metaForGen = {
  vehicleInfo: {
    fields: [
      vehicle.vehicleOwner,
      vehicle.plate,
      vehicle.branch,
      vehicle.subBranch,
      vehicle.colour,
      vehicle.seat,
    ],
    fieldTypes: [
      'textInput',
      'textInput',
      'selectInput',
      'selectInput',
      'selectInput',
      'selectInput',
    ],
    normalizes: [null, generalizeNumberPlate, null, null, null, null],
    remoteSrcs: [
      null,
      null,
      'vehicle-marks',
      'vehicle-models',
      'vehicle-colors',
      'vehicle-seats',
    ],
    readonly: [true, true, true, true, true, true],
    labelSrcs: [null, null, 'title', 'title', 'title', 'title'],
    valueSrcs: [null, null, 'code', 'code', 'code', 'value'],
    parents: [null, null, null, vehicle.branch],
    parentPaths: [null, null, null, ['mark', 'code']],
    defaultValues: [undefined, undefined, 'null', 'null', 'null', 'null'],
    contentTypes: ['text', 'text', 'text', 'color', 'text'],
    picture: {
      // authPicture: [
      //   vehicle.frontPicture,
      //   vehicle.backPicture,
      //   vehicle.rightPicture,
      //   vehicle.leftPicture,
      // ], // WTF ?
      regisPicture: [vehicle.registrationFront, vehicle.registrationBack],
    },
  },
  certificationInfo: {
    fields: [
      vehicle.certificationNumber,
      vehicle.certificationExpireDate,
      vehicle.year,
    ],
    readonly: [true, true, true],
    defaultValues: [undefined, undefined, 'null'],
    fieldTypes: ['textInput', 'dateInput', 'selectInput'],
    contentTypes: ['text', 'date', 'text'],
    picture: {
      certPicture: [vehicle.certificationImg],
    },
  },
  insuranceInfo: {
    fields: [vehicle.insuranceNumber, vehicle.insuranceExpireDate],
    readonly: [true, true],
    fieldTypes: ['textInput', 'dateInput'],
    contentTypes: ['text', 'date'],
    picture: {
      insurPicture: [vehicle.insuranceImg],
    },
  },
  companyInfo: {
    fields: [
      vehicle.ensignType,
      vehicle.company,
      vehicle.ensignNumber,
      vehicle.companyExpireDate,
    ],
    readonly: [true, true, true, true],
    fieldTypes: ['selectInput', 'textInput', 'textInput', 'dateInput'],
    contentTypes: ['text', 'text', 'text', 'date'],
    defaultValues: ['null', undefined, undefined, undefined],
    picture: {
      ensignPic: [vehicle.companyEnsign],
    },
  },
};

const vehicleFormMetas = genMetasForCreate(metaForGen);
export const vehicleShowMetas = genMetasForShowing(metaForGen);
export const vehicleEditMetas = genMetasForEdit(metaForGen);

export default vehicleFormMetas;
