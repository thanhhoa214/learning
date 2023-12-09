namespace StudentManagement
{
    partial class ConfirmForm
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
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.txtStuID = new System.Windows.Forms.TextBox();
            this.txtStuName = new System.Windows.Forms.TextBox();
            this.dtpDayofBirth = new System.Windows.Forms.DateTimePicker();
            this.CbMale = new System.Windows.Forms.CheckBox();
            this.CbFemale = new System.Windows.Forms.CheckBox();
            this.label5 = new System.Windows.Forms.Label();
            this.CoBMajoy = new System.Windows.Forms.ComboBox();
            this.btnSave = new System.Windows.Forms.Button();
            this.btnRemove = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(74, 17);
            this.label1.TabIndex = 0;
            this.label1.Text = "Student ID";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 63);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(98, 17);
            this.label2.TabIndex = 1;
            this.label2.Text = "Student Name";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(12, 117);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(82, 17);
            this.label3.TabIndex = 2;
            this.label3.Text = "Day of Birth";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(12, 171);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(46, 17);
            this.label4.TabIndex = 3;
            this.label4.Text = "label4";
            // 
            // txtStuID
            // 
            this.txtStuID.Location = new System.Drawing.Point(15, 29);
            this.txtStuID.Name = "txtStuID";
            this.txtStuID.Size = new System.Drawing.Size(232, 22);
            this.txtStuID.TabIndex = 4;
            // 
            // txtStuName
            // 
            this.txtStuName.Location = new System.Drawing.Point(15, 83);
            this.txtStuName.Name = "txtStuName";
            this.txtStuName.Size = new System.Drawing.Size(232, 22);
            this.txtStuName.TabIndex = 5;
            // 
            // dtpDayofBirth
            // 
            this.dtpDayofBirth.Location = new System.Drawing.Point(15, 137);
            this.dtpDayofBirth.Name = "dtpDayofBirth";
            this.dtpDayofBirth.Size = new System.Drawing.Size(232, 22);
            this.dtpDayofBirth.TabIndex = 7;
            // 
            // CbMale
            // 
            this.CbMale.AutoSize = true;
            this.CbMale.Location = new System.Drawing.Point(15, 191);
            this.CbMale.Name = "CbMale";
            this.CbMale.Size = new System.Drawing.Size(60, 21);
            this.CbMale.TabIndex = 11;
            this.CbMale.Text = "Male";
            this.CbMale.UseVisualStyleBackColor = true;
            // 
            // CbFemale
            // 
            this.CbFemale.AutoSize = true;
            this.CbFemale.Location = new System.Drawing.Point(15, 218);
            this.CbFemale.Name = "CbFemale";
            this.CbFemale.Size = new System.Drawing.Size(76, 21);
            this.CbFemale.TabIndex = 12;
            this.CbFemale.Text = "Female";
            this.CbFemale.UseVisualStyleBackColor = true;
            this.CbFemale.CheckedChanged += new System.EventHandler(this.checkBox2_CheckedChanged);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(15, 246);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(43, 17);
            this.label5.TabIndex = 13;
            this.label5.Text = "Major";
            // 
            // CoBMajoy
            // 
            this.CoBMajoy.FormattingEnabled = true;
            this.CoBMajoy.Location = new System.Drawing.Point(15, 266);
            this.CoBMajoy.Name = "CoBMajoy";
            this.CoBMajoy.Size = new System.Drawing.Size(121, 24);
            this.CoBMajoy.TabIndex = 14;
            // 
            // btnSave
            // 
            this.btnSave.Location = new System.Drawing.Point(11, 319);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(75, 23);
            this.btnSave.TabIndex = 15;
            this.btnSave.Text = "Save";
            this.btnSave.UseVisualStyleBackColor = true;
            // 
            // btnRemove
            // 
            this.btnRemove.Location = new System.Drawing.Point(172, 319);
            this.btnRemove.Name = "btnRemove";
            this.btnRemove.Size = new System.Drawing.Size(75, 23);
            this.btnRemove.TabIndex = 16;
            this.btnRemove.Text = "Remove";
            this.btnRemove.UseVisualStyleBackColor = true;
            // 
            // ConfirmForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(276, 357);
            this.Controls.Add(this.btnRemove);
            this.Controls.Add(this.btnSave);
            this.Controls.Add(this.CoBMajoy);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.CbFemale);
            this.Controls.Add(this.CbMale);
            this.Controls.Add(this.dtpDayofBirth);
            this.Controls.Add(this.txtStuName);
            this.Controls.Add(this.txtStuID);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "ConfirmForm";
            this.Text = "Confirm change";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.Button btnRemove;
        public System.Windows.Forms.TextBox txtStuID;
        public System.Windows.Forms.TextBox txtStuName;
        public System.Windows.Forms.DateTimePicker dtpDayofBirth;
        public System.Windows.Forms.CheckBox CbMale;
        public System.Windows.Forms.CheckBox CbFemale;
        public System.Windows.Forms.ComboBox CoBMajoy;
    }
}