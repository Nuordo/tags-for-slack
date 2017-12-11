const { extractMentionedUsersAndTag } = require('../utils/messageParser')

class AssignTagCommand {
  constructor (slack, tagsService) {
    this.slack = slack
    this.tagsService = tagsService

    this.init()
  }

  init () {
    this.slack.on('/tag', async (msg, bot) => {
      try {
        console.warn(msg, bot);
        const { users, tag } = await extractMentionedUsersAndTag(msg.text)

        if (!users.length || !tag) {
          bot.replyPrivate('Please provide users and tag.')
          return
        }

        for (let i = 0; i < users.length; i += 1) {
          await this.tagsService.put({
            userId: users[i].userId,
            tag: tag.toLowerCase(),
            teamId: msg.team_id,
            userName: users[i].userName,
          })
        }

        bot.replyPrivate('User was tagged successfully.')
      } catch (error) {
        console.error(error)
        bot.replyPrivate('Whoops! An Error occured!')
      }
    })
  }
}

module.exports = AssignTagCommand
