using MobileSP_CMS.Core.Repositories;

namespace MobileSP_CMS.Infrastructure.Repositories
{
    public abstract class BaseRepository : IBaseRepository
    {
        public string AuthToken { get; set; }
    }
}