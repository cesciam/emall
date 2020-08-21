 using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AppCore;
using Entities;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Logging;
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
        private static CitaManagement citas = new CitaManagement();

       static string[] datosCitas = new string[7]; 
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


            if(message.ReplyToMessage != null && message.ReplyToMessage.Text.Equals("Ingrese la fecha, la hora de inicio, la hora de fin de la cita. Ejemplo: 2020-08-24,17:00:00,18:00:00"))
            {
                try
                {
                    int id = Int32.Parse(datosCitas[2]);
                    int item = Int32.Parse(datosCitas[1]);
                    int sucursal = Int32.Parse(datosCitas[3]);
                    DateTime fecha = DateTime.Parse(message.Text.Split(",")[0]);
                    string hora_inicio = message.Text.Split(",")[1];
                    string hora_fin = message.Text.Split(",")[2];

                    int aprobado = RegistroCitas(fecha, hora_inicio, hora_fin);
                
                if(aprobado == 0)
                {
                    var keyboardCitas = new InlineKeyboardMarkup(new[]
                         {
                    new []
                    {
                        InlineKeyboardButton.WithCallbackData(
                            text:"Modificar cita",
                            callbackData: "nuevaCita:"+ id+":"+item+":"+sucursal),//lo que se manda al case
                       
                    }
                });

                    await Bot.SendTextMessageAsync(
                            message.Chat.Id,
                            "La hora elegida o el empleado no se encuentran disponibles",
                            replyMarkup: keyboardCitas);

                        return;
                }
                else
                {
                    var keyboardAprobado = new InlineKeyboardMarkup(new[]
                         {
                    new []
                    {
                        InlineKeyboardButton.WithCallbackData(
                            text:"Comercios",
                            callbackData: "comercios:"+ id),//lo que se manda al case
                       
                    }
                });

                    await Bot.SendTextMessageAsync(
                            message.Chat.Id,
                            "¡La cita ha sido registrada exitosamente!",
                            replyMarkup: keyboardAprobado);

                        return;
                }
                }
                catch (Exception e) { Console.WriteLine(e.Message); }

            }

            if(message.ReplyToMessage != null && message.ReplyToMessage.Text.Equals("Debe iniciar sesión antes de sacar un cita, ingrese su correo electrónico y contraseña separados por una coma"))
            {
                try
                {


                    int item = Int32.Parse(datosCitas[1]);
                    int sucursal = Int32.Parse(datosCitas[3]);
                    var correo = message.Text.Split(",")[0];
                    var contrasenna = message.Text.Split(",")[1];
                    Usuario usuario_valido = LogIn(correo, contrasenna);

                    if (usuario_valido.Id != 0)
                    {
                        var keyboardCitas = new InlineKeyboardMarkup(new[]
                             {
                    new []
                    {
                        InlineKeyboardButton.WithCallbackData(
                            text:"Continuar con el registro de la cita",
                            callbackData: "nuevaCita:"+ usuario_valido.Id+":"+item+":"+sucursal),//lo que se manda al case
                       
                    }
                });

                        await Bot.SendTextMessageAsync(
                                message.Chat.Id,
                                "Elija una opción",
                                replyMarkup: keyboardCitas);

                        return;
                    }
                    else
                    {

                        await Bot.SendTextMessageAsync(
                          message.Chat.Id,
                         "Debe registrarse primero dentro de la plataforma");
                    }
                }catch(Exception e) { Console.WriteLine(e.Message); }
            }

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
                            callbackData: "comercios:"+"0"),//lo que se manda al case
                       
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

        //SE MUESTRA LA INFORMACION QUE HA PEDIDO EL USUARIO
        private static async void BotOnCallbackQueryReceived(object sender, CallbackQueryEventArgs callbackQueryEventArgs)
        {
            //var message = messageEventArgs.Message;
            var callbackQuery = callbackQueryEventArgs.CallbackQuery;

            switch (callbackQuery.Data.Split(":")[0]) 
            {

                case "comercios": //MUESTRA LA LISTA DE LOS COMERCIOS 

                    var usuario = Int32.Parse(callbackQuery.Data.Split(":")[1]); 
                    List<Comercio> listaComercios = new List<Comercio>();
                    listaComercios = comercios.ObtenerTodoComercio();
              
                    var Botcomercios = new InlineKeyboardButton[listaComercios.Count()][];
                    int counter = 0;
                    foreach (var lista in listaComercios)
                    {
                        var row = new[]
                        {
                     InlineKeyboardButton.WithCallbackData(text: lista.Nombre,callbackData: "sucursales:"+lista.Id + ":"+ usuario)

                       
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

                    var usuario_1 =Int32.Parse(callbackQuery.Data.Split(":")[2]);


                    var sucursal = new Sucursal { IdComercio = Int32.Parse(callbackQuery.Data.Split(":")[1]) };

                    List<Sucursal> listaSucursales = new List<Sucursal>();

                    listaSucursales = sucursales.ObtenerTodoSucursal(sucursal);

                    var Botsucursales = new InlineKeyboardButton[listaSucursales.Count()][];
                    int iterable= 0;
                    foreach (var list in listaSucursales)
                    {
                        var row = new[]
                        {
                     InlineKeyboardButton.WithCallbackData(text: list.Nombre,callbackData: "opcionesSucursales:"+usuario_1+ ":"+ list.Id)

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
                            callbackData: "direccion: "+Int32.Parse(callbackQuery.Data.Split(":")[2])),//lo que se manda al case
                       InlineKeyboardButton.WithCallbackData(
                            text:"Servicios",
                            callbackData: "servicios: "+ Int32.Parse(callbackQuery.Data.Split(":")[1])+":"+Int32.Parse(callbackQuery.Data.Split(":")[2])),//lo que se manda al case
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

                  
                    //var Id = Int32.Parse(callbackQuery.Data.Split(":")[1]);
                    var usuario_2 = Int32.Parse(callbackQuery.Data.Split(":")[1]);
                    var id_sucursal = Int32.Parse(callbackQuery.Data.Split(":")[2]);

                    List<Item> listItem = new List<Item>();

                    listItem = items.RetrieveAllBySucursal(id_sucursal); 

                    
                    foreach (var list in listItem)
                    {

                        if (list.tipo.Equals("Servicio"))
                        {
                            var BotItem = new InlineKeyboardButton[listItem.Count()][];
                            int count1 = 0;
                            var row = new[]
                           {
                     InlineKeyboardButton.WithCallbackData(text: list.nombre,callbackData: "itemOpciones:"+usuario_2+":"+list.id+":"+id_sucursal)

                 };
                            BotItem[count1] = row;
                            count1++;

                            await Bot.SendTextMessageAsync(
                      chatId: callbackQuery.Message.Chat.Id,
                      text: "Lista de servicios:",
                      replyMarkup: new InlineKeyboardMarkup(BotItem));

                            return;
                        }
                        else
                        {
                            var sucursalError = new InlineKeyboardMarkup(new[]
                    {
                    new []
                    {
                       InlineKeyboardButton.WithCallbackData(
                            text:"Comercios",
                            callbackData: "comercios: "+usuario_2),//lo que se manda al case
                    }
                });
                            await Bot.SendTextMessageAsync(
                             chatId: callbackQuery.Message.Chat.Id,
                             text: "No se encontraron servicios, ingrese a un nuevo comercio: ",
                             replyMarkup: sucursalError);

                            return;
                        }

                    }

                   
                    break;

                case "itemOpciones":

                    var opcionesItem = new InlineKeyboardMarkup(new[]
                  {
                    new []
                    {
                        InlineKeyboardButton.WithCallbackData(
                            text:"Nueva Cita",
                            callbackData: "nuevaCita: "+Int32.Parse(callbackQuery.Data.Split(":")[1])+":"+Int32.Parse(callbackQuery.Data.Split(":")[2])+":"+Int32.Parse(callbackQuery.Data.Split(":")[3])),//lo que se manda al case, el id del item 
                       
                    }
                });
                    await Bot.SendTextMessageAsync(
                     chatId: callbackQuery.Message.Chat.Id,
                     text: "Citas: ",
                     replyMarkup: opcionesItem);


                    break;

                case "nuevaCita":

                    var id_item = Int32.Parse(callbackQuery.Data.Split(":")[2]);
                    var idSucursal = Int32.Parse(callbackQuery.Data.Split(":")[3]);

                    datosCitas[1] = id_item.ToString();
                    datosCitas[3] = idSucursal.ToString();

                    int id_usuario = Int32.Parse(callbackQuery.Data.Split(":")[1]);//id del usuario pos 1


                    if (id_usuario == 0)
                    {
                        await Bot.SendTextMessageAsync(
                            chatId: callbackQuery.Message.Chat.Id,
                            text: "Debe iniciar sesión antes de sacar un cita, ingrese su correo electrónico y contraseña separados por una coma",
                            replyMarkup: new ForceReplyMarkup());
                    }
                    else
                    {
                   
                            List<EmpleadosXItem> empleados = new List<EmpleadosXItem>();

                            empleados = items.obtenerEmpleadosItem(id_item);

                            var BotEmpleado = new InlineKeyboardButton[empleados.Count()][];
                            int count3 = 0;
                            foreach (var list in empleados)
                            {
                                var nuevo_empleado = new Empleado { id = list.id_empleado };

                                Empleado nombre_empleado = empleado.RetrieveById(nuevo_empleado);

                                var usuario_empleado = new Usuario { Id = nombre_empleado.id_usuario };

                                Usuario usuarioMostrar = usuarios.RetrieveById(usuario_empleado);

                                //VALIDACION QUE SOLO SEAN SERVICIOS
                                var row = new[]
                                {
                     InlineKeyboardButton.WithCallbackData(text: usuarioMostrar.Nombre,callbackData: "datosCita:"+ list.id_empleado + ":"+id_item +":" +id_usuario+":" +idSucursal)//mas el id del cliente ,mas el item 

                 };
                                BotEmpleado[count3] = row;
                                count3++;

                                datosCitas[0] = list.id_empleado.ToString();
                                
                                datosCitas[2] = id_usuario.ToString();
                                

                            }

                            await Bot.SendTextMessageAsync(
                               chatId: callbackQuery.Message.Chat.Id,
                               text: "Empleados disponibles:",
                               replyMarkup: new InlineKeyboardMarkup(BotEmpleado));
                        
                    }

                    break;

                case "datosCita":

                    await Bot.SendTextMessageAsync(
                            chatId: callbackQuery.Message.Chat.Id,
                            text: "Ingrese la fecha, la hora de inicio, la hora de fin de la cita. Ejemplo: 2020-08-24,17:00:00,18:00:00",
                            replyMarkup: new ForceReplyMarkup());

                    break; 


            }
        }

        private static Usuario LogIn(string correo, string contrasenna)
        {
            Usuario user = usuarios.Login(correo, contrasenna);
            
            if (user != null)
            {
                return user; 
            }
            return null;
        }

        private static int RegistroCitas(DateTime fecha, string hora_inicio, string hora_fin)
        {
            datosCitas[4] = fecha.ToString();
            datosCitas[5] = hora_inicio;
            datosCitas[6] = hora_fin;

            var cita = new Cita
            {
                id_item = Int32.Parse(datosCitas[1]),
                id_cliente = Int32.Parse(datosCitas[2]),
                id_empleado = Int32.Parse(datosCitas[0]),
                fecha = DateTime.Parse(datosCitas[4]),
                hora_inicio = DateTime.Parse(datosCitas[5]),
                hora_fin = DateTime.Parse(datosCitas[6]),
                id_sucursal = Int32.Parse(datosCitas[3])
            };

            if(citas.CreateCitaServicio(cita) ==0)
            {
                return 0; 
            }
            else
            {
                return 1; 
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

