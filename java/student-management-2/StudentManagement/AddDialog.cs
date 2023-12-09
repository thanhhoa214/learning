using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace StudentManagement
{

    public partial class AddDialog : Form
    {
        private int options;


        public AddDialog(int options)
        {
            this.options = options;

            InitializeComponent();
            MajorsDAO majorsDAO = new MajorsDAO();
            var majors = majorsDAO.GetAll();
            foreach (var major in majors)
            {
                cboMajor.Items.Add(major.Id);
            }
            cboMajor.SelectedIndex = 0;


            var years = new BindingList<KeyValuePair<int, string>>();

            years.Add(new KeyValuePair<int, string>(1, "First year"));
            years.Add(new KeyValuePair<int, string>(2, "Second year"));
            years.Add(new KeyValuePair<int, string>(3, "Third year"));
            years.Add(new KeyValuePair<int, string>(4, "Last year"));

            cboYear.DataSource = years;
            cboYear.ValueMember = "Key";
            cboYear.DisplayMember = "Value";
            cboYear.SelectedIndex = 0;

            if (options == 2)
            {
                btnDelete.Visible = true;
                txtStudentID.Enabled = false;
                txtStudentName.ForeColor = Color.Black;
            }


        }

        private void panel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void txtStudentID_Enter(object sender, EventArgs e)
        {
            if (txtStudentID.Text == "Enter ID")
            {
                txtStudentID.Text = "";

                txtStudentID.ForeColor = Color.Black;

            }
        }

        private void txtStudentID_Leave(object sender, EventArgs e)
        {

            if (txtStudentID.Text == "")
            {
                txtStudentID.Text = "Enter ID";

                txtStudentID.ForeColor = Color.DarkGray;

            }
        }

        private void txtStudentName_Enter(object sender, EventArgs e)
        {
            if (txtStudentName.Text == "Enter Name")
            {
                txtStudentName.Text = "";

                txtStudentName.ForeColor = Color.Black;

            }
        }

        private void txtStudentName_Leave(object sender, EventArgs e)
        {
            if (txtStudentName.Text == "")
            {
                txtStudentName.Text = "Enter Name";

                txtStudentName.ForeColor = Color.DarkGray;

            }
        }


        private void btnSubmit_Click(object sender, EventArgs e)
        {
            SinhVienDAO svDAO = new SinhVienDAO();

            String StudentIDtemp = txtStudentID.Text.Trim();
            int StudentID = -1;

            if (StudentIDtemp.Equals("Enter ID"))
            {
                MessageBox.Show("ID can not empty!");
                return;
            }
            else
            {
                try
                {
                    StudentID = Int32.Parse(StudentIDtemp);
                    if (StudentID < 0)
                    {
                        throw new Exception();
                    }
                }
                catch (Exception)
                {
                    MessageBox.Show("Only positive integers have 10 digits!!");
                    return;
                }
            }


            String StudentName = txtStudentName.Text;
            if (StudentName.Equals("Enter Name") || String.IsNullOrWhiteSpace(StudentName))
            {
                MessageBox.Show("Name can not empty!");
                return;
            } else if(StudentName.Length > 30)
            {
                MessageBox.Show("The maximum length is 30");
                return;
            }

            String Major = cboMajor.SelectedItem.ToString();
            if (Major.Equals(" "))
            {
                MessageBox.Show("Please choose Major!!");
                return;
            }

            int Year = cboYear.SelectedIndex;
            if (Year == -1)
            {
                MessageBox.Show("Please choose Year!!");
                return;
            }


            if (options == 1)
            {
                int rsInsert = svDAO.InsertStudent(StudentName, StudentID, Year + 1, Major);
                if (rsInsert > 0)
                {
                    MessageBox.Show("Insert Successfully!!!");
                    this.Close();

                }
                else if (rsInsert == -1)
                {
                    MessageBox.Show("The ID is already exist");
                }


            }
            else if (options == 2)
            {

                int rsUpdate = svDAO.UpDateStudents(StudentName, StudentID, Year + 1, Major);
                if (rsUpdate > 0)
                {
                    MessageBox.Show("Edit Successfully!!!");
                    this.Close();

                }
                else
                {
                    MessageBox.Show("Edit Faild!!!");
                }
            }


        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            DialogResult dialogResult = MessageBox.Show("Are you sure want to delete?", "", MessageBoxButtons.YesNo);
            
            if(dialogResult == DialogResult.Yes)
            {
                SinhVienDAO svDAO = new SinhVienDAO();
                String StudentIDtemp = txtStudentID.Text.Trim();
                int StudentID = Int32.Parse(StudentIDtemp);
                int rsDelete = svDAO.DeleteStudents(StudentID);
                if (rsDelete > 0)
                {
                    MessageBox.Show("Deleted Successfully!!!");
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Deleted Faild!!!");
                }
            }
                                   
        }
        public void setStudentId(string id)
        {
            txtStudentID.Text = id;
        }
        public void setStudentName(string name)
        {
            txtStudentName.Text = name;
        }

        public void setStudentYear(int year)
        {
            cboYear.SelectedIndex = year - 1;
        }
        public void setStudentMajor(string majorId)
        {
            cboMajor.SelectedItem = majorId;
        }


    }
}
