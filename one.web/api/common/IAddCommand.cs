using System.Threading.Tasks;

namespace one.api.common
{
    public interface IAddCommand<TModel, TId>
    {
        Task<TId> Execute(TModel model);
    }

    public interface IAddCommand<TModel>
    {
        Task Execute(TModel model);
    }
}