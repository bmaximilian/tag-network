/**
 * Created on 2019-01-06.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { includes, isEmpty, values } = require('lodash');

/**
 * @class TagNetworkService
 */
class TagNetworkService {
    /**
     * Constructor of TagSuggestionService
     */
    constructor(config, redis, tagModel, tagCollectionModel) {
        this.config = config;
        this.redis = redis;
        this.tagModel = tagModel;
        this.tagCollectionModel = tagCollectionModel;
        this.redisKeyTemplate = 'tags:network';
    }

    /**
     * Returns the tag network build from the database
     *
     * @param {string[] | null} tagsToGetNetworkFor : string[]|null : The tags to get the tag network for
     * @return {Promise<array>}
     */
    async getTagNetworkFromDB(tagsToGetNetworkFor = null) {
        const tags = !isEmpty(tagsToGetNetworkFor)
            ? await this.tagModel.where({
                $or: tagsToGetNetworkFor.map(tag => ({ name: tag.name })),
            }).fetch()
            : await this.tagModel.all();
        let tagCollections = await this.tagCollectionModel.with('tags').fetch();

        tagCollections = tagCollections.toJSON();

        const tagsWithRelations = tags.toJSON().reduce((accumulator, currentTag) => {
            const relatedTags = tagCollections.reduce((relatedAccumulator, currentTagCollection) => {
                if (!includes(currentTagCollection.tags.map(tag => tag.name), currentTag.name)) {
                    return relatedAccumulator;
                }

                return relatedAccumulator.concat(
                    currentTagCollection.tags
                    .filter((tag) => {
                        return !includes(relatedAccumulator.map(relatedTag => relatedTag._id), tag._id)
                            && tag._id !== currentTag._id;
                    }),
                );
            }, []);

            return [
                ...accumulator,
                {
                    ...currentTag,
                    relatedTags,
                },
            ];
        }, []);

        return tagsWithRelations;
    }

    /**
     * Remove and add the complete cache
     *
     * @param {array} network : array : The new network
     * @return {void}
     */
    async rebuildCache(network) {
        await Promise.all(
            network.map((tag) => {
                return this.redis.hset(
                    this.redisKeyTemplate,
                    tag._id,
                    JSON.stringify(tag),
                );
            }),
        );
    }

    /**
     * Remove and add the complete cache
     *
     * @param {object} tagCollection : object : The collection to add to the cache
     * @return {void}
     */
    async addOrUpdateCollectionInCache(tagCollection) {
        const network = await this.getTagNetworkFromDB(tagCollection.tags);

        return this.rebuildCache(network);
    }

    /**
     * Get a suggestion for the passed tags
     *
     * @return {array}: All the tags with relations
     */
    async getAll() {
        let network = await this.redis.hgetall(this.redisKeyTemplate);

        try {
            network = values(network).map(raw => JSON.parse(raw));
        } catch (e) {
            network = [];
        }

        if (isEmpty(network)) {
            network = await this.getTagNetworkFromDB();
            await this.rebuildCache(network);
        }

        return network;
    }

    /**
     * Get only the relations for a specific tag
     *
     * @param {string} id : string : The id of the tag
     * @return {object} : The tag with relations
     */
    async get(id) {
        const tag = await this.redis.hget(this.redisKeyTemplate, id);

        try {
            return JSON.parse(tag);
        } catch (e) {
            return null;
        }
    }
}

module.exports = TagNetworkService;
