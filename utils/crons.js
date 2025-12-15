import cron from "node-cron";
import Alert from "../models/alert.js";

export default function cronJobs() {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const hour = now.toTimeString().slice(0, 5); 
      const today = now.toISOString().slice(0, 10);

      const alerts = await Alert.find({ time: hour });

      alerts.forEach((a) => {
        if (a.repeat === "Daily" || a.date === today) {
          console.log(`Reminder Triggered: ${a.title}`);
        }
      });
    } catch (error) {
      console.error("Cron job error:", error);
    }
  });
}
