using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Mail;
using System.Text;
using Utils.Email;
using Microsoft.Extensions.Configuration;

namespace Utils {
    public class EmailService {
        private string host;
        private string from;
        private int port;
        private string user;
        private string password;

        public EmailService() {
            var setting = ConfigHelper.GetConfig();
            var connectionstring = setting["ConnectionStrings"];

            if (setting != null) {
                this.host = setting["Smtp:Host"];
                this.port = Int32.Parse(setting["Smtp:Port"]);
                this.from = setting["Smtp:From"];
                this.user = setting["Smtp:User"];
                this.password = setting["Smtp:Password"];
            }
        }

        public bool Send(EmailModel emailModel) {
            try {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(this.from);
                mailMessage.BodyEncoding = Encoding.UTF8;
                mailMessage.To.Add(emailModel.To);
                mailMessage.Body = emailModel.Message;
                mailMessage.Subject = emailModel.Subject;
                mailMessage.IsBodyHtml = true;

                SmtpClient client = new SmtpClient();
                client.Host = this.host;
                client.Port = this.port;
                client.Credentials = new System.Net.NetworkCredential(this.user, this.password);
                client.EnableSsl = true;
                client.SendAsync(mailMessage, "Email Async");

                return true;
            } catch (Exception ex) {
                return false;
            }
        }

        public bool Send(EmailModel emailModel, Attachment attachment)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(this.from);
                mailMessage.BodyEncoding = Encoding.UTF8;
                mailMessage.To.Add(emailModel.To);
                mailMessage.Body = emailModel.Message;
                mailMessage.Subject = emailModel.Subject;
                mailMessage.IsBodyHtml = true;
                mailMessage.Attachments.Add(attachment);

                SmtpClient client = new SmtpClient();
                client.Host = this.host;
                client.Port = this.port;
                client.Credentials = new System.Net.NetworkCredential(this.user, this.password);
                client.EnableSsl = true;
                client.SendAsync(mailMessage, "Email Async");

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}


public static class ConfigHelper {
    public static IConfiguration GetConfig() {
        var builder = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.json", 
                         optional: true, 
                         reloadOnChange: true); 
        return builder.Build();
    }
}