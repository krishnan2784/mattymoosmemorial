using System.Threading.Tasks;
using Phm.MobileSp.Cms.Core.Models;

namespace Phm.MobileSp.Cms.Contracts
{
    public interface IFeedItemModelBinder
    {
        BaseFeed GetFeedItemModel(string requestBody);
    }
}