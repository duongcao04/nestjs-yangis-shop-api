export const verifyEmailTemplate = (urlVerify: string) => {
    return `
<table cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <!-- Header Section -->
        <tr>
          <td align="center" style="background-color: #3b82f6; color: #ffffff; padding: 20px; font-size: 24px; font-weight: bold;">
            Verify Your Email
          </td>
        </tr>
        <!-- Body Section -->
        <tr>
          <td style="padding: 20px; color: #333333; line-height: 1.6; font-size: 16px;">
            <p>Hello,</p>
            <p>Thank you for signing up. Please confirm your email address to complete your registration.</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href=${urlVerify} target="_blank" style="background-color: #3b82f6; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
                Verify Email
              </a>
            </div>
            <p>If you didn't sign up for this account, you can ignore this email.</p>
            <p>Best regards,<br>Yangis Shop</p>
          </td>
        </tr>
        <!-- Footer Section -->
        <tr>
          <td align="center" style="background-color: #f3f4f6; color: #888888; font-size: 12px; padding: 10px;">
            © 2024 Yangis. All rights reserved.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`
}
