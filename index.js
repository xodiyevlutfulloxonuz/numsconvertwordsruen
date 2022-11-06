
const TelegramBot = require('node-telegram-bot-api');
const {numberToWordsEnglish}=require('./english')
const {numberInWords}=require('./russian')
require('dotenv').config()

const token=process.env.TBOTTOKEN

const bot = new TelegramBot(token, {polling: true});


let ruState=0
let enState=0



bot.on('message', async(message) => {
    try{
        let keyboards={
            resize_keyboard:true,
            one_time_keyboard: true,
            keyboard:[
                 ['1️⃣ Ru', '2️⃣ En'],
                 ["👨‍💻Admin bilan bog'lanish","📊 Foydalanuvchilar soni"]
                
            ]
        }
        const chatId=message.chat.id 
        const username =message.from.first_name
        if(message.text==="/start"){
            ruState=0
            enState=0
            await bot.sendMessage(chatId, `<b> Assalomu alaykum ${username}.\nTilni tanlang.</b>`,{
            reply_markup:keyboards,
            parse_mode:'HTML'
            })
        }
                
       
        else if(message.text=='1️⃣ Ru'){
            enState=0
            await bot.sendMessage(chatId,"<b>Ixtiyoriy biror bir natural son yuboring.</b>",{
                parse_mode:'HTML'
            })
            ruState=1
        }
        else if(message.text=='2️⃣ En'){
            ruState=0
            await bot.sendMessage(chatId,"<b>Ixtiyoriy biror bir natural son yuboring.</b>",{
                parse_mode:'HTML'
            })
            enState=1
        }
        else if(message.text=="👨‍💻Admin bilan bog'lanish"){
            bot.sendMessage(chatId, "<b>Admin bilan bog'lanish @xodiyevlutfulloxonuz</b>",{
                parse_mode:'HTML'
            })

        }
        else if(message.text=="📊 Foydalanuvchilar soni"){
            await bot.sendMessage(chatId, "<b> Botdan foydalanuvchilari soni  992 kishini tashkil etadi.\nBotni qaytadan ishga tushirish uchun /start ni ustiga bosing.</b>",{
                parse_mode:'HTML'
            })
        }
        else if(!Number.isInteger(Number(message.text))){
          await bot.sendMessage(chatId, "Iltimos Butun son kiriting.")
        }

        else if(enState===1){
        
            let text=numberToWordsEnglish(message.text)
            await bot.sendMessage(chatId,text)
        }
       
       
        else if(ruState===1){
            let text=numberInWords(message.text)
            await bot.sendMessage(chatId, text)
        }
       
        
    }
       catch(e){
        console.log(e+"");
       } 

});