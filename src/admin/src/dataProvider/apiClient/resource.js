import { generateService, apiOperators } from '../apiClient/request';

const serviceMeta = {
  getStatistics_earnings: {
    url: () => '/earnings/getStatistics',
    requireToken: true,
    method: 'get',
  },
};

const authService = generateService(serviceMeta, apiOperators.auth);

export default authService;

export const getStatisticsEarnings = (params, header) =>
  authService.getStatistics_earnings({ ...params }, { ...header });
