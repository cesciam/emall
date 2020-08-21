using System;
using System.Collections.Generic;
using System.Text;

namespace Utils {
    public static class TokenGenerator {
        public static string Generar(int longitud) {
            string caracteresDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=-";
            StringBuilder builder = new StringBuilder("");
            System.Random random = new System.Random();

            for (int i = 1; i <= longitud; i++) {
                builder.Append(caracteresDisponibles[random.Next(0, caracteresDisponibles.Length - 1)]);
            }

            return builder.ToString();
        }
        public static string GenerarAlfanumerico(int longitud)
        {
            string caracteresDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
            StringBuilder builder = new StringBuilder("");
            System.Random random = new System.Random();

            for (int i = 1; i <= longitud; i++)
            {
                builder.Append(caracteresDisponibles[random.Next(0, caracteresDisponibles.Length - 1)]);
            }

            return builder.ToString();
        }
    }
}
