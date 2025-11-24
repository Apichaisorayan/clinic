// Script to export data from old SQLite to SQL format for D1
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'api', 'prisma', 'dev.db');
const outputPath = path.join(__dirname, 'api-cloudflare', 'drizzle', '0001_seed_data.sql');

const db = new sqlite3.Database(dbPath);

let sqlOutput = '-- Migrated data from existing database\n\n';

// Export users
db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) {
    console.error('Error reading users:', err);
    return;
  }

  if (rows && rows.length > 0) {
    sqlOutput += '-- Insert users\n';
    rows.forEach(row => {
      const createdAt = Math.floor(new Date(row.createdAt).getTime() / 1000);
      const updatedAt = Math.floor(new Date(row.updatedAt).getTime() / 1000);
      sqlOutput += `INSERT INTO users (id, email, password, name, role, avatar, created_at, updated_at) VALUES (${row.id}, '${row.email.replace(/'/g, "''")}', '${row.password ? row.password.replace(/'/g, "''") : ''}', '${row.name.replace(/'/g, "''")}', '${row.role}', ${row.avatar ? `'${row.avatar.replace(/'/g, "''")}'` : 'NULL'}, ${createdAt}, ${updatedAt});\n`;
    });
    sqlOutput += '\n';
  }

  // Export rooms
  db.all('SELECT * FROM rooms', [], (err, rows) => {
    if (err) {
      console.error('Error reading rooms:', err);
      return;
    }

    if (rows && rows.length > 0) {
      sqlOutput += '-- Insert rooms\n';
      rows.forEach(row => {
        const createdAt = Math.floor(new Date(row.createdAt).getTime() / 1000);
        const updatedAt = Math.floor(new Date(row.updatedAt).getTime() / 1000);
        sqlOutput += `INSERT INTO rooms (id, name, type, capacity, status, image, gradient, description, created_at, updated_at) VALUES (${row.id}, '${row.name.replace(/'/g, "''")}', '${row.type}', ${row.capacity}, '${row.status}', ${row.image ? `'${row.image.replace(/'/g, "''")}'` : 'NULL'}, ${row.gradient ? `'${row.gradient.replace(/'/g, "''")}'` : 'NULL'}, ${row.description ? `'${row.description.replace(/'/g, "''")}'` : 'NULL'}, ${createdAt}, ${updatedAt});\n`;
      });
      sqlOutput += '\n';
    }

    // Export bookings
    db.all('SELECT * FROM bookings', [], (err, rows) => {
      if (err) {
        console.error('Error reading bookings:', err);
        return;
      }

      if (rows && rows.length > 0) {
        sqlOutput += '-- Insert bookings\n';
        rows.forEach(row => {
          const startTime = Math.floor(new Date(row.startTime).getTime() / 1000);
          const endTime = Math.floor(new Date(row.endTime).getTime() / 1000);
          const createdAt = Math.floor(new Date(row.createdAt).getTime() / 1000);
          const updatedAt = Math.floor(new Date(row.updatedAt).getTime() / 1000);
          sqlOutput += `INSERT INTO bookings (id, room_id, user_id, start_time, end_time, status, notes, created_at, updated_at) VALUES (${row.id}, ${row.roomId}, ${row.userId}, ${startTime}, ${endTime}, '${row.status}', ${row.notes ? `'${row.notes.replace(/'/g, "''")}'` : 'NULL'}, ${createdAt}, ${updatedAt});\n`;
        });
      }

      // Write to file
      fs.writeFileSync(outputPath, sqlOutput);
      console.log('✅ Data exported successfully to:', outputPath);
      console.log('\nNext steps:');
      console.log('1. cd api-cloudflare');
      console.log('2. npm install');
      console.log('3. npx wrangler login');
      console.log('4. npx wrangler d1 create clinic-booking-db');
      console.log('5. Update database_id in wrangler.toml');
      console.log('6. npm run db:migrate');
      console.log('7. npx wrangler d1 execute clinic-booking-db --local --file=./drizzle/0001_seed_data.sql');
      console.log('8. npm run dev');

      db.close();
    });
  });
});
