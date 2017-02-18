using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.DBConn;
using WebAPI.QueryObjects;
namespace WebAPI.Controllers
{
    public class UserController : ApiController
    {
        public List<User> GetAll()
        {
            return UserRepo.getAllUsers();
        }
        public User GetById(int id)
        {
            return UserRepo.getUserById(id);
        }
        [HttpPost]
        public String postTest()
        {
            var content = Request.Content;
            string jsonContent = content.ReadAsStringAsync().Result;
            return jsonContent;
        }
    }
}
