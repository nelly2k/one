using System;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using one.api.database;

namespace one.api.common
{
    public class UpdateCommand : IUpdateCommand
    {
        private readonly OneContext oneContext;
        private readonly IDateTimeService dateTimeService;

        public UpdateCommand(OneContext oneContext, IDateTimeService dateTimeService)
        {
            this.oneContext = oneContext;
            this.dateTimeService = dateTimeService;
        }

        public async Task UpdateEntity<T>(Func<OneContext, Task<T>> getAction, string field, object value)
         where T : Entity
        {
            var entity = await getAction(oneContext);
            var propertyInfo = GetProperty<T>(field);

            SetValue(propertyInfo, entity, value);

            await oneContext.SaveChangesAsync();
        }

        private PropertyInfo GetProperty<T>(string field)
        {
            if (char.IsLower(field[0]))
            {
                field = field[0].ToString().ToUpper() + field.Substring(1);
            }
            return typeof(T).GetProperty(field);
        }

        private void SetValue<T>(PropertyInfo propertyInfo, T entity, object value)
        where T : Entity
        {
            propertyInfo.SetValue(entity, value);
            oneContext.Entry<T>(entity).State = EntityState.Modified;
            entity.UpdatedDate = dateTimeService.Now;
        }

    }
}