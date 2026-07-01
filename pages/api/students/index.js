import { readJSON, writeJSON } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const students = readJSON('students.json', []);
    return res.status(200).json(students);
  }

  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, gender, rollNumber } = req.body;

    if (!name || !gender) {
      return res.status(400).json({ error: 'Name and gender required' });
    }

    const students = readJSON('students.json', []);

    const newStudent = {
      id: uuidv4(),
      name,
      gender,
      rollNumber: rollNumber || '',
      createdAt: new Date().toISOString(),
    };

    students.push(newStudent);
    writeJSON('students.json', students);

    return res.status(201).json(newStudent);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
