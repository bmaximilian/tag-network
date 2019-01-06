
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
        binaryThresh: 0.5,
        hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
        activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
        leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
    },
};
