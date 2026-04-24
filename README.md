# ✨ Personal Task Manager with Deadline Alert

A beautiful, interactive task management application with real-time deadline alerts built with vanilla HTML, CSS, and JavaScript.

## 🎯 Features

- **📝 Add Tasks** - Create new tasks with custom names and deadlines
- **⏰ Deadline Alerts** - Get notified when tasks are due soon or overdue
- **📊 Statistics Dashboard** - Track total, pending, and completed tasks with completion rate
- **✅ Complete Tasks** - Mark tasks as done with a single click
- **🗑️ Delete Tasks** - Remove individual tasks or all completed tasks at once
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **🎨 Beautiful UI** - Modern gradient design with smooth animations
- **⏲️ Real-time Updates** - Auto-refresh every minute to track time remaining
- **🎉 Complete All** - Mark all tasks as complete instantly

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Click **"➕ Add Task"** to create a new task
3. Enter your task name and deadline (format: `YYYY-MM-DD HH:MM`)
4. View your tasks and receive deadline alerts automatically

### Example Deadline Format
```
2026-04-25 14:30  (April 25, 2026 at 2:30 PM)
2026-12-31 23:59  (December 31, 2026 at 11:59 PM)
```

## 📋 Available Actions

| Button | Purpose |
|--------|---------|
| ➕ Add Task | Create a new task with deadline |
| 🔄 Refresh | Manually refresh the task list |
| ✅✅ Complete All | Mark all tasks as completed |
| 🗑️ Delete Completed | Remove all completed tasks |
| ⏰ Check Alerts | View urgent deadline alerts |

## 📊 Dashboard Stats

- **Total Tasks** - Count of all tasks (completed + pending)
- **Pending** - Tasks that haven't been completed yet
- **Completed** - Successfully finished tasks
- **Completion Rate** - Percentage of tasks completed (color-coded by performance)

## ⏰ Alert System

The app monitors your deadlines and displays alerts based on urgency:

- 🔴 **OVERDUE** - Task deadline has passed (blinking red)
- 🚨 **URGENT** - Less than 1 hour remaining (red alert)
- ⏰ **1-HOUR REMINDER** - Exactly 1 hour remaining (yellow warning)
- 📅 **NORMAL** - More than 24 hours remaining (green status)

## 💾 Data Storage

Tasks are stored in your browser's memory. They will be cleared if you:
- Refresh the page completely
- Close and reopen the browser

For persistent storage, consider saving your tasks to a backend database.

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Gradients, animations, flexbox, responsive design
- **JavaScript (Vanilla)** - No frameworks, pure JavaScript logic

## 📱 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth fade-in/slide-in animations
- Hover effects on buttons and task cards
- Pulsing animation on alert button
- Custom scrollbar styling
- Mobile-first responsive design

## 🔧 Customization

You can easily customize:
- Colors: Modify the gradient colors in CSS (currently `#667eea` and `#764ba2`)
- Font: Change font-family in the body style
- Animations: Adjust animation timings and effects
- Button text: Modify button labels and emojis

## 📝 Demo Tasks

The app comes with 2 sample tasks:
1. "🎯 Try completing me!" - Due in 30 minutes
2. "📝 Submit project report" - Due tomorrow

Delete these and add your own tasks!

## 🐛 Known Limitations

- Data is not persistent (resets on page refresh)
- No backend synchronization
- Limited to browser's local memory
- No duplicate task detection

## 🚀 Future Enhancements

- Local storage persistence
- Firebase/Database integration
- Task categories and priorities
- Task notes and descriptions
- Recurring tasks
- Export/Import functionality
- Dark mode theme

## 📄 License

This project is open source and available for personal and educational use.

## 👤 Author

Created with ❤️ by Aryan Singh

---

**Stay organized, beat deadlines with style!** ✨
