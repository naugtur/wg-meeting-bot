# wg-meeting-cli

## Features

- creates agenda and meeting minutes markdown in a gist
- creates an issue in given repository with agenda
- returns links to created items

more to come.

## Installation

```
npm i -g wg-meeting-cli
```
## Usage
```
prepare-wg-meeting --token=GITHUB_USER_TOKEN --tag=tag-to-look-for --issuerepo=user/project
```

Your token needs scope for: gist, public_repo.
[How to get a token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)


## TODO

help welcome :)

- automate publishing markdown to a collaborative editor
- automate hangouts on air
