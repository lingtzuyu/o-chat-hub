![take-notes chat-cover](https://user-images.githubusercontent.com/85784074/208057863-48d59286-a69a-4b96-8c1c-c86c8c456a0d.png)

## Introduction

[take-notes.chat](https://take-notes.chat/) is a messaging platform focus on productivity, it provides an intuitive way to users to write down their sudden idea and side notes during conversation. All “card notes” represent a flash of inspiration of certain topic in conversation which may have been forgotten in the past, in [take-notes.chat](https://take-notes.chat/), users can manage these ideas easily and export them to 3rd party platforms for further team collaboration, like Trello

## Table of Contents

1. [Tech stacks](#tech-stacks)
1. [Architecture](#architecture)
1. [How to use](#how-to-use)
    1. [Demo Accounts](#demo-accounts)
    2. [Save your ideas](#how-to-save-your-sudden-ideas-while-chatting)
    3. [Export your notes](#export-to-other-platform)

## Tech Stacks
- **Back-End**: Node.JS, Express
- **Front-End**: React.JS
- **Database**: MySQL, MongoDB, Redis
- **Cloud**: AWS| EC2, S3, RDS, ElastiCache, CloudFront
- **Others**: Nginx, Socket.io, Oauth, Redux

## Architecture
![architecture](https://user-images.githubusercontent.com/85784074/208058134-0ab16694-eb66-42b3-94d4-a82593e437c5.png)

## How to use
### Demo accounts
1. Please log into the demo accout for some existing live chat
```
  email: superuser@take-notes.com
  password: 88888888
```
2. If you would like to test live chat features, you can use the following email to login, the password is the same
```
  email1: vitalik@test.com
  email2: elon@test.com
  email3: satya@test.com
  
  password: 88888888
```
### How to save your sudden ideas while chatting
1. Press save button first to select messages
![save_messgae_gif](https://user-images.githubusercontent.com/85784074/208063799-891ca5e4-5a51-4da2-8002-190737c91d53.gif)

2. Press transfer button to transfer message to "card area", you can write down any notes and select category here
![transfer_messages](https://user-images.githubusercontent.com/85784074/208066447-b983fa4e-a5ae-4d45-8ce6-22e43ffbf8bd.gif)

3. Manage your "card notes" in the "quick card area"
  - mark it as read
  - delete
  - export to 3rd party platform
  - check the detailed messages (**so you can remember why you make this notes!**, this make take-notes.chat different than other chat or note apps)
![quick_card_view](https://user-images.githubusercontent.com/85784074/208067685-72ab5d99-ea30-4bde-8c7c-78ed2cd50981.gif)

### Export to other platform
Sometime, you may want to export your notes to other platform like Notion for further collaboration with you team, follow these steps!
1. Connect to your notion account first in the [profile page](https://take-notes.chat/profile)
    1. **Please do select the template provided by [take-notes.chat](https://take-notes.chat)** due to the strict format requirement of Notion, other template will be provided in the future
 
![link_notion](https://user-images.githubusercontent.com/85784074/208069338-3c8d15f7-8760-4a86-bc9c-13b46d0e00b0.gif)
