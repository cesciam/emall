﻿using System;
using System.Collections.Generic;

namespace DataAccessLayer.Mapper
{
    public abstract class EntityMapper
    {
        protected string GetStringValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is string)
                return (string)val;

            return "";
        }

        protected int GetIntValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && (val is int || val is decimal))
                return (int)dic[attName];

            return -1;
        }

        protected double GetDoubleValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is double)
                return (double)dic[attName];

            return -1;
        }

        protected double GetDecimalValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            double val_decimal = Convert.ToDouble(val); 
            if (dic.ContainsKey(attName))
                return (double)val_decimal;

            return -1;
        }

        protected DateTime GetDateValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is DateTime)
                return (DateTime)dic[attName];

            return DateTime.Now;
        }

        protected TimeSpan GetTimeValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && val is TimeSpan)
                return (TimeSpan)dic[attName];

            return TimeSpan.Zero;
        }

        //protected decimal GetDecimalValue(Dictionary<string, object> dic, string attName)
        //{
        //    var val = dic[attName];
        //    if (dic.ContainsKey(attName) && val is decimal)
        //        return (decimal)dic[attName];

        //    return -1;
        //}

    }
}