using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentManagement
{
    class MajorsDTO
    {

        public string Id { get; set; }
        public string Name { get; set; }
        public int StartedYear { get; set; }
        public MajorsDTO(string id, string name, int startedYear)
        {
            this.Id = id;
            this.Name = name;
            this.StartedYear = startedYear;
        }

        public MajorsDTO()
        {
        }
    }
}
