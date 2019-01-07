import { models } from 'data-generator';
import { generalizeVNPhoneNumber } from '~/ui/commons/MaskedInputGen';
import { required } from '~/utils/validators';
import { maxLength } from 'ra-core/lib/form/validate';

const {
  // vehicle,
  fleet,
} = models;

const metaForGen = {
  fleetInfo: {
    fields: [fleet.type, fleet.name, fleet.phone, fleet.email],
    fieldTypes: ['selectInput', 'textInput', 'textInput', 'textInput'],
    validates: [[], [maxLength(260)], [required()], []],
    normalizes: [null, null, generalizeVNPhoneNumber, null],
    formats: [null, null, generalizeVNPhoneNumber, null],
    parses: [null, null, generalizeVNPhoneNumber, null],
    remoteSrcs: [null, null, null],
    readonly: [true, true, true],
    labelSrcs: [null, null, null],
    valueSrcs: [undefined, null, undefined],
    parents: [null, null, null],
    parentPaths: [null, null, null],
    defaultValues: [1, undefined, '', undefined],
    contentTypes: ['text', 'text', 'color'],
    noteTextFieldIds: [false, false, false, true],
    picture: {
      logo: [fleet.logo],
    },
  },
  // paymentInfo: {
  //   subtitle: true,
  //   fields: [
  //     models.bank_account.bank_account,
  //     models.bank_account.fullname,
  //     models.bank_account.city_bank,

  //     models.bank_account.branch,
  //   ],
  //   readonly: [true, true, true, true],
  //   defaultValues: [undefined, undefined, 'null', 'null'],
  //   fieldTypes: ["textInput", "textInput", "selectInput", "selectInput"],
  //   contentTypes: ["text", "text", "text", "text"],
  //   picture: {
  //     certPicture: [vehicle.certificationImg],
  //   },
  // },
  bonusTarget: {
    fields: [models.fleet.number_of_vehicle, models.fleet.online_hour_reward],
    readonly: [true, true],
    defaultValues: [undefined, undefined],
    fieldTypes: ['integer', 'integer'],
    contentTypes: ['number', 'number'],
    inline: true,
  },
  imageScanContract: {
    hiddenLabel: true,
    fields: [models.fleet.contract_path],
    readonly: [true],
    fieldTypes: ['fileInput'],
    subtitle: true,
    contentTypes: ['fileInput'],
    defaultValues: [null],
    customProps: [
      // {
      //   titleValue: (record, translate) => {
      //     if (record.contract_title) {
      //       return record.contract_title;
      //     }
      //     return translate('label.upload.imageScan');
      //   },
      // },
    ],
  },

  imageScanID: {
    hiddenLabel: true,
    fields: ['owner_id_scan_path'],
    readonly: [true],
    fieldTypes: ['fileInput'],
    subtitle: true,
    contentTypes: ['fileInput'],
    defaultValues: [null],
    customProps: [
      // {
      //   titleValue: (record, translate) => {
      //     if (record.contract_title) {
      //       return record.contract_title;
      //     }
      //     return translate('label.upload.imageScan');
      //   },
      // },
    ],
  },

  // imageScanID: {
  //   hiddenLabel: true,
  //   fields: [models.fleet.owner_id_scan_path],
  //   readonly: [true],
  //   subtitle: true,
  //   fieldTypes: ['fileInput'],
  //   contentTypes: ['fileInput'],
  //   defaultValues: [null],
  //   customProps: [
  //     // {
  //     //   titleValue: (record, translate) => {
  //     //     if (record.owner_id_scan_title) {
  //     //       return record.owner_id_scan_title;
  //     //     }
  //     //     return translate('label.upload.imageScan');
  //     //   },
  //     // },
  //   ],
  // },
};

const genMetasForShowing = superMeta => {
  const metas = Object.keys(superMeta).map((key, idx) => ({
    infoMeta: {
      header: `label.show.header.${key}`,
      subtitle: `label.show.subtitle.${key}`,
      numOrder: idx + 1,
      fields: superMeta[key].fields.map((fieldKey, idx) => ({
        source: fieldKey,
        label: `label.field.${fieldKey}`,
        contentType: superMeta[key].contentTypes[idx],
        mapSrc: superMeta[key].remoteSrcs && superMeta[key].remoteSrcs[idx],
        mapLabelSrc: superMeta[key].labelSrcs && superMeta[key].labelSrcs[idx],
        mapValueSrc: superMeta[key].valueSrcs && superMeta[key].valueSrcs[idx],
      })),
    },
    imageBoxMeta: superMeta[key].picture
      ? Object.keys(superMeta[key].picture).map(clusterKey => ({
          label: `label.header.${clusterKey}`,
          pictures: superMeta[key].picture[clusterKey].map(picKey => ({
            label: `label.field.${picKey}`,
            source: picKey,
          })),
        }))
      : null,
  }));

  return metas;
};

