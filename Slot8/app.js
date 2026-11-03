// Import MongoClient từ thư viện mongodb
const { MongoClient } = require("mongodb");

// Địa chỉ MongoDB
// 27017 = port mặc định của MongoDB
const url = "mongodb://127.0.0.1:27017";
// Tạo đối tượng MongoClient
const client = new MongoClient(url);
// Hàm main() là nơi chạy chương trình
async function main() {
  try {
    // 1. Kết nối đến MongoDB
    await client.connect();
    await createdoc(client, "students_manager", "students", {
      studentCode: "SV001",
      fullName: "Nguyen Van An",
      gender: "Male",
      dateOfBirth: "2004-03-15",
      email: "an.nguyen@example.com",
      major: "Information Technology",
      year: 3,
      gpa: 3.25,
    });
    await listall(client, "students_manager", "students");

    console.log("Connected to MongoDB");
    console.log("================================");
    // 2. Chọn database
    // Ở đây database có tên là school_db
    const db = client.db("students_manager");
    // 3. Chọn collection students
    const students = db.collection("students");

    // 4. Kiểm tra tên database
    console.log("Database:", db.databaseName);
    // Có thể sử dụng biến students
    // để thực hiện các thao tác với collection students
    console.log("Collection: students");
  } catch (error) {
    // Nếu kết nối hoặc thao tác bị lỗi
    // thì hiển thị thông báo lỗi
    console.error("Lỗi kết nối MongoDB:", error);
  } finally {
    // 5. Đóng kết nối MongoDB
    await client.close();
    console.log("Đã đóng kết nối MongoDB.");
  }
}
// Gọi hàm main() để chạy chương trình
main();

async function createdoc(client, dbname, colname, doc) {
  const dbobj = await client.db(dbname);
  const col = dbobj.collection(colname);
  const result = await col.insertOne(doc);
  console.log(
    `New document created with the following id: ${result.insertedId}`,
  );
}
async function listall(client, dbname, colname) {
  const result = await client.db(dbname).collection(colname).find({}).toArray();
  console.log(JSON.stringify(result));
}
