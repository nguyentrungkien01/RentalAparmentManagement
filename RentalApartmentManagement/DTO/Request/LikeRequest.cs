using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Request
{
    public class LikeRequest : IBaseRequest
    {
        public int PostId { get; set; }
        public int Flag { get; set; }
    }
}
