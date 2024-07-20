using API_ASPNET.Data;
using API_ASPNET.Models;
using API_ASPNET.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API_ASPNET.Repositories
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        private readonly _TarefasDBContext _context;

        public UsuarioRepositorio(_TarefasDBContext context)
        {
            _context = context;
        }

        public async Task<List<UsuarioModel>> BuscarTodosUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<UsuarioModel> BuscarUsuarioId(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<UsuarioModel> Adicionar(UsuarioModel usuario)
        {
            usuario.Senha = HashPassword(usuario.Senha);
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<UsuarioModel> Atualizar(UsuarioModel usuario, int id)
        {
            var existingUser = await _context.Usuarios.FindAsync(id);
            if (existingUser == null)
            {
                return null;
            }

            existingUser.Nome = usuario.Nome;
            existingUser.Email = usuario.Email;

            if (!string.IsNullOrEmpty(usuario.Senha))
            {
                existingUser.Senha = HashPassword(usuario.Senha);
            }

            _context.Usuarios.Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task<bool> Apagar(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return false;
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return true;
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public async Task<UsuarioModel?> Login(string email, string senha)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);

            if (usuario == null || !VerificarSenha(senha, usuario.Senha))
            {
                return null;
            }

            return usuario;
        }

        private bool VerificarSenha(string senha, string senhaHash)
        {
            return BCrypt.Net.BCrypt.Verify(senha, senhaHash);
        }
    }
}
