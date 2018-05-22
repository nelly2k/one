using System.ComponentModel.DataAnnotations;

namespace one.api.optionValue
{
    public class NewOptionValueRequest{
        [Required]
        public OptionValueType OptionValueType { get; set; }
        [Required]
        public string Value { get; set; }

        public int? Order {get;set;}
    }
}