import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';
import { users, rooms, bookings } from './db/schema';
import { eq, and, lt, gt, or, inArray, sql } from 'drizzle-orm';

const app = new Hono();

// CORS middleware
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Initialize Drizzle
const getDb = (env) => drizzle(env.DB);

// Root endpoint
app.get('/', (c) => {
  return c.json({ message: 'Clinic Room Booking API is running on Cloudflare Workers' });
});

// ============ AUTH ENDPOINTS ============
app.post('/api/auth/register', async (c) => {
  try {
    const db = getDb(c.env);
    const { name, email, password, role } = await c.req.json();

    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
    
    if (existingUser) {
      return c.json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' }, 400);
    }

    const [user] = await db.insert(users).values({
      name,
      email,
      password,
      role: role || 'DOCTOR'
    }).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      avatar: users.avatar
    });

    return c.json({
      message: 'สมัครสมาชิกสำเร็จ',
      user
    }, 201);
  } catch (error) {
    console.error('Register error:', error);
    return c.json({ error: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' }, 500);
  }
});

app.post('/api/auth/login', async (c) => {
  try {
    const db = getDb(c.env);
    const { email, password } = await c.req.json();

    const user = await db.select().from(users).where(eq(users.email, email)).get();

    if (!user || user.password !== password) {
      return c.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, 401);
    }

    return c.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' }, 500);
  }
});

