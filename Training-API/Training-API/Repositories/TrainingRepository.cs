using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Training_API.DB;
using Training_API.Models;

namespace Training_API.Repositories
{
    public class TrainingRepository
    {
        private ITrainingDBContext objTrainingContext = new TrainingDBContext();

        /// <summary>
        /// Default connected to SQL DB
        /// </summary>
        public TrainingRepository() { }

        /// <summary>
        /// Connect to Mock DB - for Testing 
        /// </summary>
        /// <param name="trainingContext"></param>
        public TrainingRepository(ITrainingDBContext trainingContext)
        {
            objTrainingContext = trainingContext;
        }

        /// <summary>
        /// Insert new Training details to DB
        /// If inserted successfully - return no of days else returning "error" string
        /// </summary>
        /// <param name="tr"></param>
        /// <returns>string</returns>
        public string InsertTraining(Training tr)
        {
            if (tr.EndDate.HasValue && tr.StartDate.HasValue)
            {
                objTrainingContext.TrainingEntity.Add(tr);
                int inserted = objTrainingContext.SaveChanges();
                TimeSpan? duration = null;
                duration = tr.EndDate.Value - tr.StartDate.Value;
                var days = duration.GetValueOrDefault().TotalDays;
                //string datediff = (tr.EndDate - tr.StartDate).TotalDays.ToString();
                return Convert.ToString(days);
            }
            return "error";
        }


    }
}