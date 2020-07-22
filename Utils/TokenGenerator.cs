using System;
using System.Collections.Generic;
using System.Text;

namespace Utils {
    public static class TokenGenerator {
        public static string Generar(int longitud) {
            string caracteresDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder builder = new StringBuilder("");
            System.Random random = new System.Random();

            for (int i = 0; i <= longitud; i++) {
                builder.Append(caracteresDisponibles[random.Next(0, caracteresDisponibles.Length - 1)]);
            }

            return builder.ToString();
        }
    }
}
