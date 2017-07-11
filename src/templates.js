exports.issue = (agenda) => `## Date/Time

(insert date)

It's helpful if you give this post a :+1: or :-1: so we know you'd like to attend.

## Agenda
${agenda}`

exports.minutesDoc = (date, tag, agenda, minutes) => `
# WG Meeting ${date}
from tag: *${tag}*

## Agenda

${agenda}

## Attendees

## Minutes

${minutes}
`
