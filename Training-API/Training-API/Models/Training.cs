using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Training_API.Utils;

namespace Training_API.Models
{
    [Table("tblTraining")]
    public class Training : IValidatableObject
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = ErrorMessageConstants.TrainingNameRequired)]
        public string TrainingName { get; set; }

        [Required(ErrorMessage = ErrorMessageConstants.StartDateRequired)]
        public DateTime? StartDate { get; set; }

        [Required(ErrorMessage = ErrorMessageConstants.EndDateRequired)]
        public DateTime? EndDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (EndDate < StartDate)
            {
                yield return new ValidationResult(ErrorMessageConstants.DateCompareInvalid);
            }
        }
    }
}