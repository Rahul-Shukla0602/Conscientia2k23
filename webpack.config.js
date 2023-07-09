module.exports = {
    resolve:{
      fallback: { process: require.resolve("crypto-browserify") },
 }
};