const genMetasForEdit = superMeta => {
  const metas = Object.keys(superMeta).map((key, idx) => ({
    formMeta: {
      header: `label.form.header.${key}`,
      subtitle: superMeta[key].subtitle ? `label.form.subtitle.${key}` : null,
      numOrder: idx + 1,
      fields: superMeta[key].fields.map((fieldKey, idx) => ({
        ...(superMeta[key].customProps ? superMeta[key].customProps[idx] : {}),
        source: fieldKey,

        type: superMeta[key].fieldTypes[idx],
        placeholder: `placeholder.${fieldKey}`,
        label: superMeta[key].hiddenLabel ? null : `label.field.${fieldKey}`,
        parentSrc: superMeta[key].parents && superMeta[key].parents[idx],
        parentPath:
          superMeta[key].parentPaths && superMeta[key].parentPaths[idx],
        normalize: superMeta[key].normalizes && superMeta[key].normalizes[idx],
        parse: superMeta[key].parses && superMeta[key].parses[idx],
        format: superMeta[key].formats && superMeta[key].formats[idx],
        remoteSrc: superMeta[key].remoteSrcs && superMeta[key].remoteSrcs[idx],
        labelSrc: superMeta[key].labelSrcs && superMeta[key].labelSrcs[idx],
        valueSrc: superMeta[key].valueSrcs && superMeta[key].valueSrcs[idx],
        labelNoteField: !superMeta[key].noteTextFieldIds
          ? ''
          : superMeta[key].noteTextFieldIds[idx]
            ? `label.noteField.${fieldKey}`
            : '',

        defaultValue:
          superMeta[key].defaultValues && superMeta[key].defaultValues[idx],
      })),
      inline: superMeta[key] ? superMeta[key].inline : false,
    },
    imageBoxMeta: superMeta[key].picture
      ? Object.keys(superMeta[key].picture).map(clusterKey => ({
          label: `label.header.${clusterKey}`,
          pictures: superMeta[key].picture[clusterKey].map(picKey => ({
            label: `label.field.${picKey}`,
            source: picKey,
          })),
        }))
      : null,
  }));

  return metas;
};
const genMetas = superMeta => {
  const metas = Object.keys(superMeta).map((key, idx) => ({
    formMeta: {
      header: `label.form.header.${key}`,
      subtitle: superMeta[key].subtitle ? `label.form.subtitle.${key}` : null,
      numOrder: idx + 1,
      fields: superMeta[key].fields.map((fieldKey, idx) => ({
        source: fieldKey,

        type: superMeta[key].fieldTypes[idx],
        placeholder: `placeholder.${fieldKey}`,
        label: superMeta[key].hiddenLabel ? null : `label.field.${fieldKey}`,
        parentSrc: superMeta[key].parents && superMeta[key].parents[idx],
        parentPath:
          superMeta[key].parentPaths && superMeta[key].parentPaths[idx],
        normalize: superMeta[key].normalizes && superMeta[key].normalizes[idx],
        format: superMeta[key].formats && superMeta[key].formats[idx],
        parse: superMeta[key].parses && superMeta[key].parses[idx],
        remoteSrc: superMeta[key].remoteSrcs && superMeta[key].remoteSrcs[idx],
        labelSrc: superMeta[key].labelSrcs && superMeta[key].labelSrcs[idx],
        valueSrc: superMeta[key].valueSrcs && superMeta[key].valueSrcs[idx],
        labelNoteField: !superMeta[key].noteTextFieldIds
          ? ''
          : superMeta[key].noteTextFieldIds[idx]
            ? `label.noteField.${fieldKey}`
            : '',
        defaultValue:
          superMeta[key].defaultValues && superMeta[key].defaultValues[idx],
      })),
      inline: superMeta[key] ? superMeta[key].inline : false,
    },
    imageBoxMeta: superMeta[key].picture
      ? Object.keys(superMeta[key].picture).map(clusterKey => ({
          label: `label.header.${clusterKey}`,
          pictures: superMeta[key].picture[clusterKey].map(picKey => ({
            label: `label.field.${picKey}`,
            source: picKey,
          })),
        }))
      : null,
  }));

  return metas;
};

const fleetFormMetas = genMetas(metaForGen);
export const fleetShowMetas = genMetasForShowing(metaForGen);
export const fleetEditMetas = genMetasForEdit(metaForGen);

export default fleetFormMetas;
