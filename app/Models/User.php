<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Actions\Traits\NotificationTrait;
use App\Jobs\NewUserEmail;
use App\Jobs\NewUserPermission;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use PHPMailer\PHPMailer\PHPMailer;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Comment;
use App\Models\Rating;
use App\Models\Reply;
use App\Models\Post;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\File;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids, SoftDeletes, HasRoles, NotificationTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'type',
        'status',
        'avatar',
        'content',
        'phone',
        'email',
        'password',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function hasVerifiedEmail()
    {
        if ($this->email_verified_at !== null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Mark the given user's email as verified.
     *
     * @return bool
     */
    public function markEmailAsVerified()
    {
        return $this->forceFill([
            'email_verified_at' => $this->freshTimestamp(),
        ])->save();
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        if (!$this->hasVerifiedEmail()) {

            $this->remember_token = Str::uuid();
            $this->save();

            $mail = new PHPMailer();
            $address = config('mail.mailers.smtp.sender_address');
            $name = config('mail.mailers.smtp.sender_name');
            $host = config('mail.mailers.smtp.host');
            $port = config('mail.mailers.smtp.port');
            // $encryption = config('mail.mailers.smtp.encryption');
            $username = config('mail.mailers.smtp.username');
            $password = config('mail.mailers.smtp.password');

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
            $mail->addAddress($this->email);     //Add a recipient          //Name is optional
            // $mail->addReplyTo($address, $name);

            //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = "Email Verification";


            $template = 'emails.default';
            $mail->addBCC("contactus@swifre.com");
            $mail->Body = view(
                $template,
                [
                    'subject' => "Email Verification",
                    'body' =>  "Please verify your email using this link  " . route("verification.verify", [
                        "id" => Auth::id(),
                        "hash" => sha1(Auth::user()->getEmailForVerification())
                    ]),
                ],
            );

            $mail->AltBody = "Please verify your email using this link " . route("verification.verify", [
                "id" => Auth::id(),
                "hash" => sha1(Auth::user()->getEmailForVerification())
            ]);
            $mail->send();
        }
    }

    /**
     * Get the email address that should be used for verification.
     *
     * @return string
     */
    public function getEmailForVerification()
    {
        return $this->email;
    }

    public function permissionList(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, "model_has_permissions",  "model_id", "permission_id", "id", "id");
    }

    public function roleList(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, "model_has_roles", "model_id", "role_id", "id", "id");
    }

    protected function name(): Attribute
    {
        return Attribute::make(get: fn () => $this->firstName + " " + $this->lastName);
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class, "userid", "id");
    }

    public function commments(): HasMany
    {
        return $this->hasMany(Comment::class, "userid", "id");
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Reply::class, "userid", "id");
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, "userid", "id");
    }

    public function subcategories(): HasMany
    {
        return $this->hasMany(SubCategory::class, "userid", "id");
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, "userid", "id");
    }

    public function file(): HasMany
    {
        return $this->hasMany(File::class, "userid", "id");
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            NewUserEmail::dispatchAfterResponse($model);
            NewUserPermission::dispatchAfterResponse($model);
        });

        static::creating(function ($model) {
            $model->type = "Commenter";
        });

        static::updating(function ($model) {
            if (Auth::user()->type !== "Admin") {
                $model->type = (isset($model->type) && $model->type === "User") ? "User" : "Commenter";
            }
        });
    }
}
