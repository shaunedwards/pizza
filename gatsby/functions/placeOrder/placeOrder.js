const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <p style="font-size:15px;">Please start walking over, we aim to have your order ready within 20 minutes.</p>
      <table>
        <tbody>
          ${order
            .map(
              (item) =>
                `<tr>
                  <td style="padding: 5px 10px 5px 20px">
                    <img src="${item.thumbnail}" alt="${item.name}" />
                  </td>
                  <td>
                    <p style="font-size:15px;">${item.name}<br /><br />${item.size} - ${item.price}</p>
                  </td>
                </tr>`
            )
            .join('')}
        </tbody>
      </table>
      <p style="font-size:15px;">Your total of <strong>${total}</strong> is due at pickup.</p>
      <p style="font-size:15px;">Thanks for choosing Slicks Slices!</p>
    </div>
  `;
}

// create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // check if honeypot is filled
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Sorry - we only serve humans!',
      }),
    };
  }
  // validate the data being sent to the server
  const requiredFields = ['name', 'email', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Oops! Your order is empty...' }),
    };
  }
  // send success email
  await transporter.sendMail({
    from: 'Slicks Slices <mail@sme.dev>',
    to: `${body.name} <${body.email}>`,
    subject: 'Your pizza is in the oven!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Thanks for your order, ${body.name.split(' ')[0]}!`,
    }),
  };
};
