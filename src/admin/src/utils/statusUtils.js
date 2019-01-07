export const getStatus = (documentStatus, agentStatus) => {
  if (agentStatus == 1) return 1; //active

  // if (agentStatus == 2) return 1; //active
  if (documentStatus == 1) return 2;
  if (documentStatus == 2) return 0;

  if (documentStatus == 0 || documentStatus == 4) return 5;
  return 5;
};