// ============ USERS ENDPOINTS ============
app.get('/api/users', async (c) => {
  try {
    const db = getDb(c.env);
    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      avatar: users.avatar
    }).from(users).all();

    return c.json(allUsers);
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

app.post('/api/users', async (c) => {
  try {
    const db = getDb(c.env);
    const { name, email, role, password } = await c.req.json();

    const [user] = await db.insert(users).values({
      name,
      email,
      role: role || 'DOCTOR',
      password
    }).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      avatar: users.avatar
    });

    return c.json(user, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// ============ ROOMS ENDPOINTS ============
app.get('/api/rooms', async (c) => {
  try {
    const db = getDb(c.env);
    const allRooms = await db.select().from(rooms).all();
    return c.json(allRooms);
  } catch (error) {
    return c.json({ error: 'Failed to fetch rooms' }, 500);
  }
});

app.post('/api/rooms', async (c) => {
  try {
    const db = getDb(c.env);
    const { name, type, capacity, description, image, gradient } = await c.req.json();

    const [room] = await db.insert(rooms).values({
      name,
      type,
      capacity: parseInt(capacity),
      description,
      image,
      gradient,
      status: 'AVAILABLE'
    }).returning();

    return c.json(room, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create room' }, 500);
  }
});

app.put('/api/rooms/:id', async (c) => {
  try {
    const db = getDb(c.env);
    const id = parseInt(c.req.param('id'));
    const { name, type, capacity, description, image, gradient } = await c.req.json();

    const [room] = await db.update(rooms)
      .set({
        name,
        type,
        capacity: parseInt(capacity),
        description,
        image,
        gradient,
        updatedAt: new Date()
      })
      .where(eq(rooms.id, id))
      .returning();

    return c.json(room);
  } catch (error) {
    return c.json({ error: 'Failed to update room' }, 500);
  }
});

app.delete('/api/rooms/:id', async (c) => {
  try {
    const db = getDb(c.env);
    const id = parseInt(c.req.param('id'));

    const activeBookings = await db.select()
      .from(bookings)
      .where(
        and(
          eq(bookings.roomId, id),
          inArray(bookings.status, ['PENDING', 'CONFIRMED'])
        )
      )
      .all();

    if (activeBookings.length > 0) {
      return c.json({
        error: 'ไม่สามารถลบห้องที่มีการจองที่ยังไม่เสร็จสิ้นได้ กรุณายกเลิกการจองก่อน'
      }, 400);
    }

    await db.delete(bookings).where(eq(bookings.roomId, id));
    await db.delete(rooms).where(eq(rooms.id, id));

    return c.json({ message: 'Room deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete room' }, 500);
  }
});

app.patch('/api/rooms/:id/status', async (c) => {
  try {
    const db = getDb(c.env);
    const id = parseInt(c.req.param('id'));
    const { status } = await c.req.json();

    const [room] = await db.update(rooms)
      .set({ status, updatedAt: new Date() })
      .where(eq(rooms.id, id))
      .returning();

    return c.json(room);
  } catch (error) {
    return c.json({ error: 'Failed to update room status' }, 500);
  }
});

// ============ BOOKINGS ENDPOINTS ============
app.get('/api/bookings', async (c) => {
  try {
    const db = getDb(c.env);
    const allBookings = await db.select({
      id: bookings.id,
      roomId: bookings.roomId,
      userId: bookings.userId,
      startTime: bookings.startTime,
      endTime: bookings.endTime,
      status: bookings.status,
      notes: bookings.notes,
      createdAt: bookings.createdAt,
      room: rooms,
      user: users
    })
    .from(bookings)
    .leftJoin(rooms, eq(bookings.roomId, rooms.id))
    .leftJoin(users, eq(bookings.userId, users.id))
    .all();

    return c.json(allBookings);
  } catch (error) {
    return c.json({ error: 'Failed to fetch bookings' }, 500);
  }
});

app.post('/api/bookings', async (c) => {
  try {
    const db = getDb(c.env);
    const { roomId, userId, startTime, endTime, notes } = await c.req.json();

    const start = new Date(startTime);
    const end = new Date(endTime);

    const conflictingBooking = await db.select()
      .from(bookings)
      .where(
        and(
          eq(bookings.roomId, parseInt(roomId)),
          inArray(bookings.status, ['CONFIRMED', 'PENDING']),
          or(
            and(
              lt(bookings.startTime, end),
              gt(bookings.endTime, start)
            )
          )
        )
      )
      .get();

    if (conflictingBooking) {
      return c.json({ error: 'Room is not available at this time' }, 400);
    }

    const [booking] = await db.insert(bookings).values({
      roomId: parseInt(roomId),
      userId: parseInt(userId),
      startTime: start,
      endTime: end,
      notes,
      status: 'PENDING'
    }).returning();

    return c.json(booking, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create booking' }, 500);
  }
});

app.patch('/api/bookings/:id/status', async (c) => {
  try {
    const db = getDb(c.env);
    const id = parseInt(c.req.param('id'));
    const { status } = await c.req.json();

    const [booking] = await db.update(bookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();

    return c.json(booking);
  } catch (error) {
    return c.json({ error: 'Failed to update booking status' }, 500);
  }
});

// ============ UPLOAD ENDPOINTS (ImgBB - Free Cloud Storage) ============
app.post('/api/upload/room-image', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('image');

    if (!file) {
      return c.json({ error: 'No image file provided' }, 400);
    }

    // Get ImgBB API key from environment
    const IMGBB_API_KEY = c.env.IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY';

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    // Upload to ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', base64);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: imgbbFormData
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error?.message || 'Upload failed');
    }

    // Return ImgBB URL
    return c.json({
      message: 'Image uploaded successfully to ImgBB',
      imageUrl: result.data.url,
      thumbnailUrl: result.data.thumb.url,
      deleteUrl: result.data.delete_url,
      filename: file.name
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload image: ' + error.message }, 500);
  }
});

app.get('/uploads/:filename', async (c) => {
  // ImgBB handles image serving directly
  return c.json({ error: 'Images are served from ImgBB CDN' }, 404);
});

app.delete('/api/upload/:filename', async (c) => {
  // ImgBB images can be deleted via delete_url if needed
  return c.json({ message: 'Image deletion not implemented (ImgBB)' });
});

// ============ SEARCH ENDPOINTS ============
app.get('/api/rooms/search', async (c) => {
  try {
    const db = getDb(c.env);
    const q = c.req.query('q') || '';

    const searchResults = await db.select()
      .from(rooms)
      .where(sql`LOWER(${rooms.name}) LIKE LOWER('%' || ${q} || '%')`)
      .all();

    return c.json(searchResults);
  } catch (error) {
    return c.json({ error: 'Failed to search rooms' }, 500);
  }
});

// ============ TEST ENDPOINTS ============
app.get('/api/test-uploads', async (c) => {
  try {
    const list = await c.env.UPLOADS.list({ limit: 100 });
    
    return c.json({
      message: 'R2 bucket contents',
      files: list.objects.map(obj => obj.key),
      count: list.objects.length,
      truncated: list.truncated
    });
  } catch (error) {
    return c.json({ error: 'Failed to list uploads' }, 500);
  }
});

export default app;
