using System;
using System.Collections.Generic;
using System.Reflection;
using AutoMapper;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Infrastructure
{
    public class AutoMapperGenericsHelper<TSource, TDestination>
    {
        public AutoMapperGenericsHelper()
        {
        }

        public AutoMapperGenericsHelper(TSource t, TDestination td)
        {
        }

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
            if (destinationModel==null)
                return expression;

            var destinationProperties = typeof(TDestination).GetProperties();
            
            foreach (var property in destinationProperties)
            {
                if (property.GetValue(destinationModel) != null || (property.PropertyType.GetTypeInfo().IsClass && (property.PropertyType != typeof(string) && property.PropertyType != typeof(Guid))))
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

        public static TFeedItemDestination MapFeedItem<TFeedItemSource, TFeedItemDestination>(this TFeedItemSource feedItemSource)
        {
            var mapper = FeedMap<TFeedItemSource, TFeedItemDestination>();
            return mapper.Map<TFeedItemDestination>(feedItemSource);
        }

        public static TFeedItemDestination ConvertUnpopulatedFieldsToModel<TFeedItemSource, TFeedItemDestination>(TFeedItemSource sourceModel, TFeedItemDestination destinationModel) where TFeedItemDestination : BaseFeed
        {
            try
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<MediaInfoDto, MediaInfo>()
                            .IgnorePopulatedDestinationFields(destinationModel.MainIcon)
                            .ReverseMap();
                    cfg.CreateMap<CorporateAppDto, CorporateApp>()
                            .IgnorePopulatedDestinationFields(destinationModel.CorporateApp)
                            .ReverseMap();


                    var quizFeedItem = destinationModel as QuizFeed;
                    var surveyFeedItem = destinationModel as SurveyFeed;
                    if (quizFeedItem != null)
                    {
                        foreach (var question in quizFeedItem.Questions){
                            cfg.CreateMap<QuizQuestionDto, QuizQuestion>()
                                .IgnorePopulatedDestinationFields(question)
                                .ReverseMap();

                            question.Answers.ForEach(x => cfg.CreateMap<QuizQuestionAnswerDto, QuizQuestionAnswer>()
                                .IgnorePopulatedDestinationFields(x)
                                .ReverseMap());
                        }
                    } else if (surveyFeedItem != null){
                        foreach (var question in surveyFeedItem.Questions)
                        {
                            cfg.CreateMap<SurveyQuestionDto, SurveyQuestion>()
                                .IgnorePopulatedDestinationFields(question)
                                .ReverseMap();

                            question.Answers.ForEach(x => cfg.CreateMap<SurveyQuestionAnswerDto, SurveyQuestionAnswer>()
                                .IgnorePopulatedDestinationFields(x)
                                .ReverseMap());
                        }
                        if (surveyFeedItem is ObservationFeed)
                        {
                            var users = ((ObservationFeed)surveyFeedItem).UserObservations;
                            foreach (var user in users)
                            {
                                cfg.CreateMap<UserObservationDto, UserObservation>()
                                    .IgnorePopulatedDestinationFields(user)
                                    .ReverseMap();
                            }
                        }
                    }              
                    cfg.CreateMap<TFeedItemSource, TFeedItemDestination>()
                            .IgnorePopulatedDestinationFields(destinationModel)
                            .ReverseMap();
                });

                var mapper = config.CreateMapper();
                return mapper.Map(sourceModel, destinationModel);
            }
            catch (Exception e)
            {
                return destinationModel;
            }
        }

        public static TFeedItemDestination ConvertUnpopulatedFieldsToDto<TFeedItemSource, TFeedItemDestination>(TFeedItemSource sourceModel, TFeedItemDestination destinationModel) where TFeedItemDestination : BaseFeedDto
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TFeedItemSource, TFeedItemDestination>().IgnorePopulatedDestinationFields(destinationModel).ReverseMap();
                cfg.CreateMap<MediaInfo, MediaInfoDto>().IgnorePopulatedDestinationFields(destinationModel.MainIcon).ReverseMap();
            });
            var mapper = config.CreateMapper();
            return mapper.Map(sourceModel, destinationModel);
        }

        public static IMapper FeedMap<TSource, TDestination>()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<MediaInfoDto, MediaInfo>().ReverseMap();
                cfg.CreateMap<CorporateAppDto, CorporateApp>().ReverseMap();
                cfg.CreateMap<ImageFeedDto, ImageFeed>().ReverseMap();
                cfg.CreateMap<TextFeedDto, TextFeed>().ReverseMap();
                cfg.CreateMap<VideoFeedDto, VideoFeed>().ReverseMap();
                cfg.CreateMap<QuizFeedDto, QuizFeed>().ReverseMap();
                cfg.CreateMap<QuizQuestionDto, QuizQuestion>().ReverseMap();
                cfg.CreateMap<QuizQuestionAnswerDto, QuizQuestionAnswer>().ReverseMap();
                cfg.CreateMap<SurveyFeedDto, SurveyFeed>().ReverseMap();
                cfg.CreateMap<SurveyQuestionDto, SurveyQuestion>().ReverseMap();
                cfg.CreateMap<SurveyQuestionAnswerDto, SurveyQuestionAnswer>().ReverseMap();
                cfg.CreateMap<ObservationFeed, ObservationFeedDto>().ReverseMap();
                cfg.CreateMap<UserObservation, UserObservationDto>().ReverseMap();
                cfg.CreateMap<BaseFeedDto, BaseFeed>().ReverseMap();
                cfg.CreateMap<TSource, TDestination>().ReverseMap();
            });
            return config.CreateMapper();
        }
    }

    #endregion

    #endregion
}
