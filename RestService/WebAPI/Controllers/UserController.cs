using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.DBConn;
namespace WebAPI.Controllers
{
    public class UserController : ApiController
    {
        public List<String> GetAll()
        {
            //UserRepo.getAllUsers();
            return new List<String>() { "TEST", "Test2" };
        }
    }
}
