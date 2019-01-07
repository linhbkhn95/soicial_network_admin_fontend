export default type => {
  switch (type) {
    case 'rest':
      return import('./rest').then(provider => provider.default);
    case 'graphql':
      return import('./graphql').then(factory => factory.default());
    case 'mock':
      return import('./apiClient/common').then(provider =>
        provider.default('mock'),
      );
    case 'real':
      return import('./apiClient/common').then(provider =>
        provider.default('real'),
      );
    default:
      throw new Error(`Unknow dataProvider type ${type}`);
  }
};
