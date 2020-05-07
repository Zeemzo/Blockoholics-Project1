import AWS from "aws-sdk";

export class MailService {
  public static async initiativeApprovedMail(data) {
    try {
      // Replace sender@example.com with your "From" address.
      // This address must be verified with Amazon SES.
      const sender = "Human Fund<admin@fund.human.lk>";

      // Replace recipient@example.com with a "To" address. If your account
      // is still in the sandbox, this address must be verified.
      const recipient = data.email;
      const name = data.fname;
      // Specify a configuration set. If you do not want to use a configuration
      // set, comment the following variable, and the
      // ConfigurationSetName : configuration_set argument below.
      // const configuration_set = "_config";

      // The subject line for the email.
      const subject = "Your Human Fund Initiative has been approved";

      // The email body for recipients with non-HTML email clients.
      const body_text = `
                Dear ${name},

                We are glad to inform you that your Initiative request has been approved 
                and your Initiative has been published. 
                
                Best Regards,
                Team Human Fund`;

      // The HTML body of the email.
      const body_html = `<html>
            <head></head><body>  
            <p>Dear ${name},</p>
            <p> We are glad to inform you that your Initiative request has been approved 
            and your Initiative has been published. </p>

            <br/><p>Best Regards,</p>
            <p>Team Blockevent</p>
            <a href="https://humanfund.firebaseapp.com" target="_blank"><img src="https://humanfund.firebaseapp.com/sidebar.png" height="50" width="50" title="Human" /></a>
            </body>
            </html>`;

      // The character encoding for the email.
      const charset = "UTF-8";

      // Create a new SES object.
      var ses = new AWS.SES();

      // Specify the parameters to pass to the API.
      var params = {
        Source: sender,
        Destination: {
          ToAddresses: [recipient],
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: charset,
          },
          Body: {
            Text: {
              Data: body_text,
              Charset: charset,
            },
            Html: {
              Data: body_html,
              Charset: charset,
            },
          },
        },
        // ConfigurationSetName: configuration_set
      };

      //Try to send the email.
      ses.sendEmail(params, function (err, data) {
        // If something goes wrong, print an error message.
        if (err) {
          console.log("err");
          return null;
          // console.log(err);
        } else {
          return data.MessageId;
        }
      });

      // console.log(data);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
