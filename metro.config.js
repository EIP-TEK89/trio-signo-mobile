const { getDefaultConfig } = require('expo/metro-config');
<<<<<<< HEAD
const { withNativeWind } = require('nativewind/metro');
=======
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

<<<<<<< HEAD
module.exports = withNativeWind(config, { input: './global.css' })
=======
module.exports = config;
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
