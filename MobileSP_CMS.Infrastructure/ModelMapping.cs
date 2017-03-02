using System;
using System.Collections.Generic;
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

    #region ConcreteModelMapping

    #region Feed

    public static class FeedMapper
    {

        public static IEnumerable<TFeedDestination> MapFeed<TFeedSource,TFeedDestination>(this List<TFeedSource> sourceFeed) 
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
            });
            var mapper = config.CreateMapper();
            return mapper.Map<IList<TFeedDestination>>(sourceFeed);
        }

        public static TFeedItemDestination MapFeedItem<TFeedItemSource,TFeedItemDestination>(this TFeedItemSource feedItemSource) 
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
            });
            var mapper = config.CreateMapper();
            return mapper.Map<TFeedItemDestination>(feedItemSource);
        }

    }

    #endregion

    #endregion
}
