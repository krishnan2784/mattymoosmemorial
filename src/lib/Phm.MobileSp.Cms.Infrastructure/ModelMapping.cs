using System;
using System.Collections.Generic;
using System.Reflection;
using AutoMapper;
using MLearningCoreService;
using Phm.MobileSp.Cms.Core.Models;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper.Configuration;
using System.Linq;

namespace Phm.MobileSp.Cms.Infrastructure
{
    //public class MobileSpDefaultMapper : Profile
    //{
    //    public MobileSpDefaultMapper()
    //    {
    //        CreateMap<MediaInfoDto, MediaInfo>().ReverseMap();
    //        CreateMap<CorporateAppDto, CorporateApp>().ReverseMap();
    //        CreateMap<ImageFeedDto, ImageFeed>().ReverseMap();
    //        CreateMap<TextFeedDto, TextFeed>().ReverseMap();
    //        CreateMap<VideoFeedDto, VideoFeed>().ReverseMap();
    //        CreateMap<QuizFeedDto, QuizFeed>().ReverseMap();
    //        CreateMap<QuizQuestionDto, QuizQuestion>().ReverseMap();
    //        CreateMap<QuizQuestionAnswerDto, QuizQuestionAnswer>().ReverseMap();
    //        CreateMap<SurveyFeedDto, SurveyFeed>().ReverseMap();
    //        CreateMap<SurveyQuestionDto, SurveyQuestion>().ReverseMap();
    //        CreateMap<SurveyQuestionAnswerDto, SurveyQuestionAnswer>().ReverseMap();
    //        CreateMap<ObservationFeedDto, ObservationFeed>().ReverseMap();
    //        CreateMap<UserObservationDto, UserObservation>().ReverseMap();
    //        CreateMap<UserDto, User>().ReverseMap();
    //        CreateMap<BaseFeedDto, BaseFeed>().ReverseMap();
    //        CreateMap<MobileSPCoreService.MarketDto, Market>().ReverseMap();
    //        CreateMap<MobileSPCoreService.UserConfigurationDto, UserConfiguration>().ReverseMap();
    //    }
        
    //}

    //public static class AutoMapperConfiguration
    //{
    //    public static void SetConfiguration(ref IServiceCollection services)
    //    {
    //        var config = new MapperConfiguration(cfg => {
    //            cfg.AddProfiles("Phm.MobileSp.Cms.Infrastructure");
    //        });
    //        services.AddSingleton(config.CreateMapper());
    //    }        
    //}


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
                    expression.ForMember(property.Name, opt => opt.UseDestinationValue());
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
        public static IEnumerable<TFeedDestination> MapFeed<TFeedSource, TFeedDestination>(this List<TFeedSource> sourceFeed)
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
                dynamic oFeedItem = sourceModel;

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
                        oFeedItem.Questions = quizFeedItem.Questions.ToList();
                        cfg.CreateMap<QuizQuestionDto, QuizQuestion>().ReverseMap();
                        cfg.CreateMap<QuizQuestionAnswerDto, QuizQuestionAnswer>().ReverseMap();

                        //foreach (var question in quizFeedItem.Questions)
                        //{
                        //    cfg.CreateMap<QuizQuestionDto, QuizQuestion>()
                        //        .IgnorePopulatedDestinationFields(question)
                        //        .ReverseMap();

                        //    question.Answers.ForEach(x => cfg.CreateMap<QuizQuestionAnswerDto, QuizQuestionAnswer>()
                        //        .IgnorePopulatedDestinationFields(x)
                        //        .ReverseMap());
                        //}
                    }
                    else if (surveyFeedItem != null)
                    {
                        oFeedItem.Questions = surveyFeedItem.Questions.ToList();
                        cfg.CreateMap<SurveyQuestionDto, SurveyQuestion>().ReverseMap();
                        cfg.CreateMap<SurveyQuestionAnswerDto, SurveyQuestionAnswer>().ReverseMap();
                        
                        //oFeedItem.Questions = (sourceModel as SurveyFeed).Questions.Where(x => surveyFeedItem.Questions.Where(y => x.Id == y.Id).Count() > 0).ToList();
                        //oFeedItem.Questions.AddRange(surveyFeedItem.Questions.Where(y => y.Id == 0));

                        //foreach (var question in surveyFeedItem.Questions)
                        //{
                        //    cfg.CreateMap<SurveyQuestionDto, SurveyQuestion>()
                        //        .IgnorePopulatedDestinationFields(question)
                        //        .ReverseMap();

                        //    question.Answers.ForEach(x => cfg.CreateMap<SurveyQuestionAnswerDto, SurveyQuestionAnswer>()
                        //        .IgnorePopulatedDestinationFields(x)
                        //        .ReverseMap());
                        //}
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
                var m = mapper.Map(oFeedItem, destinationModel);
                
                return mapper.Map(oFeedItem, destinationModel);
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
                cfg.CreateMap<User, UserDto>().ReverseMap();
                cfg.CreateMap<BaseFeedDto, BaseFeed>().ReverseMap();
                cfg.CreateMap<TSource, TDestination>().ReverseMap();
            });
            return config.CreateMapper();
        }
    }

    #endregion

    #endregion
}
