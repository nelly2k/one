using System.Collections.Generic;
using System.Threading.Tasks;

namespace one.api.common
{
    public interface IGetListQuery<TId, TResult>:IService{
        Task<IEnumerable<TResult>> Execute (TId id);
    }
}