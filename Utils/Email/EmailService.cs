using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Bcpg.OpenPgp;
using Utils.Email;

namespace Utils {
    public class EmailService {
        private string host;
        private string from;
        private int port;
        private string user;
        private string password;

        public EmailService(IConfiguration iConfiguration) {
            var smtpSection = iConfiguration.GetSection("Smtp");

            if (smtpSection != null) {
                this.host = smtpSection.GetSection("Host").Value;
                this.port = Int32.Parse(smtpSection.GetSection("Port").Value);
                this.from = smtpSection.GetSection("From").Value;
                this.user = smtpSection.GetSection("User").Value;
                this.password = smtpSection.GetSection("Password").Value;
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
    }
}
