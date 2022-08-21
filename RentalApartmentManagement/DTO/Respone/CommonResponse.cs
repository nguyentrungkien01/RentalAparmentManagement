using Util.Constant;
namespace DTO.Respone
{
    public class CommonResponse:IBaseResponse
    {
        public object Data { get; set; }
        public string Message { get; set; }
        public Code Code { get; set; }
    }
}
