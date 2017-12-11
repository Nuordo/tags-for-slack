const extractMentionedUser = text => {
  const mentionPart = text.split('<')[1].split('>')[0]
  const userId = mentionPart.split('|')[0].split('@')[1]
  const userName = mentionPart.split('|')[1]

  return {
    userId,
    userName
  }
}

const extractMentionedUsersAndTag = text => {
  const usersRegex = /<@[a-zA-Z0-9]+\|[a-z0-9._-]+>/g
  const usersMatch = text.match(usersRegex) || []

  const tagRegex = /<@[a-zA-Z0-9]+\|[a-z0-9._-]+>\s+([^>]*)$/
  const tagMatch = text.match(tagRegex)
  const tag = tagMatch ? tagMatch[1] : null

  const users = []

  for (let i = 0; i < usersMatch.length; i += 1) {
    users.push(extractMentionedUser(usersMatch[i]))
  }

  return { users, tag }
}

module.exports = {
  extractMentionedUser,
  extractMentionedUsersAndTag
}
