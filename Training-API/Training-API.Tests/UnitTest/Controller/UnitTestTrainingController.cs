using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Training_API.Controllers;
using Training_API.DB;
using Training_API.Tests.UnitTest.Common;

namespace Training_API.Tests.UnitTest.Controller
{
    [TestClass]
    class UnitTestTrainingController
    {
        TrainingController objTrainingController;
        ITrainingDBContext testDBContext = new TestTrainingDBContext();

        private void CreateInstance()
        {
            objTrainingController = new TrainingController(testDBContext);
        }
    }
}
