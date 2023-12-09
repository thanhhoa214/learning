namespace StudentManagement
{
    partial class ViewChartDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea3 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend3 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series3 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea4 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend4 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series4 = new System.Windows.Forms.DataVisualization.Charting.Series();
            this.numberStudentsChart = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.majorChart = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.Dashboard = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.txtTotalStudent = new System.Windows.Forms.Label();
            this.txtTotalMajor = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.numberStudentsChart)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.majorChart)).BeginInit();
            this.SuspendLayout();
            // 
            // numberStudentsChart
            // 
            chartArea3.Name = "ChartArea1";
            this.numberStudentsChart.ChartAreas.Add(chartArea3);
            legend3.Name = "Legend1";
            this.numberStudentsChart.Legends.Add(legend3);
            this.numberStudentsChart.Location = new System.Drawing.Point(12, 197);
            this.numberStudentsChart.Name = "numberStudentsChart";
            series3.ChartArea = "ChartArea1";
            series3.Legend = "Legend1";
            series3.Name = "Number of Students";
            this.numberStudentsChart.Series.Add(series3);
            this.numberStudentsChart.Size = new System.Drawing.Size(583, 241);
            this.numberStudentsChart.TabIndex = 0;
            this.numberStudentsChart.Text = "chart1";
            // 
            // majorChart
            // 
            chartArea4.Name = "ChartArea1";
            this.majorChart.ChartAreas.Add(chartArea4);
            legend4.Name = "Legend1";
            this.majorChart.Legends.Add(legend4);
            this.majorChart.Location = new System.Drawing.Point(316, 12);
            this.majorChart.Name = "majorChart";
            series4.ChartArea = "ChartArea1";
            series4.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Pie;
            series4.Label = "#PERCENT{P1}";
            series4.Legend = "Legend1";
            series4.LegendText = "#VALX";
            series4.LegendToolTip = "#AXISLABEL";
            series4.Name = "major";
            this.majorChart.Series.Add(series4);
            this.majorChart.Size = new System.Drawing.Size(279, 179);
            this.majorChart.TabIndex = 0;
            this.majorChart.Text = "Major Chart";
            // 
            // Dashboard
            // 
            this.Dashboard.AutoSize = true;
            this.Dashboard.Font = new System.Drawing.Font("Lucida Bright", 30F, System.Drawing.FontStyle.Bold);
            this.Dashboard.Location = new System.Drawing.Point(12, 29);
            this.Dashboard.Name = "Dashboard";
            this.Dashboard.Size = new System.Drawing.Size(237, 45);
            this.Dashboard.TabIndex = 1;
            this.Dashboard.Text = "Dashboard";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F);
            this.label1.Location = new System.Drawing.Point(16, 88);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(194, 20);
            this.label1.TabIndex = 2;
            this.label1.Text = "Total number of students: ";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F);
            this.label2.Location = new System.Drawing.Point(16, 120);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(179, 20);
            this.label2.TabIndex = 2;
            this.label2.Text = "Total number of majors: ";
            // 
            // txtTotalStudent
            // 
            this.txtTotalStudent.AutoSize = true;
            this.txtTotalStudent.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Bold);
            this.txtTotalStudent.Location = new System.Drawing.Point(216, 86);
            this.txtTotalStudent.Name = "txtTotalStudent";
            this.txtTotalStudent.Size = new System.Drawing.Size(32, 24);
            this.txtTotalStudent.TabIndex = 2;
            this.txtTotalStudent.Text = "00";
            // 
            // txtTotalMajor
            // 
            this.txtTotalMajor.AutoSize = true;
            this.txtTotalMajor.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Bold);
            this.txtTotalMajor.Location = new System.Drawing.Point(216, 118);
            this.txtTotalMajor.Name = "txtTotalMajor";
            this.txtTotalMajor.Size = new System.Drawing.Size(32, 24);
            this.txtTotalMajor.TabIndex = 2;
            this.txtTotalMajor.Text = "00";
            // 
            // ViewChartDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(607, 450);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtTotalMajor);
            this.Controls.Add(this.txtTotalStudent);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.Dashboard);
            this.Controls.Add(this.majorChart);
            this.Controls.Add(this.numberStudentsChart);
            this.Name = "ViewChartDialog";
            this.Text = "Dashboard";
            ((System.ComponentModel.ISupportInitialize)(this.numberStudentsChart)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.majorChart)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataVisualization.Charting.Chart numberStudentsChart;
        private System.Windows.Forms.DataVisualization.Charting.Chart majorChart;
        private System.Windows.Forms.Label Dashboard;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label txtTotalStudent;
        private System.Windows.Forms.Label txtTotalMajor;
    }
}