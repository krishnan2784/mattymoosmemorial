using System.Collections.Generic;

namespace Phm.MobileSp.Cms.Core.Models
{
    public class ObservationFeed : SurveyFeed
    {
        public virtual List<UserObservation> UserObservations { get; set; }
    }
    
}
