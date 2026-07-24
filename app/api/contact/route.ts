import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    if (
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_EMAIL
    ) {
      console.error("Missing environment variables for SMTP");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"IT-SUM Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
            </style>
          </head>
          <body style="margin:0;padding:40px 20px;background:#020812;font-family:'Inter',Arial,sans-serif;color:#ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:650px;background:#06101d;border:1px solid rgba(6,182,212,0.15);border-radius:24px;overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding:40px;background:radial-gradient(circle at top right, rgba(6,182,212,0.2), transparent 45%), #06101d;border-bottom:1px solid rgba(6,182,212,0.15);">
                        
                        <!-- IT-SUM Text Logo -->
                        <h1 style="margin:0 0 24px;font-size:24px;font-weight:900;letter-spacing:-0.02em;">
                          <span style="color:#ffffff;">IT</span><span style="color:#06B6D4;">-SUM</span>
                        </h1>

                        <p style="margin:0;color:#06B6D4;font-size:12px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">
                          New Contact Message
                        </p>
                        
                        <h2 style="margin:16px 0 0;font-size:28px;line-height:1.2;font-weight:800;color:#ffffff;text-transform:capitalize;">
                          ${subject}
                        </h2>

                        <p style="margin:18px 0 0;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7;">
                          A new inquiry has been submitted through the IT-SUM contact form.
                        </p>
                      </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                      <td style="padding:40px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          
                          <tr>
                            <td style="padding:18px 22px;background:#081421;border:1px solid rgba(255,255,255,0.06);border-radius:16px;">
                              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(6,182,212,0.8);font-weight:700;">
                                Full Name
                              </p>
                              <p style="margin:0;font-size:16px;font-weight:600;color:#ffffff;">
                                ${name}
                              </p>
                            </td>
                          </tr>

                          <tr><td height="14"></td></tr>

                          <tr>
                            <td style="padding:18px 22px;background:#081421;border:1px solid rgba(255,255,255,0.06);border-radius:16px;">
                              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(6,182,212,0.8);font-weight:700;">
                                Email Address
                              </p>
                              <p style="margin:0;font-size:16px;font-weight:600;color:#ffffff;">
                                <a href="mailto:${email}" style="color:#ffffff;text-decoration:none;">${email}</a>
                              </p>
                            </td>
                          </tr>

                          <tr><td height="14"></td></tr>

                          <tr>
                            <td style="padding:24px;background:#081421;border:1px solid rgba(255,255,255,0.06);border-radius:20px;">
                              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(6,182,212,0.8);font-weight:700;">
                                Message
                              </p>
                              <p style="margin:0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.8;">
                                ${message.replace(/\n/g, "<br>")}
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:28px 40px;border-top:1px solid rgba(6,182,212,0.15);background:#040b14;">
                        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);text-align:center;line-height:1.7;">
                          Sent from IT-SUM Website Contact System
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to send message.",
      },
      { status: 500 },
    );
  }
}
