import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box } from '@mui/material';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />
            <CustomGuestLayout>
                <Box className="mb-4 text-sm text-black">
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                    link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </Box>
                {status === 'verification-link-sent' && (
                    <Box className="mb-4 text-sm font-medium text-green-600">
                        A new verification link has been sent to the email address you provided during registration.
                    </Box>
                )}

                <form onSubmit={submit}>
                    <Box className="mt-4 flex items-center justify-between gap-2">
                        <PrimaryButton className='h-12' disabled={processing}>Resend Verification Email</PrimaryButton>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-black underline hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Log Out
                        </Link>
                    </Box>
                </form>
            </CustomGuestLayout></>
    );
}
