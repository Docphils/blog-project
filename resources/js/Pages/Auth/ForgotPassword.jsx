
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box } from '@mui/material';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (

        <><Head title="Forgot Password" />
            <Box className='flex w-full flex-row items-center justify-center'>
                <CustomGuestLayout>
                    <Box className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your email address and we will email you a password
                        reset link that will allow you to choose a new one.
                    </Box>

                    {status && <Box className="mb-4 text-sm font-medium text-green-600">{status}</Box>}

                    <form onSubmit={submit} className='flex flex-col gap-4'>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)} />

                        <InputError message={errors.email} className="mt-2" />

                        <Box className="mt-4 flex items-center justify-end">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Email Password Reset Link
                            </PrimaryButton>
                        </Box>
                    </form>
                </CustomGuestLayout>
            </Box></>
    );
}
