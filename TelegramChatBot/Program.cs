 using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
        private static ItemManagement items = new ItemManagement();
        private static UsuarioManagement user = new UsuarioManagement();
        private static EmpleadoManagement empleado = new EmpleadoManagement();
        private static UsuarioManagement usuarios = new UsuarioManagement(); 
      
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

            //ese texto del bot 
            //dentro del if se mete id del usaurio 


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
                /start - muestra el menú
                /listaCitas - muestra sus citas correspondientes";

                        await Bot.SendTextMessageAsync(
                            message.Chat.Id,
                            text: usage,
                            replyMarkup: new ReplyKeyboardRemove());

                        break;
                }

            
        }

        //SE MUESTRA LA INFORMACION QUE HA PEDIDO EL USUARIO
        private static async void BotOnCallbackQueryReceived(object sender, CallbackQueryEventArgs callbackQueryEventArgs)
        {
            //var message = messageEventArgs.Message;
            var callbackQuery = callbackQueryEventArgs.CallbackQuery;

            switch (callbackQuery.Data.Split(":")[0]) 
            {

                case "comercios": //MUESTRA LA LISTA DE LOS COMERCIOS 

                    List<Comercio> listaComercios = new List<Comercio>();
                    listaComercios = comercios.ObtenerTodoComercio();
              
                    var Botcomercios = new InlineKeyboardButton[listaComercios.Count()][];
                    int counter = 0;
                    foreach (var lista in listaComercios)
                    {
                        var row = new[]
                        {
                     InlineKeyboardButton.WithCallbackData(text: lista.Nombre,callbackData: "sucursales:"+lista.Id)

                       
                 };
                        Botcomercios[counter] = row;
                        counter++;
                        
                     }

                    await Bot.SendTextMessageAsync(
                       chatId: callbackQuery.Message.Chat.Id,
                       text: "Lista de comercios:",
                       replyMarkup: new InlineKeyboardMarkup(Botcomercios));


                    break;

                case "sucursales":
         
                    var sucursal = new Sucursal { IdComercio = Int32.Parse(callbackQuery.Data.Split(":")[1]) };

                    List<Sucursal> listaSucursales = new List<Sucursal>();

                    listaSucursales = sucursales.ObtenerTodoSucursal(sucursal);

                    var Botsucursales = new InlineKeyboardButton[listaSucursales.Count()][];
                    int iterable= 0;
                    foreach (var list in listaSucursales)
                    {
                        var row = new[]
                        {
                     InlineKeyboardButton.WithCallbackData(text: list.Nombre,callbackData: "opcionesSucursales:"+list.Id)

                 };
                        Botsucursales[iterable] = row;
                        iterable++;

                    }

                    await Bot.SendTextMessageAsync(
                       chatId: callbackQuery.Message.Chat.Id,
                       text: "Lista de sucursales:",
                       replyMarkup: new InlineKeyboardMarkup(Botsucursales));
                    break;


                case "opcionesSucursales":

                    var sucursalList = new InlineKeyboardMarkup(new[]
                    {
                    new []
                    {
                        InlineKeyboardButton.WithCallbackData(
                            text:"Dirección",
                            callbackData: "direccion: "+Int32.Parse(callbackQuery.Data.Split(":")[1])),//lo que se manda al case
                       InlineKeyboardButton.WithCallbackData(
                            text:"Servicios",
                            callbackData: "servicios: "+ Int32.Parse(callbackQuery.Data.Split(":")[1])),//lo que se manda al case
                    }
                });
                    await Bot.SendTextMessageAsync(
                     chatId: callbackQuery.Message.Chat.Id,
                     text: "Opciones: ",
                     replyMarkup: sucursalList);


                    break;

                case "direccion":

                    var sucursalDireccion = new Sucursal { Id = Int32.Parse(callbackQuery.Data.Split(":")[1]) };
                   Sucursal direccion = sucursales.ObtenerSucursal(sucursalDireccion);

                    await Bot.SendLocationAsync(
                       chatId: callbackQuery.Message.Chat.Id,
                       latitude: float.Parse(direccion.Latitud),
                       longitude: float.Parse(direccion.Longitud)
                       );

                    break;


                case "servicios":
                    var Id = Int32.Parse(callbackQuery.Data.Split(":")[1]);

                    List<Item> listItem = new List<Item>();

                    listItem = items.RetrieveAllBySucursal(Id); 

                    var BotItem = new InlineKeyboardButton[listItem.Count()][];
                    int count1 = 0;
                    foreach (var list in listItem)
                    {
                        //VALIDACION QUE SOLO SEAN SERVICIOS
                            var row = new[]
                            {
                     InlineKeyboardButton.WithCallbackData(text: list.nombre,callbackData: "itemOpciones:"+list.id)

                 };
                            BotItem[count1] = row;
                            count1++;
                        
                       
                    }

                    await Bot.SendTextMessageAsync(
                       chatId: callbackQuery.Message.Chat.Id,
                       text: "Lista de servicios:",
                       replyMarkup: new InlineKeyboardMarkup(BotItem));
                    break;

                case "itemOpciones":

                    var opcionesItem = new InlineKeyboardMarkup(new[]
                  {
                    new []
                    {
                        InlineKeyboardButton.WithCallbackData(
                            text:"Nueva Cita",
                            callbackData: "nuevaCita: "+Int32.Parse(callbackQuery.Data.Split(":")[1])),//lo que se manda al case, el id del item 
                       
                    }
                });
                    await Bot.SendTextMessageAsync(
                     chatId: callbackQuery.Message.Chat.Id,
                     text: "Citas: ",
                     replyMarkup: opcionesItem);


                    break;

                case "nuevaCita":



                    var id_item = Int32.Parse(callbackQuery.Data.Split(":")[1]);

                    List<EmpleadosXItem> empleados = new List<EmpleadosXItem>();

                    empleados = items.obtenerEmpleadosItem(id_item);

                    var BotEmpleado = new InlineKeyboardButton[empleados.Count()][];
                    int count3 = 0;
                    foreach (var list in empleados)
                    {
                        var nuevo_empleado = new Empleado { id = list.id_empleado };

                        Empleado nombre_empleado = empleado.RetrieveById(nuevo_empleado);

                        var usuario = new Usuario { Id = nombre_empleado.id_usuario };

                        Usuario usuarioMostrar = usuarios.RetrieveById(usuario);

                        //VALIDACION QUE SOLO SEAN SERVICIOS
                        var row = new[]
                        {
                     InlineKeyboardButton.WithCallbackData(text: usuarioMostrar.Nombre,callbackData: "itemOpciones:"+ list.id_empleado)//mas el id del cliente

                 };
                        BotEmpleado[count3] = row;
                        count3++;


                    }

                    await Bot.SendTextMessageAsync(
                       chatId: callbackQuery.Message.Chat.Id,
                       text: "Empleados disponibles:",
                       replyMarkup: new InlineKeyboardMarkup(BotEmpleado));


                    //forcereply


                    break; 

                    
            }
        }

        private static async Task registrarCitas()
        {

        }

        private static void BotOnReceiveError(object sender, ReceiveErrorEventArgs receiveErrorEventArgs)
        {
            Console.WriteLine("Received error: {0} — {1}",
                receiveErrorEventArgs.ApiRequestException.ErrorCode,
                receiveErrorEventArgs.ApiRequestException.Message);
        }
    }
}

