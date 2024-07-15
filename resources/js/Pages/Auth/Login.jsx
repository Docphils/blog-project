import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box } from '@mui/material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };
    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <><Head title="Log in" />
            <CustomGuestLayout>
                <Box className='container'>


                    {status && <Box className="mb-4 text-sm font-medium text-green-600">{status}</Box>}

                    <form onSubmit={submit} className='flex flex-col gap-4'>
                        <Box className='flex w-full flex-col'>
                            <InputLabel htmlFor="email" value="Email" className='text-black' />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full text-black"
                                autoComplete="username"
                                isFocused={true}
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
                                className="mt-1 block w-full text-black"
                                autoComplete="current-password"
                                onChange={handleOnChange} />

                            <InputError message={errors.password} className="mt-2" />
                        </Box>

                        <Box className="flex w-full flex-col">
                            <label className="flex items-center text-black">
                                <Checkbox name="remember" value={data.remember} onChange={handleOnChange} />
                                <span className="ml-2 text-sm text-black">Remember me</span>
                            </label>
                        </Box>

                        <Box className="flex w-full flex-row items-center justify-between gap-2 text-black max-md:flex-col">
                            <Link
                                href={route('register')}
                                className="rounded-md text-sm text-black underline hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Haven't Registered?
                            </Link>{" "}

                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-black underline hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>


                            <PrimaryButton className="h-12 w-fit" type="submit" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </Box>
                    </form>
                </Box>
            </CustomGuestLayout></>
    );
}
