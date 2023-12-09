using System.Collections.Generic;
using System.Data.SqlClient;

namespace StudentManagement
{
    class MajorsDAO
    {
        public List<MajorsDTO> GetAll()
        {
            List<MajorsDTO> result = new List<MajorsDTO>();
            string queryString = "SELECT MAKHOA, TENKHOA, NAMTHANHLAP FROM KHOA";

            using (SqlConnection connection = new SqlConnection(ConnectionString.DB_CONNECTION_STRING))
            using (SqlCommand cmd = new SqlCommand(queryString, connection))
            {
                connection.Open();

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            MajorsDTO major = new MajorsDTO();
                            major.Id = dr.GetString(0);
                            major.Name = dr.GetString(1);
                            major.StartedYear = dr.GetInt32(2);
                            result.Add(major);
                        }
                    }
                }
            }
            return result;
        }
        public int GetMajorsCount()
        {
            int result = 0;
            string queryString = "SELECT COUNT(MAKHOA) FROM KHOA";

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
    }
}
