<?php

use App\Http\Controllers\FrontController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontController::class, 'index'])->name('index');

Route::get('/blog/{id}', [FrontController::class, 'show'])->name('front.show')->whereUuid("id");
Route::get('/sports', [FrontController::class, 'sports'])->name('front.sports');
Route::get('/jobs', [FrontController::class, 'jobs'])->name('front.jobs');
Route::get('/news', [FrontController::class, 'news'])->name('front.news');
Route::match(['get', 'post'], '/search/{queryString?}', [FrontController::class, 'aisearch'])->name('front.search')->whereAlphaNumeric('queryString');
Route::get('/advertise', [FrontController::class, 'advertise'])->name('front.advertise');

Route::get('/trending', [FrontController::class, 'trending'])->name('front.trending');
Route::get('/blog/category/{id?}', [FrontController::class, 'category'])->name('front.category')->whereUuid("id");
Route::get('/blog/subcategory/{id?}', [FrontController::class, 'subcategory'])->name('front.subcategory')->whereUuid("id");

Route::get('/about', [FrontController::class, 'about'])->name('front.about');
Route::get('/contact', [FrontController::class, 'contact'])->name('front.contact');
Route::get('/faq', [FrontController::class, 'faq'])->name('front.faq');

Route::get('/privacy', [FrontController::class, 'privacy'])->name('front.privacy');
Route::get('/partners', [FrontController::class, 'partners'])->name('front.partners');
Route::get('/user/{userId?}', [UserController::class, 'show'])->middleware(['auth'])->name('front.user')->whereUuid("userId");


Route::post('/contact/store', [FrontController::class, 'contactstore'])->name('front.contact.store');
