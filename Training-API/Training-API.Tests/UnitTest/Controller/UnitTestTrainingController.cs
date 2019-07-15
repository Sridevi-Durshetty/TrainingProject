using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Training_API.Controllers;
using Training_API.DB;
using Training_API.Models;
using Training_API.Tests.UnitTest.Common;

namespace Training_API.Tests.UnitTest.Controller
{
    [TestClass]
    public class UnitTestTrainingController
    {
        TrainingController objTrainingController;
        ITrainingDBContext testDBContext = new TestTrainingDBContext();

        private void CreateInstance()
        {
            objTrainingController = new TrainingController(testDBContext);
        }

        [TestMethod]
        public void Validate_Training_Valid_Test()
        {
            CreateInstance();
            Training t = new Training
            {
                TrainingName = "Dotnet",
                StartDate = Convert.ToDateTime("2019/01/10"),
                EndDate = Convert.ToDateTime("2019/01/20")
            };
            var result = objTrainingController.AddTraining(t) as NegotiatedContentResult<string>;

            Assert.AreEqual(result.StatusCode, HttpStatusCode.OK);
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Content, "10");
        }
    }
}
