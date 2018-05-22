using System.Threading.Tasks;

namespace one.api.common
{
    public interface IDeleteCommand<TId, TModel>{
        Task Execute(TId id);
    }

    public interface IDeleteCommand<TId0, TId1, TModel>{
        Task Execute(TId0 id0, TId1 id1);
    }

    public interface IDeleteCommand<TId0, TId1, TId2, TModel>{
        Task Execute(TId0 id0, TId1 id1, TId2 id2);
    }

    public interface IDeleteCommand<TId0, TId1, TId2, TId3, TModel>{
        Task Execute(TId0 id0, TId1 id1, TId2 id2, TId3 id3);
    }
}