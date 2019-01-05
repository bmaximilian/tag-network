
/*
 |--------------------------------------------------------------------------
 | TagCollectionSeeder
 |--------------------------------------------------------------------------
 |
 | Make use of the Factory instance to seed database with dummy data or
 | make use of Lucid models directly.
 |
 */

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Database = use('Database');
const TagCollection = use('App/Modules/Tags/Models/TagCollection');
const Tag = use('App/Modules/Tags/Models/Tag');

class TagCollectionSeeder {
    /**
     * Constructor of tag collection seeder
     */
    constructor() {
        this.data = [
            {
                tags: [
                    'react',
                    'redux',
                    'rxjs',
                    'javascript',
                ],
            },
            {
                tags: [
                    'redux',
                    'rxjs',
                    'redux-observable',
                ],
            },
            {
                tags: [
                    'angular',
                    'rxjs',
                    'typescript',
                ],
            },
            {
                tags: [
                    'angularjs',
                    'javascript',
                ],
            },
            {
                tags: [
                    'vue',
                    'vuex',
                    'vuetify',
                ],
            },
            {
                tags: [
                    'frameworks',
                    'vue',
                    'react',
                    'angular',
                    'angularjs',
                ],
            },
            {
                tags: [
                    'react',
                    'jss',
                    'material-ui',
                ],
            },
            {
                tags: [
                    'ui',
                    'jss',
                    'material-ui',
                    'vuetify',
                    'angular-material',
                ],
            },
            {
                tags: [
                    'react',
                    'react-native',
                    'ios',
                    'redux',
                ],
            },
            {
                tags: [
                    'facebook',
                    'profile',
                    'comment',
                    'help',
                ],
            },
            {
                tags: [
                    'facebook',
                    'timeline',
                    'comment',
                    'help',
                ],
            },
            {
                tags: [
                    'stackoverflow',
                    'question',
                    'help',
                    'comment',
                ],
            },
        ];
    }

    /**
     * Runs the seeder
     *
     * @returns {Promise<void>}
     */
    async run() {
        const mongoClient = await Database.connect();

        await mongoClient.collection('tag_collections').deleteMany({});
        await mongoClient.collection('tags').deleteMany({});

        /* eslint-disable no-await-in-loop */
        // need to use await in for loop because each tag must be checked if it already exists
        // therefore the insertion needs to be synchronous

        for (let i = 0; i < this.data.length; i += 1) {
            const collection = this.data[i];
            const dbCollection = new TagCollection();

            await dbCollection.save();

            const dbTags = [];

            for (let k = 0; k < collection.tags.length; k += 1) {
                let dbTag = await Tag
                .where({ name: collection.tags[k] })
                .first();

                if (!dbTag) {
                    dbTag = new Tag();
                    dbTag.name = collection.tags[k];
                    await dbTag.save();
                }

                dbTags.push(dbTag);
            }

            dbTags.forEach(tag => dbCollection.tags().attach(tag._id));

            await dbCollection.save();
        }

        await Database.close();
    }
}

module.exports = TagCollectionSeeder;
