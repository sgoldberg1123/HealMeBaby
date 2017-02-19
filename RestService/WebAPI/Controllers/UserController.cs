using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.DBConn;
using WebAPI.JsonObj;
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
        public void Add()
        {
            HttpContent requestContent = Request.Content;
            string jsonContent = requestContent.ReadAsStringAsync().Result;
            NewUser user = JsonConvert.DeserializeObject<NewUser>(jsonContent);
            UserRepo.insertUser(user);
        }
    }
}
