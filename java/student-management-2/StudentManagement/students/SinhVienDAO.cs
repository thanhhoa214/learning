using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace StudentManagement
{
    class SinhVienDAO
    {
        private static SqlConnection connection = new SqlConnection(ConnectionString.DB_CONNECTION_STRING);
        private SqlCommand cmd = new SqlCommand();

        public int InsertStudent(String name, int masv, int year, String makhoa)
        {
            int resultInsert = 0;
            try
            {
                connection.Open();
                cmd = connection.CreateCommand();
                cmd.CommandText = "INSERT INTO SVIEN VALUES('" + name + "','" + masv + "','" + year + "','" + makhoa + "');";
                resultInsert = cmd.ExecuteNonQuery();
                cmd.Clone();
                connection.Close();
                resultInsert = 1;
            }
            catch(Exception ex)
            {
                if(ex.Message.Contains("PRIMARY KEY constraint"))
                {                   
                    resultInsert = -1;
                    connection.Close();
                } else
                {
                    MessageBox.Show(ex.Message);
                }
                
            }
            return resultInsert;
        }

        public int UpDateStudents(String name, int masv, int year, String makhoa)
        {
            connection.Open();
            cmd = connection.CreateCommand();
            cmd.CommandText = "UPDATE SVIEN SET TEN = '" + name + "',NAM = '" + year + "',MAKH = '" + makhoa + "'\n Where MASV = '" + masv + "'";
            int resultUpdate = cmd.ExecuteNonQuery();
            cmd.Clone();
            connection.Close();
            if (resultUpdate > 0)
                return 1;
            else return 0;

        }


        public int DeleteStudents(int masv)
        {
            connection.Open();
            cmd = connection.CreateCommand();
            cmd.CommandText = "DELETE FROM SVIEN WHERE MASV = '" + masv + "'";
            int resultDelete = cmd.ExecuteNonQuery();
            cmd.Clone();
            connection.Close();
            if (resultDelete > 0)
                return 1;
            else return 0;

        }
        public int GetStudentsCount()
        {
            int result = 0;
            string queryString = "SELECT COUNT(MASV) FROM SVIEN";

            using (SqlConnection connection = new SqlConnection(ConnectionString.DB_CONNECTION_STRING))
            using (SqlCommand cmd = new SqlCommand(queryString, connection))
            {
                connection.Open();

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows && dr.Read())
                    {
                        result = dr.GetInt32(0);
                    }
                }
            }
            return result;
        }
        public int GetStudentsCountByMajorId(string majorId)
        {
            int result = 0;
            string queryString = "SELECT COUNT(MASV) FROM KHOA INNER JOIN SVIEN ON MAKHOA = MAKH WHERE MAKHOA = '" + majorId+"'";

            using (SqlConnection connection = new SqlConnection(ConnectionString.DB_CONNECTION_STRING))
            using (SqlCommand cmd = new SqlCommand(queryString, connection))
            {
                connection.Open();

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows && dr.Read())
                    {
                        result = dr.GetInt32(0);
                    }
                }
            }
            return result;
        }
        public int GetStudentsCountByYear(int year)
        {
            int result = 0;
            string queryString = "SELECT COUNT(MASV) FROM KHOA INNER JOIN SVIEN ON MAKHOA = MAKH WHERE NAM = " + year;

            using (SqlConnection connection = new SqlConnection(ConnectionString.DB_CONNECTION_STRING))
            using (SqlCommand cmd = new SqlCommand(queryString, connection))
            {
                connection.Open();

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows && dr.Read())
                    {
                        result = dr.GetInt32(0);
                    }
                }
            }
            return result;
        }
        public DataTable GetAll()
        {
            DataTable studentTable = new DataTable();
          //  string query = "SELECT  MASV, TEN, NAM, TENKHOA FROM SVIEN INNER JOIN KHOA ON MAKHOA = MAKH";
            string query = "SELECT  MASV, TEN, NAM, MAKH FROM SVIEN";

            using (SqlConnection connection = new SqlConnection(ConnectionString.DB_CONNECTION_STRING))
            {
                connection.Open();

                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, connection);
                DataSet data = new DataSet();
                sqlDataAdapter.Fill(data);

                studentTable = data.Tables[0];
            }
            return studentTable;
        }
        public SinhVienDTO GetById(int id)
        {
            SinhVienDTO student = null;
            string query = "SELECT  MASV, TEN, NAM, MAKH FROM SVIEN WHERE MASV = "+ id;

            using (SqlConnection connection = new SqlConnection(ConnectionString.DB_CONNECTION_STRING))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                connection.Open();
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    if (dataReader.HasRows && dataReader.Read())
                    {
                        student = new SinhVienDTO();
                        student.Masv = dataReader.GetInt32(0);
                        student.Name = dataReader.GetString(1);
                        student.Year = dataReader.GetInt32(2);
                        student.Makhoa = dataReader.GetString(3);
                    }

                }
            }
            return student;
        }
    }
}
