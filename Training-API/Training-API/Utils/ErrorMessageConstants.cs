using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Training_API.Utils
{
    public class ErrorMessageConstants
    {
        public const string TrainingNameRequired = "Training Name is required.";
        public const string StartDateRequired = "Start Date is required.";
        public const string EndDateRequired = "End Date is required.";
        public const string DateCompareInvalid = "End Date cannot be less than Start Date.";
        public const string TrainingNotInserted = "Error while adding into DB";
    }
}