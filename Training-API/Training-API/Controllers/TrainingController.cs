using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Training_API.DB;
using Training_API.Filters;
using Training_API.Models;
using Training_API.Repositories;
using Training_API.Utils;

namespace Training_API.Controllers
{
    [ValidateModel]
    [RoutePrefix("api/training")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TrainingController : ApiController
    {
        TrainingRepository objTrainingRepo = new TrainingRepository();

        /// <summary>
        /// Default Connect to SQL DB
        /// </summary>
        public TrainingController() { }

        /// <summary>
        /// Connect to Mock DB - for testing
        /// </summary>
        /// <param name="trainingContext"></param>
        public TrainingController(ITrainingDBContext trainingContext)
        {
            objTrainingRepo = new TrainingRepository(trainingContext);
        }

        /// <summary>
        /// Adding new Training 
        /// if added successfully then methods returns no of days 
        /// else returns "not added successfully"
        /// </summary>
        /// <param name="tr"></param>
        /// <returns>IHttpActionResult</returns>
        [HttpPost]
        public IHttpActionResult AddTraining(Training tr)
        {
            try
            {
                string noOfDays = objTrainingRepo.InsertTraining(tr);
                if (noOfDays != "error")
                    return Content(HttpStatusCode.OK, noOfDays);
                else
                    return Content(HttpStatusCode.BadRequest, ErrorMessageConstants.TrainingNotInserted);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
