<?php

namespace App\Jobs;

use App\Models\User;
use App\GraphQL\Mutations\SendMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NewUserEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user->withoutRelations();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      
        try {
            $modelArray = [
                'bcc' => "contactus@swifre.com",
                "email" => $this->user->email,
                "subject" => "Welcome ".$this->user->firstName. " ".$this->user->lastName ,
                "body" => "Welcome ".$this->user->firstName. " ".$this->user->lastName.". ". "\n\n Please login using this email: ".$this->user->email." and the passord used during registration. \n\n\n Kind regards."
            ];
            $sendmail = new SendMail;
            $sendmail(null, $modelArray);
        } catch (\Throwable $error) {
            // lol
        }
        //
    }
}
