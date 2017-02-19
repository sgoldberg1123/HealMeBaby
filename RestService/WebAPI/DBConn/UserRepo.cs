using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using WebAPI.QueryObjects;
using System.Data;
using WebAPI.JsonObj;

namespace WebAPI.DBConn
{
    static class UserRepo
    {
        public static List<User> getAllUsers()
        {
            DataTable table = HealthDBConn.simpleQuery("SELECT * FROM user;");
            List<User> users = new List<User>();
            if (table.Rows.Count >= 0)
            {
                foreach (DataRow row in table.Rows)
                {
                    users.Add(new User(row));
                }
            }
            return users;
        }
        public static User getUserById(int id)
        {
            List<Param> paramList = new List<Param>() { new Param("@id", id) };
            DataTable table = HealthDBConn.paramQuery("SELECT * FROM user WHERE user.user_id = @id;", paramList);
            if(table.Rows.Count > 0)
            {
                return new User(table.Rows[0]);
            }
            else
            {
                return null;
            }
        }

        public static void insertUser(NewUser user)
        {
            List<Param> paramList = new List<Param>() { new Param("@email", user.email),
                                                        new Param("@firstName", user.firstName),
                                                        new Param("@lastName", user.lastName),
                                                        new Param("@password", user.password)};
            HealthDBConn.paramInsert("INSERT INTO user (first_name, last_name, email, password) VALUES (@firstName, @lastName, @email, @password);", paramList);
        }
    }
}