using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace TaskService.Controllers
{
    [Authorize]
    public class TasksController : ApiController
    {
        // In this service we're using an in-memory list to store tasks, just to keep things simple.
        // This means that all of your tasks will be lost each time you run the service
        private static List<Models.Task> db = new List<Models.Task>();

        public IEnumerable<Models.Task> Get()
        {
            string owner = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
            IEnumerable<Models.Task> userTasks = db.Where(t => t.Owner == owner);
            return userTasks;
        }

        public void Post(Models.Task task)
        {
            if (task.Text == null || task.Text == string.Empty)
                throw new WebException("Please provide a task description");

            string owner = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
            task.Owner = owner;
            task.Completed = false;
            task.DateModified = DateTime.UtcNow;
            db.Add(task);
        }

        public void Delete(int id)
        {
            string owner = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
            Models.Task task = db.Where(t => t.Owner.Equals(owner) && t.Id.Equals(id)).FirstOrDefault();
            db.Remove(task);
        }
    }
}
