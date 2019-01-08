
module.exports = {

    /*
  |--------------------------------------------------------------------------
  | Suggestion Service
  |--------------------------------------------------------------------------
  |
  | This value is the configuration of the neural network
  | to find related tags
  |
  */

    suggestionService: {
        hiddenLayers: [1000, 1000, 1000],
        inputSize: 20,
        inputRange: 20,
        outputSize: 20,
        learningRate: 0.01,
        decayRate: 0.999,
    },
};
