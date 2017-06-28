using System;
using System.Collections.Generic;
using System.Text;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class FeedItemSummary : BaseModel
    {
        public int QuizFeedId { get; set; }
        public decimal AverageScore { get; set; }
        public TimeSpan AverageTime { get; set; }
        public int Submitted { get; set; }
        public int Passed { get; set; }
        public int Failed { get; set; }
    }

    public class FeedItemSummaryEx : BaseModel
    {
        public DateTime? FinishedAt { get; set; }
        public string MainUserGroup { get; set; }
        public decimal MinSucceedThreshold { get; set; }
        public int PointsGained { get; set; }
        public int QuizFeedId { get; set; }
        public List<QuizFeedResult> QuizFeedResults { get; set; }
        public decimal ResultPercentage { get; set; }
        public DateTime? StartedAt { get; set; }
        public int TotalQuestions { get; set; }
        public int TotalRightAnswers { get; set; }
        public int TotalWrongAnswers { get; set; }
        public User User { get; set; }

    }

    public class QuizFeedResult : BaseModel
    {
        public bool IsSelected{ get; set;} 
        public int QuizAnswerId{ get; set;} 
        public int QuizFeedId{ get; set;} 
        public int QuizQuestionId{ get; set;} 
        public int UserId{ get; set;} 
    }
}
