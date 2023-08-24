import { Router } from 'express'
import CreateReminderDto from '../dtos/create-reminder'
import DeleteReminderDto from '../dtos/delete-reminder'
import Reminder from '../models/reminder'
import PutReminderDto from '../dtos/put-reminder'


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

router.put('/:id', (req,res) => {
    const { title } = req.body as PutReminderDto
    const reminderIdx = reminders.findIndex(reminder => reminder.id === parseInt(req.params.id) )
    if(reminderIdx >= 0){
        reminders[reminderIdx].title = title
        res.json(reminders[reminderIdx])
    }else{
        res.status(404).json({message:'Reminder not found'})
    }
})

export default router