using System;
using System.Data;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace StudentManagement
{
    public partial class Index : Form
    {

        public static int options;

        public Index()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            options = 1;
            AddDialog formAdd = new AddDialog(options);
            formAdd.ShowDialog();
        }

        private void dataGridView1_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            options = 2;
            AddDialog formAdd = new AddDialog(options);

            formAdd.setStudentId( this.dataGridView1.CurrentRow.Cells[0].Value.ToString());
            formAdd.setStudentName( this.dataGridView1.CurrentRow.Cells[1].Value.ToString());
            formAdd.setStudentYear((int) this.dataGridView1.CurrentRow.Cells[2].Value);
            formAdd.setStudentMajor( this.dataGridView1.CurrentRow.Cells[3].Value.ToString());
            formAdd.ShowDialog();
        }

        private void Index_Activated(object sender, EventArgs e)
        {
            SinhVienDAO studentsDAO = new SinhVienDAO();
            dataGridView1.DataSource = studentsDAO.GetAll();
        }

        private void button2_Click_1(object sender, EventArgs e)
        {
            ViewChartDialog viewChartDialog = new ViewChartDialog();
            viewChartDialog.ShowDialog();
        }

      
    }
}
