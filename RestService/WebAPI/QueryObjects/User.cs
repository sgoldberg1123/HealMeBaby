using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace WebAPI.QueryObjects
{
    public class User
    {
        public User(DataRow row)
        {
            Int32.TryParse(row["user_id"].ToString(), out id);
            firstName = row["first_name"].ToString();
            email = row["email"].ToString();
            lastName = row["last_name"].ToString();
            password = row["password"].ToString();

        }

        private int id;
        private string firstName;
        private string email;
        private string lastName;
        private string password;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }

        public string Email
        {
            get { return email; }
            set { email = value; }
        }

        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }

        public string Password
        {
            get { return password; }
            set { password = value; }
        }
    }
}