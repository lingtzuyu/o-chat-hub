﻿﻿![take-notes chat-cover](https://user-images.githubusercontent.com/85784074/208057863-48d59286-a69a-4b96-8c1c-c86c8c456a0d.png)

## Introduction

[take-notes.chat](https://take-notes.chat/) is a messaging platform focus on productivity, it provides an intuitive way to users to write down their sudden idea and side notes during conversation. All “card notes” represent a flash of inspiration of certain topic in conversation which may have been forgotten in the past, in [take-notes.chat](https://take-notes.chat/), users can manage these ideas easily and export them to 3rd party platforms for further team collaboration, like Trello

## Changelog

The version is following Semantic Versioning rule

| Version | Release Date |             Patch Notes             |
| ------- | :----------: | :---------------------------------: |
| 1.0.0   |  2022/12/16  | released version of take-notes.chat |

## Features in future

1. Trello connection
2. Whatsapp integration
3. ChatGPT integration

## Table of Contents

1. [Tech stacks](#tech-stacks)
1. [Architecture](#architecture)
1. [DB schema](#db-schema)
   1. [MySQL](#mysql)
   2. [MongoDB](#mongodb)
1. [How to use](#how-to-use)
   1. [Demo Accounts](#demo-accounts)
   2. [Save your ideas](#how-to-save-your-sudden-ideas-while-chatting)
   3. [Export your notes](#export-to-other-platform)
      - [Sequence diagram of how take-notes.chat integrate 3rd party app](#sequence-diagram)
   4. [Note Card Page](#note-card-page)

## Tech Stacks

- **Back-End**: Node.JS, Express
- **Front-End**: React.JS
- **Database**: MySQL, MongoDB, Redis
- **Cloud**: AWS| EC2, S3, RDS, ElastiCache, CloudFront
- **Others**: Nginx, Socket.io, Oauth, Redux, Materail-UI

## Architecture

<img width="967" alt="image" src="https://user-images.githubusercontent.com/85784074/217995101-bd5a565b-8d9c-46f9-ac11-4a7cbf168185.png">

## DB schema

### MySQL

![image](https://user-images.githubusercontent.com/85784074/209140605-a6c292e8-0c62-4c17-a1e4-4ecab3cf9740.png)

### MongoDB

![未命名绘图 drawio](https://user-images.githubusercontent.com/85784074/209139526-2729d236-2a2c-4874-bdaf-d44e9296c95b.png)

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

3. You can use your own Notion account to test the export function, or, we provide you a test Notion account as below
   ![image](https://user-images.githubusercontent.com/85784074/208284417-f9450def-6724-4e05-a6c8-8b6bd74b5d0c.png)

```
   account: takenoteschat@gmail.com
   passsword: Aa-12345678
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

##### Sequence diagram

Picture below indicates the **sequence diagram** of how take-notes.chat takes grantness and access 3rd party app (_Take Notion for example_)

![Sequence Diagram](https://user-images.githubusercontent.com/85784074/208112773-47c6240d-aafc-41e2-9ad5-9495898a4dd7.png)

1. Connect to your notion account first in the [profile page](https://take-notes.chat/profile)
   1. **Please do select the template provided by** [take-notes.chat](https://take-notes.chat) due to the strict format requirement of Notion, other template will be provided in the future

![link_notion](https://user-images.githubusercontent.com/85784074/208069338-3c8d15f7-8760-4a86-bc9c-13b46d0e00b0.gif) 2. There are several options to configure the connection of 3rd party app in profile page

- In the "connected" condition
  - Click left side (_red 1 in the picture below_) to go the linked notion
  - Click right side (_red 2 in the picture below_) to disconnect the linked notion

![image](https://user-images.githubusercontent.com/85784074/208101601-87119b1e-1d7e-4598-808a-aa98857fae0b.png)

- In the "disconnected" condstion
  - Click left side (_green1 in the picture below_) to recover the connection (**if you did not connect to this app before, it will not have effect**)
  - Click right side (_ green 2 in the picture below_) to connect to the new one (**in this case, a new notion template or a new trello account**), please note that **this will remove the previous linked notion** (if exists)

![image](https://user-images.githubusercontent.com/85784074/208103130-5f499e4f-5858-4111-b6e3-3fe042d15d9d.png)

3. If you need to collaborate with your team, try to export your note cards! Select the status and priority for project management! You can export notes in quick note area (in the right side of message area) or [card page](https://take-notes.chat/card) (_Trello will be supported in the next version_)

![export_notion](https://user-images.githubusercontent.com/85784074/208105951-0d8e4f1f-d759-4ffd-a984-187bd3d3d875.gif)

![notion_op](https://user-images.githubusercontent.com/85784074/208108016-725a0c0d-08e4-404f-8308-1f033798fb98.gif)

### Note Card Page

A note card (Zettelkasten) is your second brain, with the spirit of "get things down", you can sort your daily life in a more productive way and even transform a sudden idea in your daily conversation into a business!

There are several key features in [card page](https://take-notes.chat/card)

1. Edit notes or title if you come up with new ideas when browsing notes!

![edit_card](https://user-images.githubusercontent.com/85784074/208104434-06195fb3-b32a-45fb-8390-fba0dd3b9393.gif)

2. Change the category if marked the worng category while transition

![change_cate](https://user-images.githubusercontent.com/85784074/208104944-f88b64cb-439d-4ebd-bc58-119ad01e6afb.gif)

3. Mark the notes as read or unread to remind yourself if you have reviewed it

![read](https://user-images.githubusercontent.com/85784074/208106863-1d6a66d2-b094-4388-b189-d31c519a94eb.gif)

4. Export it or check the exported page!

![export_page](https://user-images.githubusercontent.com/85784074/208107574-20ee7def-3af1-494d-a080-1d0d689e8ff9.gif)

5. You might have further ideas when browsing cards, don't just let it go, click the chat button to chat with the one who inspired you directly!

![forward](https://user-images.githubusercontent.com/85784074/208108386-d5a0d834-70ac-4851-85ac-285b194946da.gif)
