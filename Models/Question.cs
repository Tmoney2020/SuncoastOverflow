using System.ComponentModel.DataAnnotations;

namespace SuncoastOverflow.Models
{
    public class Question
    {
        public int ID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Tag { get; set; }

    }
}