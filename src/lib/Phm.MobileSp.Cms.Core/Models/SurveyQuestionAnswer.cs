namespace Phm.MobileSp.Cms.Core.Models
{
    public class SurveyQuestionAnswer : BaseModel
    {
        public virtual string Answer { get; set;}
        public virtual bool IsFreeText { get; set; }
        public virtual int Order { get; set; }
        public virtual int SurveyQuestionId { get; set; }
    }
}
