<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PasswordResets;
use Http\Client\Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use PHPMailer\PHPMailer\PHPMailer;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|exists:App\Models\User,email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        // $status = Password::sendResetLink(
        //     $request->only('email')
        // );


        $token = Str::uuid()->toString();

        $resetPasswordUrl = route("password.reset", [
            "email" => $request->input('email'),
            "token" => $token
        ]);

        PasswordResets::create([
            "email" => $request->input('email'),
            "token" => $token
        ]);



        $mail = new PHPMailer();
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
            $mail->Host       = $host;                                  //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = $username;                              //SMTP username
            $mail->Password   = $password;                              //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       =  $port;                                 //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`


            //Recipients
            $mail->setFrom($address, $name);
            $mail->addAddress($request->input('email'));     //Add a recipient          //Name is optional
            $mail->addReplyTo($address, $name);

            //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = "Password Reset";


            $template = 'emails.default';
            $user = User::where('email', '=', $request->input('email'))->first();
            $mail->Body = view(
                $template,
                [
                    'subject' => "Forgot Password",
                    'body' => "Please use this link to reset your password \n" . $resetPasswordUrl,
                ],
            );

            $mail->AltBody = "Please follow this link to reset your password \n" . $resetPasswordUrl;

            $mail->send();
            // $message = $this->translator->get('An email has been sent');
            $status = 'EMAIL SENT, Please check your email and follow the link on it.';
        } catch (Exception $e) {
            echo $e;
            $status = 'EMAIL_FAIL';
            // $message = $this->translator->get('An error occured email could not be sent');
        }






        if (isset($status)) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
