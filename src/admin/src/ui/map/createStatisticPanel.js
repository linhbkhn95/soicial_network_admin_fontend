
export default ({ total, running, guests, frees, t }) => `
  <div class="map-statistic">
    <div class="map-statistic-total">
      <div class="map-statistic-value">${running}/${total}</div>
      <div class="map-statistic-title">${t('resources.map.car.running')}</div>
    </div>
    <div class="map-statistic-guest">
      <div class="map-statistic-value"><i class="icon-car-1"></i>${guests}</div>
      <div class="map-statistic-title">${t('resources.map.car.guests')}</div>
    </div>
    <div class="map-statistic-free">
      <div class="map-statistic-value"><i class="icon-car-2"></i>${frees}</div>
      <div class="map-statistic-title">${t('resources.map.car.free')}</div>
    </div>
  </div>
`;
