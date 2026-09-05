import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

type ParticipantTypeModel = {
    id?: number | string;
    name?: string | null;
};

const fallbackParticipantTypes: ParticipantTypeModel[] = [
    { id: 1, name: 'Government' },
    { id: 2, name: 'Professional' },
    { id: 3, name: 'Student' },
    { id: 4, name: 'Researcher' },
    { id: 5, name: 'NGO' },
    { id: 6, name: 'Media' },
];

const bangladeshDistricts = [
    'Bagerhat',
    'Bandarban',
    'Barguna',
    'Barishal',
    'Bhola',
    'Bogura',
    'Brahmanbaria',
    'Chandpur',
    'Chattogram',
    'Chuadanga',
    'Cox\'s Bazar',
    'Cumilla',
    'Dhaka',
    'Dinajpur',
    'Faridpur',
    'Feni',
    'Gaibandha',
    'Gazipur',
    'Gopalganj',
    'Habiganj',
    'Jamalpur',
    'Jashore',
    'Jhalokathi',
    'Jhenaidah',
    'Joypurhat',
    'Khagrachhari',
    'Khulna',
    'Kishoreganj',
    'Kurigram',
    'Kushtia',
    'Lakshmipur',
    'Lalmonirhat',
    'Madaripur',
    'Magura',
    'Manikganj',
    'Meherpur',
    'Moulvibazar',
    'Munshiganj',
    'Mymensingh',
    'Naogaon',
    'Narail',
    'Narayanganj',
    'Narsingdi',
    'Natore',
    'Netrokona',
    'Nilphamari',
    'Noakhali',
    'Pabna',
    'Panchagarh',
    'Patuakhali',
    'Pirojpur',
    'Rajbari',
    'Rajshahi',
    'Rangamati',
    'Rangpur',
    'Satkhira',
    'Shariatpur',
    'Sherpur',
    'Sirajganj',
    'Sunamganj',
    'Sylhet',
    'Tangail',
    'Thakurgaon',
];

const initialForm = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    organization: '',
    designation: '',
    district: '',
    address: '',
    participation_type_id: '',
    other_info: '',
    logo: null as File | null,
};

export const LandingRegistration: React.FC<{ participantTypes?: ParticipantTypeModel[] | null }> = ({ participantTypes }) => {
    const [form, setForm] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const options = participantTypes && participantTypes.length > 0 ? participantTypes : fallbackParticipantTypes;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            const fileInput = event.target as HTMLInputElement;
            setForm((current) => ({ ...current, [name]: fileInput.files?.[0] ?? null }));
            return;
        }

        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                return;
            }

            if (value instanceof File) {
                formData.append(key, value);
                return;
            }

            formData.append(key, String(value));
        });

        setIsSubmitting(true);
        router.post('/user_register', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setForm(initialForm);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration submitted',
                    text: 'Your registration has been submitted successfully.',
                    timer: 2500,
                    showConfirmButton: false,
                });
            },
            onError: (errors) => {
                const firstError = Object.values(errors as Record<string, string | string[]>)[0];
                const displayError = Array.isArray(firstError)
                    ? firstError[0]
                    : firstError || 'Please check the form and try again.';

                Swal.fire({
                    icon: 'error',
                    title: 'Validation failed',
                    text: displayError,
                });
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <section className="register" id="register">
            <div className="wrap">
                <div className="head">
                    <div className="eyebrow">REGISTRATION</div>
                    <h2>অনুষ্ঠানে অংশগ্রহণ করুন</h2>
                </div>

                <form id="worldHabitatForm" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid">
                        <div className="field">
                            <label htmlFor="name">পূর্ণ নাম *</label>
                            <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="আপনার নাম" />
                        </div>

                        <div className="field">
                            <label htmlFor="phone">মোবাইল নম্বর *</label>
                            <input id="phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="01XXXXXXXXX" />
                        </div>

                        <div className="field">
                            <label htmlFor="email">Email *</label>
                            <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="name@email.com" />
                        </div>

                        <div className="field">
                            <label htmlFor="gender">লিঙ্গ</label>
                            <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="organization">প্রতিষ্ঠান</label>
                            <input id="organization" name="organization" value={form.organization} onChange={handleChange} placeholder="Organization" />
                        </div>

                        <div className="field">
                            <label htmlFor="designation">পদবি</label>
                            <input id="designation" name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" />
                        </div>

                        <div className="field">
                            <label htmlFor="district">জেলা</label>
                            <input id="district" name="district" list="bangladesh-districts" value={form.district} onChange={handleChange} placeholder="Select or type district" autoComplete="off" />
                            <datalist id="bangladesh-districts">
                                {bangladeshDistricts.map((district) => (
                                    <option key={district} value={district} />
                                ))}
                            </datalist>
                        </div>

                        <div className="field">
                            <label htmlFor="participation_type_id">অংশগ্রহণের ধরন</label>
                            <select id="participation_type_id" name="participation_type_id" value={form.participation_type_id} onChange={handleChange}>
                                <option value="">Select</option>
                                {options.map((type) => (
                                    <option key={String(type.id)} value={String(type.id)}>
                                        {type.name || 'Participant Type'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field full">
                            <label htmlFor="address">ঠিকানা</label>
                            <input id="address" name="address" value={form.address} onChange={handleChange} placeholder="আপনার ঠিকানা" />
                        </div>

                        <div className="field full">
                            <label htmlFor="logo">প্রোফাইল/ছবি (ঐচ্ছিক)</label>
                            <input id="logo" type="file" name="logo" accept="image/*" onChange={handleChange} />
                        </div>

                        <div className="field full">
                            <label htmlFor="other_info">অতিরিক্ত তথ্য</label>
                            <textarea id="other_info" name="other_info" value={form.other_info} onChange={handleChange} rows={4} placeholder="Any additional information" />
                        </div>
                    </div>

                    <button className="btn submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Registration Submit করুন ✓'}
                    </button>
                </form>
            </div>
        </section>
    );
};
