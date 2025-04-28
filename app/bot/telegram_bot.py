from telegram import Bot

def send_message(token: str, chat_id: str, text: str):
    bot = Bot(token=token)
    bot.send_message(chat_id=chat_id, text=text)