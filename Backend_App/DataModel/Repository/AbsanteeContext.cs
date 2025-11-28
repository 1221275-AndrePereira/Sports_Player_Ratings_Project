

namespace DataModel.Repository;

using DataModel.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class AbsanteeContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public AbsanteeContext()
    {
    }

    public AbsanteeContext(DbContextOptions<AbsanteeContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }

    public virtual DbSet<FootballPlayerDataModel> FootballPlayers { get; set; } = null!;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // necessário se Domain.Model.Colaborator fosse usado para persistência, e se pretendesse que os atributos/propriedades fossem privadas
        modelBuilder.Entity<FootballPlayerDataModel>().HasKey(x => x.PlayerId);

        
        modelBuilder.Entity<FootballPlayerDataModel>(entity =>
        {
            entity.OwnsOne(x => x.FIFA96Rating);
            entity.OwnsOne(x => x.FIFA97Rating);
            entity.OwnsOne(x => x.FIFA98Rating);
            entity.OwnsOne(x => x.FIFA99Rating);
            entity.OwnsOne(x => x.FIFA2000Rating);
            entity.OwnsOne(x => x.FIFA2001Rating);
            entity.OwnsOne(x => x.FIFA2002Rating);
            entity.OwnsOne(x => x.FIFA2003Rating);
            entity.OwnsOne(x => x.FIFA2004Rating);
            entity.OwnsOne(x => x.FIFA2005Rating);
            entity.OwnsOne(x => x.FIFA06Rating);
            entity.OwnsOne(x => x.FIFA07Rating);
            entity.OwnsOne(x => x.FIFA08Rating);
            entity.OwnsOne(x => x.FIFA09Rating);
            entity.OwnsOne(x => x.FIFA10Rating);
            entity.OwnsOne(x => x.FIFA11Rating);
            entity.OwnsOne(x => x.FIFA12Rating);
            entity.OwnsOne(x => x.FIFA13Rating);
            entity.OwnsOne(x => x.FIFA14Rating);
            entity.OwnsOne(x => x.FIFA15Rating);
            entity.OwnsOne(x => x.FIFA16Rating);
            entity.OwnsOne(x => x.FIFA17Rating);
            entity.OwnsOne(x => x.FIFA18Rating);
            entity.OwnsOne(x => x.FIFA19Rating);
            entity.OwnsOne(x => x.FIFA20Rating);
            entity.OwnsOne(x => x.FIFA21Rating);
            entity.OwnsOne(x => x.FIFA22Rating);
            entity.OwnsOne(x => x.FIFA23Rating);
            entity.OwnsOne(x => x.EAFC24Rating);
            entity.OwnsOne(x => x.EAFC25Rating);
            entity.OwnsOne(x => x.EAFC26Rating);
        });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder
        .LogTo(Console.WriteLine)
        .EnableSensitiveDataLogging() //to log sensitive data
        .EnableDetailedErrors();
}