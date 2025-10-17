const { Telegraf }  = require('Telegraf');
 
const bot = new Telegraf(process.env.REACT_APP_BOT_TOKEN)

bot.search((ctx) => ctx.reply('test'))

bot.launch()