import { createCanvas } from "canvas";

interface MovieDetails {
  experienceName: string;
  date: string;
  numberOfPersons: number;
  customerName: string;
}

export async function POST(request: Request) {
  try {
    // get the request body
    const body = await request.formData();

    // get the values from the request body
    const {
      experienceName = "Experience",
      date = "Default Date",
      numberOfPersons = 0,
      customerName = "Default Customer",
    } = Object.fromEntries(body) as unknown as MovieDetails;

    console.log(experienceName, date, numberOfPersons, customerName);

    // Generate a unique booking ID
    const bookingId = generateBookingId();

    // Create an image of the ticket
    const ticketImage = createTicketImage(
      experienceName,
      date,
      numberOfPersons,
      customerName,
      bookingId
    );

    // Return a 200 response with the image as the body
    return new Response(await ticketImage, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename=${bookingId}.png`,
      },
    });
  } catch (error) {
    // Return a 400 response if the request is invalid
    return new Response("Invalid request", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

// Helper function to generate a unique booking ID
const generateBookingId = (): string => {
  // return a randomly generated string of 8 characters
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let bookingId = "";
  for (let i = 0; i < 8; i++) {
    bookingId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return bookingId;
};

// Helper function to create an image of the ticket
const createTicketImage = async (
  experienceName: string,
  date: string,
  numberOfPersons: number,
  customerName: string,
  bookingId: string
): Promise<Buffer> => {
  // Create a canvas
  const canvas = createCanvas(400, 800);
  const ctx = canvas.getContext("2d");

  // Set the background color
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set the text color and font
  ctx.fillStyle = "#000000";
  ctx.font = "24px 'Your Font Family'";

  // Draw the ticket details
  ctx.fillText(`Experience: ${experienceName}`, 50, 50);
  ctx.fillText(`Date: ${date}`, 50, 100);
  ctx.fillText(`Number of Persons: ${numberOfPersons}`, 50, 150);
  ctx.fillText(`Customer Name: ${customerName}`, 50, 200);
  ctx.fillText(`Booking ID: ${bookingId}`, 50, 250);

  // Generate the image buffer
  const buffer = canvas.toBuffer("image/png");

  return buffer;
};
