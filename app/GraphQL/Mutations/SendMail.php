<?php

namespace App\GraphQL\Mutations;


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


final class SendMail
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args): String
    {

       
        if (isset($args['attachment'])) {
            $attachment =  $args['attachment'];
            $pathx = $attachment->storeAs("images", $attachment->hashName(), "public");
        }
      
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);
            $address = config('mail.mailers.smtp.sender_address');
            $name = config('mail.mailers.smtp.sender_name');
            $host = config('mail.mailers.smtp.host');
            $port = config('mail.mailers.smtp.port');
            // $encryption = config('mail.mailers.smtp.encryption');
            $username = config('mail.mailers.smtp.username');
            $password = config('mail.mailers.smtp.password');

        try {
            //Server settings
            $mail->SMTPDebug = 0;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = $host;                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = $username;                     //SMTP username
            $mail->Password   = $password;                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       =  $port;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`


            //Recipients
            $mail->setFrom($address, $name);
            $mail->addAddress($args['email']);     //Add a recipient          //Name is optional
            $mail->addReplyTo("contactus@swifre.com", $name);
            if (isset($args['cc'])) {
                $mail->addCC($args['cc']);
            };
            if (isset($args['bcc'])) {
                $mail->addBCC($args['bcc']);
            };

            //Attachments
            if (isset($args['attachment'])) {
                $mail->addAttachment($pathx);
            }
            //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = $args['subject'];
            $template = isset($args['template']) ? $args['template'] :'emails.default';
            $mail->Body = view($template,
                [
                    'subject' => $args['subject'],
                    'body' => $args['body'],
                ],
            );
            $mail->AltBody = $args['body'];
            $mail->send();
            return 'Message has been sent';
        } catch (Exception $e) {
            return error_log(json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}"));
        }
    }
}
