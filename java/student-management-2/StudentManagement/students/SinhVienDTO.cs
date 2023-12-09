using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentManagement
{
    class SinhVienDTO
    {

        public string Name { get; set; }
        public int Masv { get; set; }
        public int Year { get; set; }
        public string Makhoa { get; set; }
        public SinhVienDTO(string name, int masv, int year, string makhoa)
        {
            this.Name = name;
            this.Masv = masv;
            this.Year = year;
            this.Makhoa = makhoa;
        }

        public SinhVienDTO()
        {
        }
    }
}
