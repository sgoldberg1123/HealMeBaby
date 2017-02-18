using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.DBConn
{
    public class Param
    {
        public Param(string paramName, Object paramValue)
        {
            this.paramName = paramName;
            this.paramValue = paramValue;
        }
        private string paramName;
        private Object paramValue;
        public string ParamName
        {
            get { return paramName; }
            set { paramName = value; }
        }
        public Object ParamValue
        {
            get { return paramValue; }
            set { paramValue = value; }
        }
    }
}