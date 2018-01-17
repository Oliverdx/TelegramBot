process.env["NTBA_FIX_319"] = 1;

const TelegramBot = require('node-telegram-bot-api'); 
const token = 'YOUR TELEGRAMBOT TOKEN';
const bot = new TelegramBot(token, {polling: true});
var sites = require('./sites.json'); //catch the json file with the passwords and logins

bot.on('polling_error', (error) => {
  console.log('Erro: '+ error.code);
});


bot.onText(/senha (.+)/ ,(msg, match) => {
  const chatID = msg.chat.id; //Catch the Group unique ID
  const userID = msg.from.id;
  const theCode = match[1]; //Text after the command
  var found = false;
  
// console.log( chatID );
  
  if( chatID.toString() == "[ UNIQUE ID OF THE GROUP ]" ) { //check the Group
      for( let x = 0; x < sites.sites.length ; x++){ //Read the json file to look for the site
        if( sites.sites[x].name == match[1] ){
           bot.sendMessage(chatID, "Login: " + sites.sites[x].login);
           bot.sendMessage(chatID, "Senha: " +  sites.sites[x].password ); //if match with one of the websites return the login and password
           found = true;
        }
      } //End Search password
    
    if(!found){ bot.sendMessage(chatID, "NOT FOUND MESSAGE" );  } // return message if not found the site 
    
   }else{
     bot.sendMessage(chatID, "MESSAGE FOR RETURN WHEN THE BOT IS USED IN ANOTHER PLACE" ); //if try to use the bot in another group
   }
  
 
});



