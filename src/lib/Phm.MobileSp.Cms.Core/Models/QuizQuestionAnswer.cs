namespace Phm.MobileSp.Cms.Core.Models
{
    public class QuizQuestionAnswer : BaseModel
    {
        public virtual string Answer { get; set; }
        public virtual bool IsCorrect { get; set; }
        public virtual int Order { get; set; }
        public virtual int QuizQuestionId { get; set; }
    }
}
