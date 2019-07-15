using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Training_API.Models;

namespace Training_API.DB
{
    public interface ITrainingDBContext : IDisposable
    {
        DbSet<Training> TrainingEntity { get; }
        int SaveChanges();
        void MarkAsModified(Training training);

    }
}