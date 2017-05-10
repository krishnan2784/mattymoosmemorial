namespace Phm.MobileSp.Cms.Core.Models.Interfaces
{
    public interface IUserMarket
    {
        int Id { get; set; }
        string Name { get; set; }
        bool IsDefault { get; set; }
        bool IsMaster { get; set; }

    }

}
