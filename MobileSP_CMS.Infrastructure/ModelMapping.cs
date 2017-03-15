using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using MLearningCoreService;
using MobileSP_CMS.Core.Models;
using MobileSP_CMS.Core.Models.Interfaces;

namespace MobileSP_CMS.Infrastructure
{
    public class AutoMapperGenericsHelper<TSource, TDestination>
    {
        public TDestination ConvertToDbEntity(TSource model)
        {
            return GetStandardMapper().Map<TSource, TDestination>(model);
        }

        public List<TDestination> ConvertToDbEntity(List<TSource> model)
        {
            return GetStandardMapper().Map<List<TSource>, List<TDestination>>(model);
        }

        public static IMapper GetStandardMapper()
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<TSource, TDestination>().ReverseMap();
            });
            return config.CreateMapper();
        }

        public TDestination ConvertUnpopulatedFields(TSource sourceModel, TDestination destinationModel)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<TSource, TDestination>().IgnorePopulatedDestinationFields(destinationModel).ReverseMap();
            });
            var mapper = config.CreateMapper();
            return mapper.Map(sourceModel, destinationModel);
        }

        public TDestination ConvertNonNullFields(TSource sourceModel, TDestination destinationModel)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<TSource, TDestination>().CopyNonNullFieldsOnly(sourceModel).ReverseMap();
                cfg.AllowNullDestinationValues = false;
            });
            var mapper = config.CreateMapper();
            
            return mapper.Map(sourceModel, destinationModel);
        }

    }

    public static class MappingHelper
    {

        public static IMappingExpression<TSource, TDestination> IgnorePopulatedDestinationFields<TSource, TDestination>
            (this IMappingExpression<TSource, TDestination> expression, TDestination destinationModel)
        {
            var destinationProperties = typeof(TDestination).GetProperties();

            foreach (var property in destinationProperties)
            {
                if (property.GetValue(destinationModel) != null)
                {
                    expression.ForMember(property.Name, opt => opt.Ignore());
                }
            }
            return expression;
        }

        public static IMappingExpression<TSource, TDestination> CopyNonNullFieldsOnly<TSource, TDestination>
            (this IMappingExpression<TSource, TDestination> expression, TSource sourceModel)
        {
            var sourceProperties = typeof(TSource).GetProperties();

            foreach (var sourceProperty in sourceProperties)
            {
                if (sourceProperty.GetValue(sourceModel) == null)
                {
                    expression.ForMember(sourceProperty.Name, opt => opt.Ignore());
                }
            }
            return expression;
        }
    }

    #region ConcreteModelMapping

    #region Feed

    public static class FeedMapper
    {
        public static IEnumerable<TFeedDestination> MapFeed<TFeedSource,TFeedDestination>(this List<TFeedSource> sourceFeed) 
        {
            var mapper = FeedMap<TFeedSource, TFeedDestination>();
            return mapper.Map<IList<TFeedDestination>>(sourceFeed);
        }

        public static TFeedItemDestination MapFeedItem<TFeedItemSource,TFeedItemDestination>(this TFeedItemSource feedItemSource) 
        {
            var mapper = FeedMap<TFeedItemSource, TFeedItemDestination>();
            return mapper.Map<TFeedItemDestination>(feedItemSource);
        }

        public static IMapper FeedMap<TSource, TDestination>()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<MediaInfoDto, MediaInfo>().ReverseMap();
                cfg.CreateMap<ImageFeedDto, ImageFeed>().ReverseMap();
                cfg.CreateMap<TextFeedDto, TextFeed>().ReverseMap();
                cfg.CreateMap<VideoFeedDto, VideoFeed>().ReverseMap();
                cfg.CreateMap<QuizFeedDto, QuizFeed>().ReverseMap();
                cfg.CreateMap<SurveyFeedDto, SurveyFeed>().ReverseMap();
                cfg.CreateMap<CampaignFeedDto, CampaignFeed>().ReverseMap();
                cfg.CreateMap<BaseFeedDto, BaseFeed>().ReverseMap();
                cfg.CreateMap<TSource, TDestination>().ReverseMap();
            });
            return config.CreateMapper();
        }
    }

    #endregion

    #endregion
}
