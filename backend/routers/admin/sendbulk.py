from utils.bulkEmailSend import BulkEmailSender
import os


email_template = """
Hi {name},

We hope this message finds you well. We have something special that we think you'll really enjoy!

Our latest offering is designed to make your life easier and more enjoyable. It's packed with features that can help you achieve more in less time, all while having fun.

Here are just a few reasons why you'll find it useful:
- It's simple and easy to use.
- It saves you time on daily tasks.
- It provides a great user experience.

We'd love for you to check it out and see what you think! Click the link below to learn more and get started:

http://localhost:3000/chat

If you have any questions or need assistance, feel free to reply to this email, and we'll be glad to help.

Thanks for your time, and we look forward to hearing from you!

Best regards,
Your Team
"""


def send_mails(template, mailList: list[str]):
    try:
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        smtp_user = os.environ.get("SMTP_USER")
        smtp_password = os.environ.get("SMTP_PASS")
        from_email = os.environ.get("FROM_EMAIL")

        print(smtp_user, smtp_password)

        # Create the BulkEmailSender object
        bulk_email_sender = BulkEmailSender(
            smtp_server, smtp_port, smtp_user, smtp_password, from_email
        )

        if template is None:
            template = email_template

        # Send bulk emails
        bulk_email_sender.send_bulk_emails(
            mailList, "Exciting News!", template, delay=1
        )

        print("Bulk emails sent successfully!")
        return True

    except Exception as e:
        print(e)
        return False
