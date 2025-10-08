//api call for sending email to backend it should take purpose,email ,url
export async function sendEmail({
  purpose,
  email,
  url
}: {
  purpose: string;
  email: string;
  url?: string;
}) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        purpose,
        email,
        url
      })
    });
  } catch (error) {}
}
