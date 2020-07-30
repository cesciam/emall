using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace Utils {
    public static class FormatValidation {
        public static bool IsValidEmail(string email) {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try {
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper, RegexOptions.None, TimeSpan.FromMilliseconds(200));

                string DomainMapper(Match match) {
                    var idn = new IdnMapping();
                    var domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            } catch (RegexMatchTimeoutException e) {
                return false;
            } catch (ArgumentException e) {
                return false;
            }

            try {
                return Regex.IsMatch(email,
                    @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                    @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            } catch (RegexMatchTimeoutException) {
                return false;
            }
        }

        public static bool IsValidPassword(string password) {
            if (string.IsNullOrWhiteSpace(password))
                return false;

            // Minimo 8 caracteres, al menos una Mayuscula, al menos una minuscula, al menos un numero y almenos 1 caracter especial
            return Regex.IsMatch(password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
        }

        public static bool IsValidPhone(string phone) {
            if (string.IsNullOrWhiteSpace(phone))
                return false;

            return Regex.IsMatch(phone, @"^[0-9]{8}$");
        }
    }
}
