import { createCanvas, loadImage } from "canvas";

interface MovieDetails {
  experienceName: string;
  experienceDate: string;
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
      experienceDate = "Default Date",
      numberOfPersons = 0,
      customerName = "Default Customer",
    } = Object.fromEntries(body) as unknown as MovieDetails;

    console.log(experienceName, experienceDate, numberOfPersons, customerName);

    // Generate a unique booking ID
    const bookingId = generateBookingId();

    // Create an image of the ticket
    const ticketImage = createTicketImage(
      experienceName,
      experienceDate,
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
      status: 200,
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
  // load default image from url
  const image = await loadImage("https://passprt-app.vercel.app/mticket.jpeg");

  // Create a canvas
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  // load image from local file and draw image
  ctx.drawImage(image, -4, 6);

  // Set the text color and font
  ctx.fillStyle = "#000000";
  ctx.font = "22px Arial";

  // Draw the ticket details
  ctx.fillText(`${experienceName}`, 45, 300);
  ctx.fillText(`${date}`, 45, 410);
  ctx.fillText(`${customerName}`, 45, 520);

  ctx.textAlign = "right";
  ctx.fillText(`${numberOfPersons}`, 435, 520);

  ctx.textAlign = "center";
  ctx.fillText(`${bookingId}`, 244, 780);

  ctx.fillStyle = "#ffffff";
  ctx.font = "18px Arial";
  ctx.fillText(`${bookingId}`, 244, 42);

  // Generate the image buffer
  const buffer = canvas.toBuffer("image/png");

  return buffer;
};
