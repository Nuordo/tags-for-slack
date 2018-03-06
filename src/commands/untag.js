const { extractMentionedUsersAndTags } = require('../utils/messageParser')

class UntagCommand {
  constructor (slack, tagsService) {
    this.slack = slack
    this.tagsService = tagsService

    this.init()
  }

  init () {
    this.slack.on('/untag', async (msg, bot) => {
      try {
        const { users, tags } = await extractMentionedUsersAndTags(msg.text)

        if (!users.length || !tags.length) {
          bot.replyPrivate('Please provide users and tags.')
          return
        }

        for (let i = 0; i < users.length; i += 1) {
          for (let j = 0; j < tags.length; j += 1) {
            await this.tagsService.delete(msg.team_id, users[i].userId, tags[j].toLowerCase())
          }
        }

        bot.replyPrivate('Users were untagged successfully.')
      } catch (error) {
        console.error(error)
        bot.replyPrivate('Whoops! An Error occured! Most probably one of the users is not assigned with one of the tags.')
      }
    })
  }
}

module.exports = UntagCommand
