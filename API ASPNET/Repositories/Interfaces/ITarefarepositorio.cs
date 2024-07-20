using API_ASPNET.Models;

namespace API_ASPNET.Repositories.Interfaces
{
    public interface ITarefarepositorio
    {
        Task<IEnumerable<TarefaModel>> GetAllTarefasAsync();
        Task<TarefaModel> GetTarefaByIdAsync(int id);
        Task<TarefaModel> AddTarefaAsync(TarefaModel tarefa);
        Task<TarefaModel> UpdateTarefaAsync(TarefaModel tarefa);
        Task<bool> DeleteTarefaAsync(int id);
    }
}
