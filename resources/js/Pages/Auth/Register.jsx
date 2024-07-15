import { useEffect } from 'react';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box } from '@mui/material';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: '',
        lastName: '',
        email: '',
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

        post(route('register'));
    };
    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <><Head title="Register" />
            <CustomGuestLayout>
                <Box className='container'>
                    {status && <Box className="mb-4 text-sm font-medium text-green-600">{status}</Box>}
                    <form onSubmit={submit} className='flex flex-col gap-4'>
                        <Box className='flex w-full flex-col'>
                            <InputLabel htmlFor="firstName" value="First Name" className='text-black' />

                            <TextInput
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={data.firstName}
                                className="mt-1 block w-full text-black"
                                autoComplete="firstName"
                                isFocused={true}
                                onChange={handleOnChange}
                                required />

                            <InputError message={errors.firstName} className="mt-2" />
                        </Box>

                        <Box className="flex w-full flex-col">
                            <InputLabel htmlFor="lastName" value="Last Name" className='text-black' />

                            <TextInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={data.lastName}
                                className="mt-1 block w-full text-black"
                                autoComplete="lastName"
                                onChange={handleOnChange}
                                required />

                            <InputError message={errors.lastName} className="mt-2" />
                        </Box>

                        <Box className="flex w-full flex-col">
                            <InputLabel htmlFor="email" value="Email" className='text-black' />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full text-black"
                                autoComplete="username"
                                onChange={handleOnChange}
                                required />

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
                                autoComplete="new-password"
                                onChange={handleOnChange}
                                required />

                            <InputError message={errors.password} className="mt-2" />
                        </Box>

                        <Box className="flex w-full flex-col">
                            <InputLabel className='text-black' htmlFor="password_confirmation" value="Confirm Password" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full text-black"
                                autoComplete="new-password"
                                onChange={handleOnChange}
                                required />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </Box>

                        <Box className="mt-4 flex items-center justify-end gap-2">
                            <Link
                                href={route('login')}
                                className="rounded-md text-sm text-black underline hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Already registered?
                            </Link>

                            <PrimaryButton className="ml-4 h-12" type="submit" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </Box>
                    </form>
                </Box>
            </CustomGuestLayout></>
    );
}
