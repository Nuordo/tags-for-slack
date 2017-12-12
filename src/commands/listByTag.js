class ListByTagCommand {
  constructor (slack, tagsService) {
    this.slack = slack
    this.tagsService = tagsService

    this.init()
  }

  init () {
    this.slack.on('/list-by-tag', async (msg, bot) => {
      try {
        if (!msg.text) {
          bot.replyPrivate('Please provide a tag to list users by.')
          return
        }

        const data = await this.tagsService.getByTag(msg.team_id, msg.text.toLowerCase())
        const users = []
        data.forEach((row) => {
          users.push(`@${row.userName}`)
        })

        bot.replyPrivate(`Tag "${msg.text.toLowerCase()}" is assigned to: ${users.join(', ')}`)
      } catch (error) {
        console.error(error)
        bot.replyPrivate('Whoops! An Error occured!')
      }
    })
  }
}

module.exports = ListByTagCommand
