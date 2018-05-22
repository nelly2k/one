using System;

namespace one.api.common{
    public interface IDateTimeService
    {
        DateTime Now {get;}
    }

    public class DateTimeService:IDateTimeService{
        public DateTime Now { get{
            return DateTime.UtcNow;
        } }
    }
}