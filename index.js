const TwitchBot = require('node-twitchbot')
 
const Bot = new TwitchBot({
  username : 'user',
  oauth    : 'oauth'
  channel  : 'cth103'
})
var robot = require("robotjs");
var mouse=robot.getMousePos();

/* Connect bot to Twitch IRC */
Bot.connect()
.then(() => {
 
  Bot.listen((err, chatter) => {
    if(err) {
      console.log(err)
    } else {
      console.log(chatter.msg)
    }
  })
 
  Bot.listenFor('up', (err, chatter) => {
    robot.moveMouseSmooth(mouse.x,mouse.y+100);
  })
  
  Bot.listenFor('down', (err, chatter) => {
    robot.moveMouseSmooth(mouse.x,mouse.y-100);
  })
  
  Bot.listenFor('right', (err, chatter) => {
    robot.moveMouseSmooth(mouse.x+100,mouse.y);
  })
 
  Bot.listenFor('left', (err, chatter) => {
    robot.moveMouseSmooth(mouse.x-100,mouse.y);
  })
 
  Bot.listenFor('leftclick', (err, chatter) => {
    robot.mouseClick("left");
  })
 
  Bot.listenFor('rightclick', (err, chatter) => {
    robot.mouseClick("right");
  })
 
  Bot.raw((err, event) => {
    console.log(event)
  })
const commands = {
 //*keyboard
  keyboard : (chatter) => {
    robot.typeString(chatter.msg.slice(10));
  },
 //*keytap
  keytap : (chatter) => {
    robot.keyTap(chatter.msg.slice(8));
  }

}

Bot.commands('*', commands, (err, chatter, command) => {
  if(err) {
    console.log(err)
  } else {
    console.log(command)
    console.log(chatter)
  }
})
})
.catch(err => {
  console.log('Connection error!')
  console.log(err)
})
