const { db } = require("../../db/dbConfig");
// Crea la tablas
const StudentTables = async () => {
    // Principal
    const createStudentTable = `
    CREATE TABLE IF NOT EXISTS student (
      student_id INT AUTO_INCREMENT PRIMARY KEY,
      last_name VARCHAR(45) NOT NULL,
      middle_name VARCHAR(45),
      first_name VARCHAR(45) NOT NULL,
      gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
      active BIT DEFAULT 1,
      created_on DATETIME DEFAULT NOW(),
      updated_on DATETIME DEFAULT NOW() ON UPDATE NOW()
    )`;

    // Extras
    const createAddressTable = `
    CREATE TABLE IF NOT EXISTS address (
      address_id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT,
      address_line VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      zip_postcode VARCHAR(45) NOT NULL,
      state VARCHAR(100) NOT NULL,
      address_type ENUM('HOME', 'WORK', 'OTHER'),
      created_on DATETIME DEFAULT NOW(),
      updated_on DATETIME DEFAULT NOW() ON UPDATE NOW(),
      FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
    )`;

    const createEmailTable = `
    CREATE TABLE IF NOT EXISTS email (
      email VARCHAR(100) PRIMARY KEY,
      student_id INT,
      email_type ENUM('PERSONAL', 'WORK', 'OTHER'),
      created_on DATETIME DEFAULT NOW(),
      updated_on DATETIME DEFAULT NOW() ON UPDATE NOW(),
      FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
    )`;

    const createPhoneTable = `
  CREATE TABLE IF NOT EXISTS phone (
    phone_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    phone VARCHAR(100),
    phone_type ENUM('MOBILE', 'HOME', 'WORK', 'OTHER'),
    country_code VARCHAR(5),
    area_code VARCHAR(5),
    created_on DATETIME DEFAULT NOW(),
    updated_on DATETIME DEFAULT NOW() ON UPDATE NOW(),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
  )`;

    try {
        await Promise.all([
            // Principal
            db.query(createStudentTable),
            // Extras
            db.query(createAddressTable),
            db.query(createEmailTable),
            db.query(createPhoneTable),
        ]);
        console.log("Tablas estudiante creadas con éxito");
    } catch (error) {
        console.error("Error al crear las tablas: " + error.message);
    }
};

module.exports = StudentTables;
