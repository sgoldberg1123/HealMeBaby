using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
namespace WebAPI.DBConn
{
    static class Conn
    {
        public static MySqlConnection connection = null;
        public static MySqlConnection getHealthDBConn()
        {
            if (connection == null)
            {
                connection = new MySqlConnection("server=localhost;database=healthdb;uid=root;password=PASSWORD");
                try
                {
                    connection.Open();
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex);
                    connection.Close();
                    connection = null;
                }
            }
            return connection;
        }
    }
}