import { useEffect } from 'react';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { Box } from '@mui/material';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    return (
        <>
            <Head title="Reset Password" />
            <CustomGuestLayout>
                <Box className='container'>
                    <form onSubmit={submit} className='flex flex-col gap-4'>
                        <Box className="flex w-full flex-col">
                            <InputLabel htmlFor="email" value="Email" className='text-black' />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={handleOnChange} />

                            <InputError message={errors.email} className="mt-2" />
                        </Box>

                        <Box className="flex w-full flex-col">
                            <InputLabel htmlFor="password" value="Password" className='text-black' />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={handleOnChange} />

                            <InputError message={errors.password} className="mt-2" />
                        </Box>

                        <Box className="flex w-full flex-col">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='text-black' />
                            <TextInput
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={handleOnChange} />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </Box>

                        <Box className="mt-4 flex items-center justify-end">
                            <PrimaryButton className="ml-4 h-12 text-black" disabled={processing}>
                                Reset Password
                            </PrimaryButton>
                        </Box>
                    </form>
                </Box>
            </CustomGuestLayout></>
    );
}
