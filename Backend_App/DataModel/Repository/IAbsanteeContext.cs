namespace DataModel.Repository;

using Microsoft.EntityFrameworkCore;

using DataModel.Model;

public interface IAbsanteeContext
{
	DbSet<FootballPlayerDataModel> FootballPlayers { get; set; }

}