﻿using System;
using System.Security.Cryptography;
using System.Text;

namespace Utils {
    public static class Md5 {
        public static string generateMD5Hash(string input) {
            if (String.IsNullOrEmpty(input))
                input = " ";

            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++) {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }
    }
}
