import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(`${process.env.REACT_APP_BOT_TOKEN}`, {polling: false});

bot.onText(/\/start/)