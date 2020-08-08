using System;
using System.Collections.Generic;
using System.Text;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Utils {
    public static class Sms {
        public static void Enviar(string telefono, string mensaje) {
            try {
                const string accountSid = "ACf2b4c71f1b8c65e7fa0dba3c2553362f";
                const string authToken = "34780551be46eab378d02d79017254a0";

                TwilioClient.Init(accountSid, authToken);

                var message = MessageResource.Create(
                    body: mensaje,
                    from: new Twilio.Types.PhoneNumber("12058097956"),
                    to: new Twilio.Types.PhoneNumber("+506" + telefono)
                );
            } catch (Exception ex) { 
            }
        }
    }
}
