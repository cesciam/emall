 using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;
using Twilio.Rest.Preview.TrustedComms;
using Web_API.Controllers;

namespace TelegramChatBot
{
    class Program
    {
        private static readonly TelegramBotClient Bot = new TelegramBotClient("1384676494:AAHLTrjqgxRNOV1gfKXcOxKZjbn_4oR6fWI");
        private static ComercioManagement comercios = new ComercioManagement();
        private static SucursalManagement sucursales = new SucursalManagement(); 
       // private static  ComercioController comercioController = new ComercioController();
        static void Main(string[] args)
        {
            //Método que se ejecuta cuando se recibe un mensaje
            Bot.OnMessage += BotOnMessageReceived;

            //Método que se ejecuta cuando se recibe un callbackQuery
            Bot.OnCallbackQuery += BotOnCallbackQueryReceived;

            //Método que se ejecuta cuando se recibe un error
            Bot.OnReceiveError += BotOnReceiveError;

            //Inicia el bot
            Bot.StartReceiving();
            Console.WriteLine("Bot levantado!");
            Console.ReadLine();
            Bot.StopReceiving();
        }

        private static async void BotOnMessageReceived(object sender, MessageEventArgs messageEventArgs)
        {
            var message = messageEventArgs.Message;

            if (message == null || message.Type != MessageType.Text) return;

            switch (message.Text.Split(' ').First())
            {
                //Enviar un inline keyboard con callback
                case "/comercios":

                    //Simula que el bot está escribiendo
                    await Bot.SendChatActionAsync(message.Chat.Id, ChatAction.Typing);

                    await Task.Delay(50);

                    var keyboardEjemplo1 = new InlineKeyboardMarkup(new[]
                    {
                    new []
                    {
                        InlineKeyboardButton.WithCallbackData(
                            text:"Comercios",
                            callbackData: "comercios"),//lo que se manda al case
                       
                    } 
                });

                    await Bot.SendTextMessageAsync(
                        message.Chat.Id,
                        "Elija una opción",
                        replyMarkup: keyboardEjemplo1);
                    break;
                

                //Mensaje por default
                default:
                    const string usage = @"
                Comandos:
                /comercios - Se muestra la lista de comercios
                /start - muestra el menú";

                    await Bot.SendTextMessageAsync(
                        message.Chat.Id,
                        text: usage,
                        replyMarkup: new ReplyKeyboardRemove());

                    break;
            }
        }

        //SE MUESTRA LA INFROMACION QUE HA PEDIDO EL USUARIO
        private static async void BotOnCallbackQueryReceived(object sender, CallbackQueryEventArgs callbackQueryEventArgs)
        {
            //var message = messageEventArgs.Message;
            var callbackQuery = callbackQueryEventArgs.CallbackQuery;

            switch (callbackQuery.Data)
            {
                case "comercios": //MUESTRA LA LISTA DE LOS COMERCIOS 

                    List<Comercio> listaComercios = new List<Comercio>();
                    listaComercios = comercios.ObtenerTodoComercio();
                    //var BotComercios = new InlineKeyboardButton[];

                    /* foreach (Comercio lista in listaComercios)
                     {

                        var BotComercios = new InlineKeyboardMarkup(new[]
                   {
                      new []
                      {
                         InlineKeyboardButton.WithCallbackData(text:
                             lista.Nombre, callbackData: "Id:"+ lista.Id),//lo que se manda al case

                      }
                      });
                        
                     }*/
                    var Botcomercios = new InlineKeyboardButton[listaComercios.Count()][];
                    int counter = 0;
                    foreach (var lista in listaComercios)
                    {
                        var row = new[]
                        {
                     InlineKeyboardButton.WithCallbackData(text: lista.Nombre,callbackData: "id:"+lista.Id)
                 };
                        Botcomercios[counter] = row;
                        counter++;
                        
                     }

                    await Bot.SendTextMessageAsync(
                       chatId: callbackQuery.Message.Chat.Id,
                       text: "Lista de comercios:",
                       replyMarkup: new InlineKeyboardMarkup(Botcomercios));


                    break;

                case "id:lista.Id":

                    string dato = "comercio:lista.Id"; 
                    char[] sep = { ':'};
                    Int32 count = 2;
                    String[] strlist = dato.Split(sep,
                    count, StringSplitOptions.None);

                    var sucursal = new Sucursal { Id = Int32.Parse(strlist[2])};

                    List<Sucursal> listaSucursales = new List<Sucursal>();
                    listaSucursales = sucursales.ObtenerTodoSucursal(sucursal); 
                    break;


            }
        }

      

        private static void BotOnReceiveError(object sender, ReceiveErrorEventArgs receiveErrorEventArgs)
        {
            Console.WriteLine("Received error: {0} — {1}",
                receiveErrorEventArgs.ApiRequestException.ErrorCode,
                receiveErrorEventArgs.ApiRequestException.Message);
        }
    }
}

