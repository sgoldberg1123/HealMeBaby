using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using System.Data;

namespace WebAPI.DBConn
{
    static class HealthDBConn
    {
        private static string constr = "server=71.95.85.102;database=health;uid=test;password=health123";

        //Simple unparamaterized query
        public static DataTable simpleQuery(string queryString)
        {
            DataTable table = new DataTable();
            using (MySqlConnection conn = new MySqlConnection(constr))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = queryString;
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        table.Load(reader);
                        reader.Close();
                    }
                }
                conn.Close();
            }
            return table;
        }

        //Paramaterized query
        public static DataTable paramQuery(string queryString, List<Param> paramList)
        {
            DataTable table = new DataTable();
            using (MySqlConnection conn = new MySqlConnection(constr))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = queryString;
                    foreach(Param param in paramList)
                    {
                        cmd.Parameters.AddWithValue(param.ParamName, param.ParamValue);
                    }

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        table.Load(reader);
                        reader.Close();
                    }
                }
                conn.Close();
            }
            return table;
        }
    }
}