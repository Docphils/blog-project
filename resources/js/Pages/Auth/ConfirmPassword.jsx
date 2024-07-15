import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import { Box } from '@mui/material';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <><Head title="Confirm Password" /><CustomGuestLayout>
            <Box className='container'>
                <Box className="mb-4 text-sm text-gray-600">
                    This is a secure area of the application. Please confirm your password before continuing.
                </Box>
                <form onSubmit={submit} className='flex flex-col gap-4'>
                    <Box className="flex w-full flex-col">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)} />
                        <InputError message={errors.password} className="mt-2" />
                    </Box>

                    <Box className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Confirm
                        </PrimaryButton>
                    </Box>
                </form>
            </Box>
        </CustomGuestLayout></>
    );
}
