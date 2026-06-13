

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzLUgC778SS7Qeg3Rr11iA77_Tb4A9FAj4JS1il62PB8apQtvgAWPBic1vHTZQ13RA7dw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      }
    );

    const result = await response.text();

    return Response.json({
      success: true,
      message: "Enquiry submitted successfully",
      result,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}