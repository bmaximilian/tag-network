/**
 * Created on 2019-01-06.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { NeuralNetwork } = require('brain.js');
const { isEmpty } = require('lodash');

/**
 * @class TagSuggestionService
 */
class TagSuggestionService {
    /**
     * Constructor of TagSuggestionService
     */
    constructor(config, tagNetwork) {
        this.config = config;
        this.tagNetwork = tagNetwork;
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
    async train() {
        const network = await this.tagNetwork.getAll();

        const allCombinations = network.reduce((accumulator, current) => {
            const tagNames = [current.name, ...current.relatedTags.map(t => t.name)];
            const combinations = [];

            let used = [];
            let remaining = tagNames;

            let resorts = 0;
            while (!isEmpty(remaining)) {
                used.push(remaining.shift());

                if (!isEmpty(remaining) && !isEmpty(used)) {
                    combinations.push({ input: [...used], output: [...remaining] });
                }

                if (isEmpty(remaining) && resorts < tagNames.length) {
                    used = [];
                    remaining = tagNames;

                    for (let i = 0; i < resorts; i += 1) {
                        remaining.push(remaining.shift());
                    }

                    resorts += 1;
                }
            }

            return [
                ...accumulator,
                ...combinations,
            ];
        }, []);

        this.neuralNetwork.train(allCombinations);
    }

    /**
     * Get a suggestion for the passed tags
     *
     * @return {object[]}: The tag suggestions
     */
    get(tags) {
        return this.neuralNetwork.run(tags);
    }
}

module.exports = TagSuggestionService;
