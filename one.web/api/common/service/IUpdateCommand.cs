using System;
using System.Threading.Tasks;
using one.api.database;

namespace one.api.common
{
    public interface IUpdateCommand{
        Task UpdateEntity<T>(Func<OneContext, Task<T>> getAction, string field, object value)where T :  Entity;
    }
}