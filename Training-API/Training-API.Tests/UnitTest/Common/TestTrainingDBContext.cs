using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Training_API.DB;
using Training_API.Models;
using Training_API.Tests.UnitTest.DbSets;

namespace Training_API.Tests.UnitTest.Common
{
    class TestTrainingDBContext : ITrainingDBContext
    {
        public TestTrainingDBContext()
        {
            this.TrainingEntity = new TestTrainingDbSet();
        }

        public DbSet<Training> TrainingEntity { get; set; }

        public int SaveChanges()
        {
            return 0;
        }

        public void MarkAsModified(Training training) { }
        public void Dispose() { }
    }
}