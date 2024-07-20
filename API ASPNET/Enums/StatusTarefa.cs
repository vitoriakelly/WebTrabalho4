using System.ComponentModel;

namespace API_ASPNET.Enums
{
    public enum StatusTarefa
    {
        [Description("A fazer")]
        AFAzer = 1,
        [Description("Em andamento")]
        EmAndamento = 2,
        [Description("Concluído")]
        Concluido = 3
    }
}
