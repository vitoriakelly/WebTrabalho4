using API_ASPNET.Data.Map;
using API_ASPNET.Models;
using Microsoft.EntityFrameworkCore;

namespace API_ASPNET.Data
{
    public class _TarefasDBContext : DbContext
    {
        public _TarefasDBContext(DbContextOptions<_TarefasDBContext> options)
            : base(options)
        {
        }

        public DbSet<UsuarioModel> Usuarios { get; set; }
        public DbSet<TarefaModel> Tarefa { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioMap());
            modelBuilder.ApplyConfiguration(new TarefaMap());

            base.OnModelCreating(modelBuilder);
        }
    }
}