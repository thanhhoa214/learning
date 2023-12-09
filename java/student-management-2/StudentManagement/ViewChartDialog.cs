using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace StudentManagement
{
    public partial class ViewChartDialog : Form
    {
        public ViewChartDialog()
        {
            InitializeComponent();

            MajorsDAO majorsDAO = new MajorsDAO();
            SinhVienDAO studentsDAO = new SinhVienDAO();

            int numberOfMajors = 0;
            int numberOfStudents = 0;
            Dictionary<string, double> majorDataMap = new Dictionary<string, double>();
            Dictionary<int, int> studentDataMap = new Dictionary<int, int>();

            Dictionary<int, string> yearMap = new Dictionary<int, string>();
            yearMap.Add(1, "First Year");
            yearMap.Add(2, "Second Year");
            yearMap.Add(3, "Third Year");
            yearMap.Add(4, "Last Year");

            try
            {
                List<MajorsDTO> majors = new List<MajorsDTO>();
                numberOfMajors = majorsDAO.GetMajorsCount();
                majors = majorsDAO.GetAll();
                numberOfStudents = studentsDAO.GetStudentsCount();

                foreach (var major in majors)
                {
                    int studentCount = studentsDAO.GetStudentsCountByMajorId(major.Id);
                    majorDataMap.Add(major.Name + " (" + major.Id + ")", studentCount * 100.0 / majors.Count);
                }

                for (int i = 1; i <= 4; i++)
                {
                    studentDataMap.Add(i, studentsDAO.GetStudentsCountByYear(i));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Sorry, we had an internal error. Don't worry, it will be better.\n" + e.Message);
            }

            // Fill chart
            foreach (var data in majorDataMap)
            {
                majorChart.Series["major"].Points.AddXY(data.Key, data.Value);
            }
            foreach (var data in studentDataMap)
            {
                string yearAsString = yearMap.FirstOrDefault(year => year.Key == data.Key).Value;
                numberStudentsChart.Series["Number of Students"].Points.AddXY(yearAsString, data.Value);
            }
            //chart title  
            majorChart.Titles.Add("Majors Pie Chart");
            numberStudentsChart.Titles.Add("Students by Year Chart");
            txtTotalMajor.Text = numberOfMajors+"";
            txtTotalStudent.Text = numberOfStudents + "";
        }
    }
}
