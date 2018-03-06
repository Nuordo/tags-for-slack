const { extractMentionedUsersAndTags } = require('../utils/messageParser')

class AssignTagCommand {
  constructor (slack, tagsService) {
    this.slack = slack
    this.tagsService = tagsService

    this.init()
  }

  init () {
    this.slack.on('/tag', async (msg, bot) => {
      try {
        const { users, tags } = await extractMentionedUsersAndTags(msg.text)

        if (!users.length || !tags.length) {
          bot.replyPrivate('Please provide users and tags.')
          return
        }

        for (let i = 0; i < users.length; i += 1) {
          for (let j = 0; j < tags.length; j += 1) {
            await this.tagsService.put({
              userId: users[i].userId,
              tag: tags[j].toLowerCase(),
              teamId: msg.team_id,
              userName: users[i].userName,
            })
          }
        }

        bot.replyPrivate('Users were tagged successfully.')
      } catch (error) {
        console.error(error)
        bot.replyPrivate('Whoops! An Error occured!')
      }
    })
  }
}

module.exports = AssignTagCommand
