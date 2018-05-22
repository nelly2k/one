using System;

namespace one.api.database{
    public abstract class Entity {
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}