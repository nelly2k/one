using System.Threading.Tasks;
using one.api.database;

namespace one.api.common
{
    public interface IUpdateCommand<TId, TEntity> where TEntity : Entity
    {
        Task Execute(TId id, string name, object value);
    }

    public interface IUpdateCommand<TId0, TId1, TEntity> where TEntity : Entity
    {
        Task Execute(TId0 id0, TId1 id1, string name, object value);
    }

    public interface IUpdateCommand<TId0, TId1, TId2, TEntity> where TEntity : Entity
    {
        Task Execute(TId0 id0, TId1 id1, TId2 id2, string name, object value);
    }

    public interface IUpdateCommand<TId0, TId1, TId2, TId3, TEntity> where TEntity : Entity
    {
        Task Execute(TId0 id0, TId1 id1, TId2 id2, TId3 id3, string name, object value);
    }
}
