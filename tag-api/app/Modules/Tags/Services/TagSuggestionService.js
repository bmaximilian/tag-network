/**
 * Created on 2019-01-06.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { NeuralNetwork } = require('brain.js');

/**
 * @class TagSuggestionService
 */
class TagSuggestionService {
    /**
     * Constructor of TagSuggestionService
     */
    constructor(config) {
        this.config = config;
        this.neuralNetwork = new NeuralNetwork({
            binaryThresh: this.config.get('tags.suggestionService.binaryThresh'),
            hiddenLayers: this.config.get('tags.suggestionService.hiddenLayers'),
            activation: this.config.get('tags.suggestionService.activation'),
            leakyReluAlpha: this.config.get('tags.suggestionService.leakyReluAlpha'),
        });
    }

    /**
     * Train the neural network
     *
     * @return {void}
     */
    train() {

    }

    /**
     * Get a suggestion for the passed tags
     *
     * @return {Tag[]}: The tag suggestions
     */
    get() {

    }
}

module.exports = TagSuggestionService;
