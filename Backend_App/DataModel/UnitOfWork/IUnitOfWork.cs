using Domain.IRepository;
using Domain.Model.Interface;

namespace UnitOfWork;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository Generic { get; }

    IFootballPlayerRepository FootballPlayerRepository { get; }
    
    Task<int> CompleteAsync();
}