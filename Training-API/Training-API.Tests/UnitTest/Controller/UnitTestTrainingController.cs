using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Training_API.Controllers;
using Training_API.DB;
using Training_API.Models;
using Training_API.Tests.UnitTest.Common;
using Training_API.Utils;

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

        [TestMethod]
        public void Validate_TrainingName_Required_Test()
        {
            CreateInstance();
            Training t = new Training
            {
                StartDate = Convert.ToDateTime("2019/01/10"),
                EndDate = Convert.ToDateTime("2019/01/20")
            };

            var validationResults = new List<ValidationResult>();
            var actual = Validator.TryValidateObject(t, new ValidationContext(t), validationResults, true);

            //Assert
            Assert.IsFalse(actual, "Expected validation to fail.");
            Assert.AreEqual<int>(1, validationResults.Count, "Unexpected number of validation errors.");
            var msg = validationResults[0];
            Assert.AreEqual<string>(ErrorMessageConstants.TrainingNameRequired, msg.ErrorMessage);
            Assert.AreEqual<int>(1, msg.MemberNames.Count(), "Unexpected number of validation errors.");
            Assert.AreEqual<string>("TrainingName", msg.MemberNames.ElementAt(0));
        }

        [TestMethod]
        public void Validate_StartDate_Required_Test()
        {
            CreateInstance();
            Training t = new Training
            {
                TrainingName = "Dotnet",
                EndDate = Convert.ToDateTime("2019/01/20")
            };

            var validationResults = new List<ValidationResult>();
            var actual = Validator.TryValidateObject(t, new ValidationContext(t), validationResults, true);

            //Assert
            Assert.IsFalse(actual, "Expected validation to fail.");
            Assert.AreEqual<int>(1, validationResults.Count, "Unexpected number of validation errors.");
            var msg = validationResults[0];
            Assert.AreEqual<string>(ErrorMessageConstants.StartDateRequired, msg.ErrorMessage);
            Assert.AreEqual<int>(1, msg.MemberNames.Count(), "Unexpected number of validation errors.");
            Assert.AreEqual<string>("StartDate", msg.MemberNames.ElementAt(0));
        }

        [TestMethod]
        public void Validate_EndDate_Required_Test()
        {
            CreateInstance();
            Training t = new Training
            {
                TrainingName = "Dotnet",
                StartDate = Convert.ToDateTime("2019/01/10")
            };

            var validationResults = new List<ValidationResult>();
            var actual = Validator.TryValidateObject(t, new ValidationContext(t), validationResults, true);

            //Assert
            Assert.IsFalse(actual, "Expected validation to fail.");
            Assert.AreEqual<int>(1, validationResults.Count, "Unexpected number of validation errors.");
            var msg = validationResults[0];
            Assert.AreEqual<string>(ErrorMessageConstants.EndDateRequired, msg.ErrorMessage);
            Assert.AreEqual<int>(1, msg.MemberNames.Count(), "Unexpected number of validation errors.");
            Assert.AreEqual<string>("EndDate", msg.MemberNames.ElementAt(0));
        }

        [TestMethod]
        public void Validate_DateCompare_Invalid_Test()
        {
            CreateInstance();
            Training t = new Training
            {
                TrainingName = "Dotnet",
                StartDate = Convert.ToDateTime("2019/01/10"),
                EndDate = Convert.ToDateTime("2018/01/09")
            };

            var validationResults = new List<ValidationResult>();
            var actual = Validator.TryValidateObject(t, new ValidationContext(t), validationResults, true);

            //Assert
            Assert.IsFalse(actual, "Expected validation to fail.");
            Assert.AreEqual<int>(1, validationResults.Count, "Unexpected number of validation errors.");
            var msg = validationResults[0];
            Assert.AreEqual<string>(ErrorMessageConstants.DateCompareInvalid, msg.ErrorMessage);
        }
    }
}
