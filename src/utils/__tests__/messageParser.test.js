const {
    extractMentionedUser,
    extractMentionedUsersAndTags
} = require('../messageParser')

test('it extracts mentioned user', () => {
    const text = '/tag <@123ASD123|karol.sojko> tag1'
    const data = {
        userId: '123ASD123',
        userName: 'karol.sojko'
    }

    expect(extractMentionedUser(text)).toEqual(data)
})

test('it extracts mentioned user and tag', () => {
    const text = '/tag <@123ASD123|karol.sojko> tag1'
    const data = {
        users: [
            {
                userId: '123ASD123',
                userName: 'karol.sojko'
            }
        ],
        tags: [
            'tag1'
        ]
    }

    expect(extractMentionedUsersAndTags(text)).toEqual(data)
})

test('it extracts mentioned users and tag', () => {
    const text = '/tag <@123ASD123|karol.sojko> <@234ZXC234|john.doe> tag1'
    const data = {
        users: [
            {
                userId: '123ASD123',
                userName: 'karol.sojko'
            },
            {
                userId: '234ZXC234',
                userName: 'john.doe'
            },
        ],
        tags: [
            'tag1'
        ]
    }

    expect(extractMentionedUsersAndTags(text)).toEqual(data)
})

test('it extracts mentioned users and tags', () => {
    const text = '/tag <@123ASD123|karol.sojko> <@234ZXC234|john.doe> tag1, tag2,tag3'
    const data = {
        users: [
            {
                userId: '123ASD123',
                userName: 'karol.sojko'
            },
            {
                userId: '234ZXC234',
                userName: 'john.doe'
            },
        ],
        tags: [
            'tag1',
            'tag2',
            'tag3'
        ]
    }

    expect(extractMentionedUsersAndTags(text)).toEqual(data)
})
