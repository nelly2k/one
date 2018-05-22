namespace one.api.optionValue{
    public class OptionValueBrief{
        public int FeatureId {get;set;}
        public int OptionId { get; set; }
        public int Id { get; set; }
        public string Value { get; set; }

        public OptionValueType OptionValueType { get; set; }
    }
}