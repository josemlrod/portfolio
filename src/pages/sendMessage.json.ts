import AWS from "aws-sdk";
import type { APIRoute } from "astro";

// Configure AWS SDK
AWS.config.update({
  region: "us-east-1",
  accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
}); // Replace with your AWS region

// Create an SES service object
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export const POST: APIRoute = async ({ request }) => {
  const message = await getEmailData(request);

  // Set up the email parameters
  const emailParams = {
    Destination: {
      ToAddresses: ["joserodriguezcabr@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message.message,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `${message.name} - ${message.subject}`,
      },
    },
    Source: "joserodriguezcabr@gmail.com",
  };

  let err;

  // Send the email
  ses.sendEmail(emailParams, (err, data) => {
    if (err) {
      err = err;
    }
  });

  if (err) {
    return new Response(
      JSON.stringify({
        success: false,
        err,
      }),
      {
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      status: 200,
    }
  );
};

async function getEmailData(request: Request) {
  const requestBody = await request.text();
  const dataPoints = requestBody.split("&");
  const message = dataPoints.reduce(
    (acc: { [key: string]: string }, curr: string) => {
      const [key, val] = curr.split("=");
      return { ...acc, [key]: val };
    },
    {}
  );

  return message;
}
