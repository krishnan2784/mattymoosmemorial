using System.Collections.Generic;
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

        public List<TDestination> ConvertToDbEntity(List<TSource> model)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<TSource, TDestination>().ReverseMap();
            });
            var mapper = config.CreateMapper();

            return mapper.Map<List<TSource>, List<TDestination>>(model);
        }
    }
}
