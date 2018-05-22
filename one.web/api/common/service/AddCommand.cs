using System;
using System.Threading.Tasks;
using AutoMapper;
using one.api.database;

namespace one.api.common{

    public interface IAddCommand
    {
        Task<TId> Add<TSource, TEntity, TId>(TSource source, Func<TEntity,TId> getId)
            where TEntity:Entity;

        Task Add<TSource, TEntity>(TSource source) where TEntity:Entity;
    }
    public class AddCommand:IAddCommand
    {
        private readonly OneContext oneContext;
        private readonly IMapper mapper;
        private readonly IDateTimeService dateTimeService;

        public AddCommand(OneContext oneContext,
            IMapper mapper,IDateTimeService dateTimeService)
        {
            this.oneContext = oneContext;
            this.mapper = mapper;
            this.dateTimeService = dateTimeService;
        }

        public async Task<TId> Add<TSource, TEntity, TId>(TSource source, Func<TEntity,TId> getId)
            where TEntity:Entity{
            
            var entity = mapper.Map<TEntity>(source);

            entity.CreatedDate = dateTimeService.Now;
            entity.UpdatedDate = dateTimeService.Now;

            oneContext.Add(entity);
            await oneContext.SaveChangesAsync();

            return getId(entity);
        }

        public async Task Add<TSource, TEntity>(TSource source)
            where TEntity:Entity{
            
            var entity = mapper.Map<TEntity>(source);

            entity.CreatedDate = dateTimeService.Now;
            entity.UpdatedDate = dateTimeService.Now;

            oneContext.Add(entity);
            await oneContext.SaveChangesAsync();
        }
    }
}