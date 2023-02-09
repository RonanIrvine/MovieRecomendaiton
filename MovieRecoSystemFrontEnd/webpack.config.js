module.exports = function (webpackEnv) {
    // ...
    return {
     // ...
      resolve: {
        // ...
        fallback: {
          // 👇️👇️👇️ add this 👇️👇️👇️
          util: require.resolve("util/")
        }
      }
    }
  }