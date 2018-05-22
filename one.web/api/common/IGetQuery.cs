using System.Threading.Tasks;

namespace one.api.common
{
    public interface IGetQuery<Iid, TResult>
    {
        Task<TResult> Execute(Iid id); 
    }
}