require('dotenv').config();
const bcrypt = require('bcryptjs');

const connectDB = require('../config/db');
const User = require('../models/User');
const Class = require('../models/Class');

const seedData = async () => {
  try {
    await connectDB();
    console.log('🌱 Seeding database...');

    // Clear existing data
    await User.deleteMany();
    await Class.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1️⃣ CREATE ADMIN (ONLY ONE)
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gym.com',
      password: hashedPassword,
      role: 'admin'
    });

    // 2️⃣ CREATE TRAINERS (3)
    const trainersData = [
      {
        name: 'Trainer One',
        email: 'trainer1@gym.com'
      },
      {
        name: 'Trainer Two',
        email: 'trainer2@gym.com'
      },
      {
        name: 'Trainer Three',
        email: 'trainer3@gym.com'
      }
    ];

    const trainers = await User.insertMany(
      trainersData.map(trainer => ({
        ...trainer,
        password: hashedPassword,
        role: 'trainer'
      }))
    );

    // 3️⃣ CREATE MEMBERS (15)
    const membersData = [];

    for (let i = 1; i <= 15; i++) {
      membersData.push({
        name: `Member ${i}`,
        email: `member${i}@gym.com`,
        password: hashedPassword,
        role: 'member'
      });
    }

    await User.insertMany(membersData);

    // 4️⃣ CREATE CLASSES (ASSIGNED TO TRAINERS)
    await Class.insertMany([
      {
        title: 'Morning Yoga',
        trainer: trainers[0]._id,
        time: '07:00 AM',
        capacity: 20
      },
      {
        title: 'Strength Training',
        trainer: trainers[1]._id,
        time: '10:00 AM',
        capacity: 15
      },
      {
        title: 'Evening Cardio',
        trainer: trainers[2]._id,
        time: '06:00 PM',
        capacity: 25
      }
    ]);

    console.log('✅ Seeding completed successfully');
    console.log('----------------------------------');
    console.log('Admin Login:');
    console.log('  admin@gym.com / password123');
    console.log('----------------------------------');
    console.log('Trainer Logins:');
    console.log('  trainer1@gym.com / password123');
    console.log('  trainer2@gym.com / password123');
    console.log('  trainer3@gym.com / password123');
    console.log('----------------------------------');
    console.log('Members:');
    console.log('  member1@gym.com ... member15@gym.com');
    console.log('  password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
