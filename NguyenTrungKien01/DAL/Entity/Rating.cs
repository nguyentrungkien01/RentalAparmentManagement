using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Entity
{
    public partial class Rating
    {
        public int AccountId { get; set; }
        public int PostId { get; set; }
        public int RateAmount { get; set; }

        public virtual Account Account { get; set; }
        public virtual Post Post { get; set; }
    }
}
