import { generateService, apiOperators } from '../apiClient/request';

const serviceMeta = {
  stageImage: {
    url: (model, attr) => `/stage/${model}/${attr}`,
    method: 'post',
    isFormData: true,
    requireToken: true,
  },
  getMarkOptions: {
    url: () => '/options/marks',
    method: 'get',
    requireToken: true,
  },
  getModelOptions: {
    url: () => `/options/models`,
    method: 'get',
    requireToken: true,
  },
};

export default generateService(serviceMeta, apiOperators.auth);
