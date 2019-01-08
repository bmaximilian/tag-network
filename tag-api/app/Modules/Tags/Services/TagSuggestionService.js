/**
 * Created on 2019-01-06.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const brain = require('brain.js');
const { isEmpty, includes } = require('lodash');

/**
 * @class TagSuggestionService
 */
class TagSuggestionService {
    /**
     * Constructor of TagSuggestionService
     */
    constructor(config, tagNetwork, logger) {
        this.config = config;
        this.tagNetwork = tagNetwork;
        this.logger = logger;
        this.neuralNetwork = new brain.recurrent.RNN({
            hiddenLayers: this.config.get('tags.suggestionService.hiddenLayers'),
            inputSize: this.config.get('tags.suggestionService.inputSize'),
            inputRange: this.config.get('tags.suggestionService.inputRange'),
            outputSize: this.config.get('tags.suggestionService.outputSize'),
            learningRate: this.config.get('tags.suggestionService.learningRate'),
            decayRate: this.config.get('tags.suggestionService.decayRate'),
        });
    }

    /**
     * Train the neural network
     *
     * @return {void}
     */
    async train(requiredTags = null) {
        this.logger.info('Training neural network');
        const network = await this.tagNetwork.getAll();

        let allCombinations = network.reduce((accumulator, current) => {
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

        this.logger.info(`Got ${allCombinations.length} combinations to train the neural network`);

        if (!isEmpty(requiredTags)) {
            allCombinations = allCombinations.filter(combi => requiredTags.some(tag => includes(combi.input, tag)));

            this.logger.info(`Reduced combinations to ${allCombinations.length}.`);
        }

        this.neuralNetwork.train(allCombinations, {
            iterations: 2,
            log: details => this.logger.info(details),
        });

        this.logger.info('Trained neural network successfully.');
    }

    /**
     * Get a suggestion for the passed tags
     *
     * @return {object[]}: The tag suggestions
     */
    async get(tags) {
        await this.train(tags);
        return this.neuralNetwork.run(tags);
    }
}

module.exports = TagSuggestionService;
