const { extractMentionedUsersAndTag } = require('../utils/messageParser')

class UntagCommand {
  constructor (slack, tagsService) {
    this.slack = slack
    this.tagsService = tagsService

    this.init()
  }

  init () {
    this.slack.on('/untag', async (msg, bot) => {
      try {
        const { users, tag } = await extractMentionedUsersAndTag(msg.text)

        if (!users.length || !tag) {
          bot.replyPrivate('Please provide users and tag.')
          return
        }

        for (let i = 0; i < users.length; i += 1) {
          await this.tagsService.delete(msg.team_id, users[i].userId, tag.toLowerCase())
        }

        bot.replyPrivate('User was untagged successfully.')
      } catch (error) {
        console.error(error)
        bot.replyPrivate('Whoops! An Error occured! Most probably the user is not assigned with that tag.')
      }
    })
  }
}

module.exports = UntagCommand
