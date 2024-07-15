<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReplyController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


require __DIR__ . '/front.php';

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';

Route::get('/category', [CategoryController::class, 'index'])->middleware('auth')->name('category.index');
Route::get('/comment', [CommentController::class, 'index'])->middleware('auth')->name('comment.index');
Route::get('/file', [FileController::class, 'index'])->middleware('auth')->name('file.index');
Route::get('/post', [PostController::class, 'index'])->middleware('auth')->name('post.index');
Route::get('/subcategory', [SubCategoryController::class, 'index'])->middleware('auth')->name('subcategory.index');
Route::get('/reply', [ReplyController::class, 'index'])->middleware('auth')->name('reply.index');
Route::get('/users', [UserController::class, 'index'])->middleware(['auth', 'isAdmin'])->name('user.index');

Route::get('/category/me', [CategoryController::class, 'me'])->middleware('auth')->name('category.me');
Route::get('/comment/me', [CommentController::class, 'me'])->middleware('auth')->name('comment.me');
Route::get('/file/me', [FileController::class, 'me'])->middleware('auth')->name('file.me');
Route::get('/post/me', [PostController::class, 'me'])->middleware('auth')->name('post.me');
Route::get('/subcategory/me', [SubCategoryController::class, 'me'])->middleware('auth')->name('subcategory.me');
Route::get('/reply/me', [ReplyController::class, 'me'])->middleware('auth')->name('reply.me');
Route::get('/user/me', [UserController::class, 'me'])->middleware('auth')->name('user.me');

Route::get('/category/search/{data?}', [CategoryController::class, 'search'])->middleware('auth')->name('category.search')->whereAlphaNumeric('data');
Route::get('/comment/search/{data?}', [CommentController::class, 'search'])->middleware('auth')->name('comment.search')->whereAlphaNumeric('data');
Route::get('/file/search/{data?}', [FileController::class, 'search'])->middleware('auth')->name('file.search')->whereAlphaNumeric('data');
Route::get('/post/search/{data?}', [PostController::class, 'search'])->middleware('auth')->name('post.search')->whereAlphaNumeric('data');
Route::get('/subcategory/search/{data?}', [SubCategoryController::class, 'search'])->middleware('auth')->name('subcategory.search')->whereAlphaNumeric('data');
Route::get('/reply/search/{data?}', [ReplyController::class, 'search'])->middleware('auth')->name('reply.search')->whereAlphaNumeric('data');
Route::get('/user/search/{data?}', [UserController::class, 'search'])->middleware('auth')->name('user.search')->whereAlphaNumeric('data');

Route::get('/category/searchdate/{date?}', [CategoryController::class, 'searchdate'])->name('category.searchdate')->whereAlphaNumeric('date');
Route::get('/comment/searchdate/{date?}', [CommentController::class, 'searchdate'])->name('comment.searchdate')->whereAlphaNumeric('date');
Route::get('/file/searchdate/{date?}', [FileController::class, 'searchdate'])->name('file.searchdate')->whereAlphaNumeric('date');
Route::get('/post/searchdate/{date?}', [PostController::class, 'searchdate'])->name('post.searchdate')->whereAlphaNumeric('date');
Route::get('/subcategory/searchdate/{date?}', [SubCategoryController::class, 'searchdate'])->name('subcategory.searchdate')->whereAlphaNumeric('date');
Route::get('/reply/searchdate/{date?}', [ReplyController::class, 'searchdate'])->name('reply.searchdate')->whereAlphaNumeric('date');
Route::get('/user/searchdate/{date?}', [UserController::class, 'searchdate'])->name('user.searchdate')->whereAlphaNumeric('date');

Route::get('/category/show/{id}', [CategoryController::class, 'show'])->middleware('auth')->name('category.show')->whereUuid("id");
Route::get('/comment/show/{id}', [CommentController::class, 'show'])->middleware('auth')->name('comment.show')->whereUuid("id");
Route::get('/file/show/{id}', [FileController::class, 'show'])->middleware('auth')->name('file.show')->whereUuid("id");
Route::get('/post/show/{id}', [PostController::class, 'show'])->name('post.show')->whereUuid("id");
Route::get('/reply/show/{id}', [ReplyController::class, 'show'])->middleware('auth')->name('reply.show');
Route::get('/subcategory/show/{id}', [SubCategoryController::class, 'show'])->middleware('auth')->name('subcategory.show')->whereUuid("id");
Route::get('/user/show/{id}', [UserController::class, 'show'])->middleware('auth')->name('user.show')->whereUuid("id");

