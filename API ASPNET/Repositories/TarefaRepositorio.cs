using API_ASPNET.Data;
using API_ASPNET.Models;
using API_ASPNET.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_ASPNET.Repositories
{
    public class TarefaRepositorio : ITarefarepositorio
    {
        private readonly _TarefasDBContext _context;

        public TarefaRepositorio(_TarefasDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TarefaModel>> GetAllTarefasAsync()
        {
            return await _context.Tarefa.ToListAsync();
        }

        public async Task<TarefaModel> GetTarefaByIdAsync(int id)
        {
            return await _context.Tarefa.FindAsync(id);
        }

        public async Task<TarefaModel> AddTarefaAsync(TarefaModel tarefa)
        {
            _context.Tarefa.Add(tarefa);
            await _context.SaveChangesAsync();
            return tarefa;
        }

        public async Task<TarefaModel> UpdateTarefaAsync(TarefaModel tarefa)
        {
            _context.Entry(tarefa).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return tarefa;
        }

        public async Task<bool> DeleteTarefaAsync(int id)
        {
            var tarefa = await _context.Tarefa.FindAsync(id);
            if (tarefa == null)
            {
                return false;
            }

            _context.Tarefa.Remove(tarefa);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
