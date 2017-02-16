using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
namespace WebAPI.DBConn
{
    static class UserRepo
    {
        public static void getAllUsers()
        {
            System.Diagnostics.Debug.WriteLine("Test");
            MySqlConnection conn = Conn.getHealthDBConn();
            MySqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT * from USER;";
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                System.Diagnostics.Debug.WriteLine(reader["first_name"].ToString());
            }
            reader.Close();
        }
    }
}