// Category Routes
Route::get('/category/edit/{id}', [CategoryController::class, 'edit'])->name('category.edit')->whereUuid("id")->middleware('auth');
Route::get('/category/create', [CategoryController::class, 'create'])->name('category.create')->middleware('auth');
Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store')->middleware('auth');
Route::post('/category/{id}', [CategoryController::class, 'update'])->name('category.update')->whereUuid("id")->middleware('auth');
Route::get('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy')->whereUuid("id")->middleware('auth');

// Comment Routes
Route::get('/comment/create', [CommentController::class, 'create'])->name('comment.create')->middleware('auth');
Route::get('/comment/edit/{id}', [CommentController::class, 'edit'])->name('comment.edit')->whereUuid("id")->middleware('auth');
Route::post('/comment/store', [CommentController::class, 'store'])->name('comment.store')->middleware('auth');
Route::post('/comment/{id}', [CommentController::class, 'update'])->name('comment.update')->whereUuid("id")->middleware('auth');
Route::get('/comment/delete/{id}', [CommentController::class, 'destroy'])->name('comment.destroy')->whereUuid("id")->middleware('auth');

// File Routes
Route::get('/file/create', [FileController::class, 'create'])->name('file.create')->middleware('auth');
Route::get('/file/edit/{id}', [FileController::class, 'edit'])->name('file.edit')->whereUuid("id")->middleware('auth');
Route::post('/file/store', [FileController::class, 'store'])->name('file.store')->middleware('auth');
Route::post('/file/{id}', [FileController::class, 'update'])->name('file.update')->whereUuid("id")->middleware('auth');
Route::get('/file/delete/{id}', [FileController::class, 'destroy'])->name('file.destroy')->whereUuid("id")->middleware('auth');

// Post Routes
Route::get('/post/create', [PostController::class, 'create'])->name('post.create')->middleware('auth');
Route::get('/post/edit/{id}', [PostController::class, 'edit'])->name('post.edit')->whereUuid("id")->middleware('auth');
Route::post('/post/store', [PostController::class, 'store'])->name('post.store')->middleware('auth');
Route::post('/post/{id}', [PostController::class, 'update'])->name('post.update')->whereUuid("id")->middleware('auth');
Route::get('/post/delete/{id}', [PostController::class, 'destroy'])->name('post.destroy')->whereUuid("id")->middleware('auth');

// Reply Routes
Route::get('/reply/create', [ReplyController::class, 'create'])->name('reply.create')->middleware('auth');
Route::get('/reply/edit/{id}', [ReplyController::class, 'edit'])->name('reply.edit')->middleware('auth');
Route::post('/reply/store', [ReplyController::class, 'store'])->name('reply.store')->middleware('auth');
Route::post('/reply/{id}', [ReplyController::class, 'update'])->name('reply.update')->whereUuid("id")->middleware('auth');
Route::get('/reply/delete/{id}', [ReplyController::class, 'destroy'])->name('reply.destroy')->whereUuid("id")->middleware('auth');

// SubCategory Routes
Route::get('/subcategory/create', [SubCategoryController::class, 'create'])->name('subcategory.create')->middleware('auth');
Route::get('/subcategory/edit/{id}', [SubCategoryController::class, 'edit'])->name('subcategory.edit')->whereUuid("id")->middleware('auth');
Route::post('/subcategory/store', [SubCategoryController::class, 'store'])->name('subcategory.store')->middleware('auth');
Route::post('/subcategory/{id}', [SubCategoryController::class, 'update'])->name('subcategory.update')->whereUuid("id")->middleware('auth');
Route::get('/category/subcategory/{id}', [SubCategoryController::class, 'subCategoryByCatId'])->name('subcategory.category')->whereUuid("id")->middleware('auth');
Route::get('/subcategory/delete/{id}', [SubCategoryController::class, 'destroy'])->name('subcategory.destroy')->whereUuid("id")->middleware('auth');

// User Routes
Route::get('/user/create', [UserController::class, 'create'])->name('user.create')->middleware('auth');
Route::get('/user/edit/{id}', [UserController::class, 'edit'])->name('user.edit')->whereUuid("id")->middleware('auth');
Route::post('/user/store', [UserController::class, 'store'])->name('user.store')->middleware('auth');
Route::post('/user/{id}', [UserController::class, 'update'])->name('user.update')->whereUuid("id")->middleware('auth');
Route::get('/user/delete/{id}', [UserController::class, 'destroy'])->name('user.destroy')->whereUuid("id")->middleware('auth');
