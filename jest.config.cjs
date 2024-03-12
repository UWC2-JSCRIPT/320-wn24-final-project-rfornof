module.exports =  {
    transform: {
      "\\.(css|less)$": "jest-css-modules-transform",
        "\\.[jt]sx?$": "babel-jest",
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/assetTransformer.cjs',
    },
  };

