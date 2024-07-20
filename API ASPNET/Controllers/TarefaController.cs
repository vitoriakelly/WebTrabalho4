using API_ASPNET.Models;
using API_ASPNET.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API_ASPNET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefarepositorio _tarefaRepositorio;

        public TarefaController(ITarefarepositorio tarefaRepositorio)
        {
            _tarefaRepositorio = tarefaRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TarefaModel>>> GetAllTarefas()
        {
            var tarefas = await _tarefaRepositorio.GetAllTarefasAsync();
            return Ok(tarefas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TarefaModel>> GetTarefaById(int id)
        {
            var tarefa = await _tarefaRepositorio.GetTarefaByIdAsync(id);
            if (tarefa == null)
            {
                return NotFound();
            }

            return Ok(tarefa);
        }

        [HttpPost]
        public async Task<ActionResult<TarefaModel>> AddTarefa(TarefaModel tarefa)
        {
            var createdTarefa = await _tarefaRepositorio.AddTarefaAsync(tarefa);
            return CreatedAtAction(nameof(GetTarefaById), new { id = createdTarefa.Id }, createdTarefa);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<TarefaModel>> UpdateTarefa(int id, TarefaModel tarefa)
        {
            if (id != tarefa.Id)
            {
                return BadRequest();
            }

            var updatedTarefa = await _tarefaRepositorio.UpdateTarefaAsync(tarefa);
            if (updatedTarefa == null)
            {
                return NotFound();
            }

            return Ok(updatedTarefa);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTarefa(int id)
        {
            var result = await _tarefaRepositorio.DeleteTarefaAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
