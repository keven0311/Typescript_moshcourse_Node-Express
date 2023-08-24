import { Router } from 'express'
import CreateReminderDto from '../dtos/create-reminder'
import DeleteReminderDto from '../dtos/delete-reminder'
import Reminder from '../models/reminder'


const router = Router()
const reminders:Reminder[] = []

router.get('/', (req,res) => {
    res.json(reminders)
})


router.post('/', (req,res) => {
    const {title} = req.body as CreateReminderDto
    const reminder = new Reminder(title)
    reminders.push(reminder)
    res.status(201).json(reminder)
})

router.delete('/:id', (req,res) => {
    const  id  = req.params.id
    const newReminders = reminders.filter(reminder => reminder.id !== parseInt(id))
    res.json(newReminders)
})

export default router