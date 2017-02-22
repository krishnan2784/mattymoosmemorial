using AutoMapper;

namespace MobileSP_CMS.Infrastructure
{
    public class AutoMapperGenericsHelper<TSource, TDestination>
    {
        public TDestination ConvertToDbEntity(TSource model)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<TSource, TDestination>().ReverseMap();
            });
            var mapper = config.CreateMapper();

            return mapper.Map<TSource, TDestination>(model);
        }
    }
}
