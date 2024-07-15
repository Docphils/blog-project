import "./styles.css";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function FAQ({ auth, page_data, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState(
        page_data
            ? page_data
            : [
                {
                    id: 1,
                    question: 'What is a blog platform?',
                    answer: 'A blog platform is a digital platform or website that allows individuals or organizations to create and publish content, typically in the form of blog posts. It provides tools and features for writing, formatting, and sharing content with an online audience.'
                },
                {
                    id: 2,
                    question: 'How do I create a blog on this platform?',
                    answer: 'Creating a blog on our platform is easy. Simply sign up for an account, choose a unique blog name, and start writing your first blog post. Our user-friendly interface makes it simple to compose and publish content.'
                },
                {
                    id: 3,
                    question: 'Is it free to create a blog on this platform?',
                    answer: 'Yes, it\'s free to create a blog on our platform. We offer a basic plan that allows you to start a blog without any cost. However, we also offer premium plans with additional features and customization options for those looking to enhance their blogging experience.'
                },
                {
                    id: 4,
                    question: 'Can I customize the design of my blog?',
                    answer: 'Absolutely! We provide a range of customizable templates and themes to help you personalize the design of your blog. You can choose colors, fonts, layouts, and more to match your style and branding.'
                },
                {
                    id: 5,
                    question: 'How can I attract more readers to my blog?',
                    answer: 'To attract more readers, focus on creating high-quality, engaging content. Promote your blog on social media, engage with your audience through comments, and utilize search engine optimization (SEO) techniques to improve your blog\'s visibility in search results.'
                },
                {
                    id: 6,
                    question: 'Can I monetize my blog on this platform?',
                    answer: 'Yes, you can monetize your blog on our platform. We support various monetization methods, including advertising, sponsored posts, affiliate marketing, and selling digital or physical products. Explore our monetization options to find what works best for you.'
                },
                {
                    id: 7,
                    question: 'Is my content protected on this platform?',
                    answer: 'We take content protection seriously. Your content is typically protected by copyright laws, and we have policies in place to prevent unauthorized use or duplication. However, it\'s essential to familiarize yourself with our terms of service and privacy policy to understand how your content is handled on our platform.'
                },
                {
                    id: 8,
                    question: 'Can I collaborate with other bloggers on this platform?',
                    answer: 'Yes, you can collaborate with other bloggers. Our platform often provides features like guest posting, collaboration requests, and the ability to follow and interact with other bloggers within the community.'
                },
                {
                    id: 9,
                    question: 'What kind of support and resources do you offer to bloggers?',
                    answer: 'We offer various resources, including guides, tutorials, and a support team to assist bloggers. Our goal is to provide you with the tools and knowledge needed to succeed in your blogging journey.'
                },
                {
                    id: 10,
                    question: 'How do I get started with my blog on this platform?',
                    answer: 'To get started, simply visit our website, sign up for an account, and follow the step-by-step instructions for setting up your blog. You\'ll be writing and publishing your first blog post in no time!'
                }
            ]
    );

    useEffect(() => {
        setLoading(false);
    }, []);

    const Searchbar = (props) => {
        const [value, setValue] = useState("");
        const handleChange = (e) => {
            setValue(e.target.value);
            props.onSearchChange(e);
        };
        return (
            <form className="w-full block">
                <svg viewBox="0 0 512 512" width="100" title="search">
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                </svg>
                <input
                    className="searchbar w-full"
                    type="text"
                    placeholder="Describe your issue"
                    onChange={handleChange}
                    value={value}
                />
            </form>
        );
    };

    const Question = (props) => {
        const [isActive, setActive] = useState(false);
        const handleClick = (id) => {
            setActive(!isActive);
        };
        return (
            <Box className="question-wrapper">
                <Box className="question" id={props.id}>
                    <h3>{props.question}</h3>
                    <button onClick={() => handleClick(props.id)}>
                        <svg
                            className={isActive ? "active " : ""}
                            viewBox="0 0 320 512"
                            width="100"
                            title="angle-down"
                        >
                            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
                        </svg>
                    </button>
                </Box>
                <Box className={isActive ? "answer active" : "answer"}>
                    {props.answer}
                </Box>
            </Box>
        );
    };

    function FAQ({ data, props }) {
        const [pageData, setPageData] = useState(data ? data : [])
        const [searchTerm, setSearchTerm] = useState("");
        const [searchResults, setSearchResults] = useState([]);
        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
        };

        useEffect(() => {
            const results = pageData.filter((item) =>
                item.question.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }, [searchTerm]);

        return (
            <Box className="relative container block bg-white">
                <Box className="faq relative block mx-auto w-full justify-center">
                    <Box className="w-full c-section-header mt-10">
                        <h2
                            style={{ fontFamily: "philosopherbold" }}
                            className="text-3xl text-center icons text-bold"
                        >
                            How can we help you?
                        </h2>
                    </Box>

                    <Searchbar onSearchChange={handleSearchChange} />

                    <section className="block mx-auto w-full">
                        {searchResults.map((item, index) => (
                            <Question
                                key={index}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </section>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Head title="Frequently Asked Questions" />
            <GuestLayout auth={auth}>
                <FAQ data={questions} />
            </GuestLayout>
        </>
    );
}
