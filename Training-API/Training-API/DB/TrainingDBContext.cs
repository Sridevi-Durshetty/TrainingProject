using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Training_API.Models;

namespace Training_API.DB
{
    public class TrainingDBContext : DbContext, ITrainingDBContext
    {
        public DbSet<Training> TrainingEntity { get; set; }
        public void MarkAsModified(Training training)
        {
            Entry(training).State = EntityState.Modified;
        }
    }
}