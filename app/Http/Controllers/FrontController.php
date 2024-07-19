<?php

namespace App\Http\Controllers;

use App\Actions\Converter;
use App\Actions\Html2Text;
use App\GraphQL\Mutations\SendMail;
use App\Models\Category;
use App\Models\Post;
use App\Models\Rating;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Prezly\DraftPhp\Converter as DraftConverter;
use App\Http\Meta;


class FrontController extends Controller
{

    protected $model;

    protected $template;


    public function __construct($model = Post::class)
    {

        $this->model = $model;

        $this->template = "";
    }

    public function index(Request $request)
    {
        $message = $request->session()->get('message');
        $posts = Post::where("status", "=", "Published")->with(["category", "subcategory"])->orderByDesc('updated_at')->cursorPaginate(20);
        Meta::cleanup();
        Meta::addMeta('author', config('app.name'));
        Meta::addMeta('title', "Welcome to swifre.com");
        Meta::addMeta('description', "A blogging platform for every and anyone, We believe, there's room for every voice and every story. That's why we are providing a blogging platform that's accessible and welcoming to all, regardless of your background, expertise, or interests.
At Merif Classique, our goal is simply to empower individuals from all walks of life through this platform to share their unique perspectives and passions with the world." . config('app.name'));
        Meta::addMeta('og:title', "Welcome to Merif Classique");
        Meta::addMeta('og:description', "A blogging platform for every and anyone, We believe, there's room for every voice and every story. That's why we are providing a blogging platform that's accessible and welcoming to all, regardless of your background, expertise, or interests.
At Merif Classique, our goal is simply to empower individuals from all walks of life through this platform to share their unique perspectives and passions with the world." . config('app.name'));
        Meta::addMeta('og:url',  route($request->route()->getName()));
        Meta::addMeta('canonical', str_replace('www.', '', route("index")));
        return $request->wantsJson()
            ? ["page_data" => $posts]
            : Inertia::render("Welcome", ["page_data" => $posts, "message" => $message]);
    }



    public function show(Request $request, String $id)
    {
        //
        $message = $request->session()->get('message');
        $data = forward_static_call([$this->model, "where"], ["id" => $id])->with(['category', 'category.subcategorys', 'subcategory', 'subcategory.posts', 'comments', 'comments.user', 'comments.user.ratings' => function ($query) use ($id) {
            $query->where("postId", "=", $id);
        }, 'comments.replies', 'comments.replies.user', 'user', 'ratings'])->withAvg("ratings", "rating")->withSum("ratings", "rating")->addSelect(["ratings_sum" => Rating::selectRaw('sum(rating)')->whereColumn("postId", "posts.id")->groupBy("postId")])->addSelect(["ratings_avg" => Rating::selectRaw('avg(rating)')->whereColumn("postId", "posts.id")->groupBy("postId")])->first();
        // seo optimization
        if (isset($data['content'])) {
            try {
                $contentState = DraftConverter::convertFromJson($data['content']);

                $converter = new Converter;
                $html = $converter->setState($contentState)->toHtml();
                $Html2Text = new Html2Text($html);
                Meta::cleanup();
                Meta::addMeta('author', $data->user->firstName . " " . $data->user->lastName);
                Meta::addMeta('title', $data->subject);
                Meta::addMeta('description', substr($Html2Text->getText(), 0, 300));
                Meta::addMeta('og:title', $data->subject);
                Meta::addMeta('og:description', substr($Html2Text->getText(), 0, 300));
                Meta::addMeta('og:url', route("post.show", ["id" => $data->id]));
                Meta::addMeta('og:image', $data->coverImage);
                Meta::addMeta('canonical', route("post.show", ["id" => $data->id]));
                $errorMessage = "";
            } catch (\Throwable $e) {
                $errorMessage = "Error fetching data: " . $e->getMessage();
                Meta::cleanup();
                Meta::addMeta('author', $data->user->firstName . " " . $data->user->lastName);
                Meta::addMeta('title', $data->subject);
                Meta::addMeta('og:title', $data->subject);
                Meta::addMeta('og:url', route("post.show", ["id" => $data->id]));
                Meta::addMeta('og:image', $data->coverImage);
                Meta::addMeta('canonical', str_replace('www.', '', route("post.show", ["id" => $data->id])));
            }
        }
        return $request->wantsJson()
            ? ["page_data" => $data, "message" => $message,  'error' => $errorMessage]
            : Inertia::render("Show", ["page_data" => $data, "message" => $message,  'error' => $errorMessage]);
    }

    public function category(Request $request, $id = null)
    {
        $message = $request->session()->get('message');
        if (isset($id)) {
            $Category = Category::where("id", "=", $id)->with(["subcategorys", "posts"])->first();
            return $request->wantsJson()
                ? ["page_data" => $Category, "posts" => [...$Category->posts], "type" => "category"]
                : Inertia::render("Category", ["page_data" => $Category, "posts" => [...$Category->posts], "type" => "category"]);
        }
        $posts = Post::where("status", "=", "Published")->with(["category", "subcategory"])->orderByDesc('updated_at')->cursorPaginate(15);
        $Category = Category::where("status", "=", "Published")->with(["posts"])->orderByDesc('updated_at')->cursorPaginate(15);
        return $request->wantsJson()
            ? ["page_data" => $Category, "posts" => $posts, "type" => "list", "message" => $message]
            : Inertia::render("Category", ["page_data" => $Category, "posts" => $posts, "type" => "list", "message" => $message]);
    }


    public function subcategory(Request $request, $id = null)
    {
        $message = $request->session()->get('message');
        if (isset($id)) {
            $subCategory = SubCategory::where("id", "=", $id)->with(["posts", "category"])->first();
            return $request->wantsJson()
                ? ["page_data" => $subCategory, "type" => "subcategory"]
                : Inertia::render("SubCategory", ["page_data" => $subCategory, "type" => "subcategory"]);
        }
        $SubCategory = SubCategory::where("status", "=", "Published")->with(["posts", "category"])->orderByDesc('updated_at')->cursorPaginate(15);
        $posts = Post::where("status", "=", "Published")->with(["category", "subcategory"])->orderByDesc('updated_at')->cursorPaginate(15);
        return $request->wantsJson()
            ? ["page_data" => $SubCategory, "posts" => $posts, "type" => "list", "message" => $message]
            : Inertia::render("SubCategory", ["page_data" => $SubCategory, "posts" => $posts, "type" => "list", "message" => $message]);
    }

    // more logic comming for trending
    public function trending(Request $request)
    {
        $message = $request->session()->get('message');
        $trending = Post::where("status", "=", "Published")->with(["category", "subcategory", "ratings"])->withAvg("ratings", "rating")->withSum("ratings", "rating")->addSelect(["ratings_sum" => Rating::selectRaw('sum(rating)')->whereColumn("postId", "posts.id")->groupBy("postId")])->addSelect(["ratings_avg" => Rating::selectRaw('avg(rating)')->whereColumn("postId", "posts.id")->groupBy("postId")])->orderByDesc('ratings_sum')->orderByDesc('ratings_avg')->orderByDesc('created_at')->cursorPaginate(15);
        return $request->wantsJson()
            ? ["page_data" => $trending]
            : Inertia::render("Index", ["page_data" => $trending, "message" => $message]);
    }

    public function news(Request $request)
    {
        $message = $request->session()->get('message');
        $categories = Category::where("status", "=", "Published")->where("name", "=", "news")->with(["subcategorys", "posts"])->first();
        return $request->wantsJson()
            ? ["page_data" => $categories]
            : Inertia::render("Category", ["page_data" => $categories,  "type" => "category", "message" => $message]);
    }

    public function sports(Request $request)
    {
        $message = $request->session()->get('message');
        $categories = Category::where("status", "=", "Published")->where("name", "=", "sports")->with(["subcategorys", "posts"])->first();
        return $request->wantsJson()
            ? ["page_data" =>  $categories]
            : Inertia::render("Category", ["page_data" =>  $categories, "type" => "category", "message" => $message]);
    }

    public function jobs(Request $request)
    {
        $message = $request->session()->get('message');
        $categories = Category::where("status", "=", "Published")->where("name", "=", "jobs")->with(["subcategorys", "posts"])->first();
        return $request->wantsJson()
            ? ["page_data" =>  $categories]
            : Inertia::render("Category", ["page_data" =>  $categories, "type" => "category", "message" => $message]);
    }

    public function about(Request $request)
    {
        $message = $request->session()->get('message');
        $data = "Lorem ipsum";
        return $request->wantsJson()
            ? ["page_data" => $data]
            : Inertia::render("About", ["page_data" => $data, "message" => $message]);
    }

    public function advertise(Request $request)
    {
        $message = $request->session()->get('message');
        $data = "Lorem ipsum";
        return $request->wantsJson()
            ? ["page_data" => $data]
            : Inertia::render("Advertise", ["page_data" => $data, "message" => $message]);
    }

    public function privacy(Request $request)
    {
        $message = $request->session()->get('message');
        $data = "Lorem ipsum";
        return $request->wantsJson()
            ? ["page_data" => $data]
            : Inertia::render("Privacy", ["page_data" => $data, "message" => $message]);
    }


    public function partners(Request $request)
    {
        $message = $request->session()->get('message');
        $data = "Lorem ipsum";
        return $request->wantsJson()
            ? ["page_data" => $data]
            : Inertia::render("Partners", ["page_data" => $data, "message" => $message]);
    }

    public function contact(Request $request)
    {
        $message = $request->session()->get('message');
        $data = "Lorem ipsum";
        return $request->wantsJson()
            ? ["page_data" => $data]
            : Inertia::render("Contact", ['status' => session('status'), "page_data" => $data, "message" => $message]);
    }

    public function contactstore(Request $request)
    {
        $message = $request->session()->get('message');
        $validateData = Validator::make($request->all(), [
            'fullName' => 'required|string',
            'content' => 'required|string',
            'email' => 'required|string|email|max:255',
        ]);

        $status = "Validation fail, Please provide valid information";

        if (!$validateData->fails()) {
            $validateData = $this->stripEmptyCustom($validateData->validated());
            $args = [
                "subject" => "Contact us form email for " . $validateData['fullName'],
                "body" => $validateData['content'],
                'email' => $validateData['email'],
                'bcc' => "contactus@swifre.com"
            ];
            $SendMail = new SendMail;
            $SendMail(null, $args);
            $status = "Sent Successfully";
        };

        if (isset($status)) {
            return redirect()->route('front.contact')->with('status', __($status));
        }

        return redirect()->route('front.contact');
    }

    public function faq(Request $request)
    {
        $message = $request->session()->get('message');
        $data = [
            [
                'id' => 1,
                'question' => 'What is a blog platform?',
                'answer' => 'A blog platform is a digital platform or website that allows individuals or organizations to create and publish content, typically in the form of blog posts. It provides tools and features for writing, formatting, and sharing content with an online audience.'
            ],
            [
                'id' => 2,
                'question' => 'How do I create a blog on this platform?',
                'answer' => 'Creating a blog on our platform is easy. Simply sign up for an account, choose a unique blog name, and start writing your first blog post. Our user-friendly interface makes it simple to compose and publish content.'
            ],
            [
                'id' => 3,
                'question' => 'Is it free to create a blog on this platform?',
                'answer' => 'Yes, it\'s free to create a blog on our platform. We offer a basic plan that allows you to start a blog without any cost. However, we also offer premium plans with additional features and customization options for those looking to enhance their blogging experience.'
            ],
            [
                'id' => 4,
                'question' => 'Can I customize the design of my blog?',
                'answer' => 'Absolutely! We provide a range of customizable templates and themes to help you personalize the design of your blog. You can choose colors, fonts, layouts, and more to match your style and branding.'
            ],
            [
                'id' => 5,
                'question' => 'How can I attract more readers to my blog?',
                'answer' => 'To attract more readers, focus on creating high-quality, engaging content. Promote your blog on social media, engage with your audience through comments, and utilize search engine optimization (SEO) techniques to improve your blog\'s visibility in search results.'
            ],
            [
                'id' => 6,
                'question' => 'Can I monetize my blog on this platform?',
                'answer' => 'Yes, you can monetize your blog on our platform. We support various monetization methods, including advertising, sponsored posts, affiliate marketing, and selling digital or physical products. Explore our monetization options to find what works best for you.'
            ],
            [
                'id' => 7,
                'question' => 'Is my content protected on this platform?',
                'answer' => 'We take content protection seriously. Your content is typically protected by copyright laws, and we have policies in place to prevent unauthorized use or duplication. However, it\'s essential to familiarize yourself with our terms of service and privacy policy to understand how your content is handled on our platform.'
            ],
            [
                'id' => 8,
                'question' => 'Can I collaborate with other bloggers on this platform?',
                'answer' => 'Yes, you can collaborate with other bloggers. Our platform often provides features like guest posting, collaboration requests, and the ability to follow and interact with other bloggers within the community.'
            ],
            [
                'id' => 9,
                'question' => 'What kind of support and resources do you offer to bloggers?',
                'answer' => 'We offer various resources, including guides, tutorials, and a support team to assist bloggers. Our goal is to provide you with the tools and knowledge needed to succeed in your blogging journey.'
            ],
            [
                'id' => 10,
                'question' => 'How do I get started with my blog on this platform?',
                'answer' => 'To get started, simply visit our website, sign up for an account, and follow the step-by-step instructions for setting up your blog. You\'ll be writing and publishing your first blog post in no time!'
            ]
        ];

        return $request->wantsJson()
            ? ["page_data" => $data]
            : Inertia::render("FAQ", ["page_data" => $data, "message" => $message]);
    }


    public function aisearch(Request $request, $queryString = null)
    {
        //
        $message = $request->session()->get('message');

        if (empty($request->input("queryString")) && empty($queryString)) {
            $posts = Post::where("status", "=", "Published")->with(["category", "subcategory"])->orderByDesc('updated_at')->cursorPaginate(15);
            $message = "Please enter your search keywords below";
            return $request->wantsJson()
                ? ["page_data" => $posts]
                : Inertia::render("Search", ["page_data" => $posts, "message" => $message]);
        };
        $queryString = htmlspecialchars($request->input("queryString") ?? $queryString);
        $posts = Post::where("status", "=", "Published")->where(
            function ($query) use ($queryString) {
                $query->where("content", "LIKE", "%" . $queryString . "%")
                    ->orWhere("subject", "LIKE", "%" . $queryString . "%");
            }
        )->with(["category", "subcategory"])->orderByDesc('updated_at')->cursorPaginate(15);
        $message = "These blogs might contain what you search?";
        return $request->wantsJson()
            ? ["page_data" => $posts]
            : Inertia::render("Search", ["page_data" => $posts, "message" => $message]);
    }
}
